import { useAuth } from "@/components/use-auth"
import { FALLBACK_ERROR_MESSAGE, SESSION_TOKEN_KEY } from "@/constants"
import { addTimesheetEntrySchema } from "@/lib/zod-schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"
import { z } from "zod"

export const useAddTimesheetEntry = () => {
    const queryClient = useQueryClient()

    const router = useRouter()

    const { isLoading, sessionToken } = useAuth()

    const mutation = useMutation({
        mutationKey: ["add-timesheet-entry"],
        mutationFn: async (data: z.infer<typeof addTimesheetEntrySchema>) => {
            console.log(data)

            if (isLoading || !sessionToken) {
                return null
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/timesheet/add-entry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionToken}`,
                },
                body: JSON.stringify(data),
            })

            const responseData = await response.json()

            console.log(responseData)

            if (!response.ok) {
                if (response.status === 401) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return router.replace("/")
                }

                throw new Error(responseData.error || FALLBACK_ERROR_MESSAGE)
            }

            await queryClient.invalidateQueries({
                queryKey: ["get-timesheet-entries"],
            })

            return router.push("/dashboard/timesheet")
        },
        onError: (error: any) => Alert.alert("Error", error.message || FALLBACK_ERROR_MESSAGE),
    })

    return {
        mutation,
    }
}