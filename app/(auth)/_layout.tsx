import { AuthLoadingIndicator } from "@/components/auth-loading-indicator"
import { useAuth } from "@/components/use-auth"
import { Redirect, Stack } from "expo-router"

const AuthLayout = () => {
    const { isLoading, sessionToken } = useAuth()

    if (isLoading) {
        return (
            <AuthLoadingIndicator />
        )
    }

    if (!isLoading && !!sessionToken) {
        return (
            <Redirect href="/dashboard" />
        )
    }

    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
        </Stack>
    )
}

export default AuthLayout