import { SESSION_TOKEN_KEY } from "@/constants"
import * as SecureStore from "expo-secure-store"
import { decodeJwt } from "jose"
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [sessionToken, setSessionToken] = useState("")

    useEffect(() => {
        const verifyAuthState = async () => {
            try {
                const sessionToken = await SecureStore.getItemAsync(SESSION_TOKEN_KEY)

                if (!sessionToken) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return setSessionToken("")
                }

                const payload: JWTPayload = decodeJwt(sessionToken)

                if (!payload) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return setSessionToken("")
                }

                const { sub, sid, role, iat, exp } = payload

                if (!sub || !sid || !role || !iat || !exp) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return setSessionToken("")
                }

                if (Date.now() > exp * 1000) {
                    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                    return setSessionToken("")
                }

                return setSessionToken(sessionToken)
            } catch {
                await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY)

                return setSessionToken("")
            } finally {
                setIsLoading(false)
            }
        }

        verifyAuthState()
    }, [])

    return {
        isLoading,
        sessionToken,
    }
}