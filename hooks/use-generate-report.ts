import { useAuth } from "@/components/use-auth"
import { FALLBACK_ERROR_MESSAGE, SESSION_TOKEN_KEY } from "@/constants"
import { generateReportSchema } from "@/lib/zod-schemas"
import { useMutation } from "@tanstack/react-query"
import * as FileSystem from "expo-file-system"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import * as Sharing from "expo-sharing"
import { Alert } from "react-native"
import { z } from "zod"

export const useGenerateReport = () => {
    const router = useRouter()

    const { isLoading, sessionToken } = useAuth()

    const mutation = useMutation({
        mutationKey: ["generate-report"],
        mutationFn: async (data: z.infer<typeof generateReportSchema>) => {
            if (isLoading || !sessionToken) {
                return null
            }

            const uploadedImages: {
                publicUrl: string,
                publicId: string,
            }[] = []

            for (const image of data.images) {
                const formData = new FormData()

                formData.append("image", {
                    uri: image.uri,
                    name: image.fileName || `image.${image.mimeType.split("/").pop() || "jpg"}`,
                    type: image.mimeType || "image/jpeg",
                } as any)

                const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/upload/image`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${sessionToken}`,
                    },
                    body: formData,
                })

                const responseData = await response.json()

                if (!response.ok) {
                    if (response.status === 401) {
                        await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                        return router.replace("/")
                    }

                    throw new Error(responseData.error || FALLBACK_ERROR_MESSAGE)
                }

                uploadedImages.push({
                    publicUrl: responseData.publicUrl,
                    publicId: responseData.publicId,
                })
            }

            const reportData = {
                type: data.type,
                date: data.date,
                address: data.address,
                clientName: data.clientName,
                title: data.title,
                dateOfService: data.dateOfService,
                images: uploadedImages.map((item) => item.publicUrl),
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/reports/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionToken}`,
                },
                body: JSON.stringify(reportData),
            })

            const responseData = await response.json()

            if (!response.ok) {
                if (response.status === 401) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return router.replace("/")
                }

                throw new Error(responseData.error || FALLBACK_ERROR_MESSAGE)
            }

            const now = new Date()

            const reportFileName = responseData.publicUrl.split("/").pop() || `report-${now.getTime()}.pdf`

            const reportFilePath = new FileSystem.File(new FileSystem.Directory(FileSystem.Paths.document), reportFileName)

            const downloadedReportFile = await FileSystem.File.downloadFileAsync(responseData.publicUrl, reportFilePath)

            const assetsIds = [responseData.publicId as string, ...uploadedImages.map((image) => image.publicId)]

            const deleteAssetsResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/upload/delete-assets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    assetsIds,
                }),
            })

            const deleteAssetsResponseData = await deleteAssetsResponse.json()

            if (!deleteAssetsResponse.ok) {
                if (deleteAssetsResponse.status === 401) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return router.replace("/")
                }

                throw new Error(deleteAssetsResponseData.error || FALLBACK_ERROR_MESSAGE)
            }

            if (!(await Sharing.isAvailableAsync())) {
                throw new Error("File sharing is not available on this device.")
            }

            return await Sharing.shareAsync(downloadedReportFile.uri, {
                dialogTitle: "Share Your Report",
                mimeType: "application/pdf",
                UTI: "com.adobe.pdf",
            })
        },
        onError: (error: any) => Alert.alert("Error", error.message || FALLBACK_ERROR_MESSAGE),
    })

    return {
        mutation,
    }
}