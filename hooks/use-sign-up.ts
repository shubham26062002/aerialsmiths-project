import { FALLBACK_ERROR_MESSAGE, SESSION_TOKEN_KEY } from "@/constants"
import { signUpSchema } from "@/lib/zod-schemas"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"
import { z } from "zod"

export const useSignUp = () => {
    const router = useRouter()

    const mutation = useMutation({
        mutationKey: ["sign-up"],
        mutationFn: async (data: z.infer<typeof signUpSchema>) => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_APP_URL}/api/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.error || FALLBACK_ERROR_MESSAGE)
            }

            await SecureStore.setItemAsync(SESSION_TOKEN_KEY, responseData.sessionToken)

            return router.replace("/dashboard")
        },
        onError: (error: any) => Alert.alert("Error", error.message || FALLBACK_ERROR_MESSAGE),
    })

    return {
        mutation,
    }
}