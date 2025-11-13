import { useAuth } from "@/components/use-auth"
import { FALLBACK_ERROR_MESSAGE, SESSION_TOKEN_KEY } from "@/constants"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"

export const useGetClients = () => {
    const router = useRouter()

    const { isLoading: isAuthLoading, sessionToken } = useAuth()

    const { data, isLoading: isQueryLoading } = useQuery({
        queryKey: ["get-clients"],
        enabled: !isAuthLoading && !!sessionToken,
        queryFn: async () => {
            if (isAuthLoading || !sessionToken) {
                return null
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/clients`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionToken}`,
                },
            })

            const responseData = await response.json()

            if (!response.ok) {
                if (response.status === 401) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    router.replace("/")

                    return null
                }

                Alert.alert("Error", responseData.error || FALLBACK_ERROR_MESSAGE)

                return null
            }

            return responseData
        },
    })

    return {
        data,
        isLoading: isQueryLoading || isAuthLoading,
    }
}