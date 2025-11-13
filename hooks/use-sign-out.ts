import { useAuth } from "@/components/use-auth"
import { FALLBACK_ERROR_MESSAGE, SESSION_TOKEN_KEY } from "@/constants"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"

export const useSignOut = () => {
    const router = useRouter()

    const { isLoading, sessionToken } = useAuth()

    const mutation = useMutation({
        mutationKey: ["sign-out"],
        mutationFn: async () => {
            if (isLoading || !sessionToken) {
                return null
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/auth/sign-out`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionToken}`,
                },
            })

            const responseData = await response.json()

            if (!response.ok) {
                if (response.status === 401) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return router.replace("/")
                }

                throw new Error(responseData.error || FALLBACK_ERROR_MESSAGE)
            }

            await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

            return router.replace("/")
        },
        onError: (error: any) => Alert.alert("Error", error.message || FALLBACK_ERROR_MESSAGE),
    })

    return {
        mutation,
    }
}