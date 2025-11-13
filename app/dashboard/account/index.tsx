import { DashboardLoadingIndicator } from "@/components/dashboard-loading-indicator"
import { SignOutButton } from "@/components/sign-out-button"
import { useGetCurrentUser } from "@/hooks/use-get-current-user"
import { useScreenTitle } from "@/hooks/use-screen-title"
import { useShowBackButton } from "@/hooks/use-show-back-button"
import { usePathname } from "expo-router"
import { useEffect } from "react"
import { ScrollView, Text, View } from "react-native"

const AccountScreen = () => {
    const { data: currentUser, isLoading } = useGetCurrentUser()

    const pathname = usePathname()

    const { setTitle } = useScreenTitle()

    const { setShowBackButton } = useShowBackButton()

    useEffect(() => {
        if (pathname === "/dashboard/account") {
            setTitle("Account")

            setShowBackButton(false)
        }
    }, [pathname])

    if (isLoading || !currentUser) {
        return (
            <DashboardLoadingIndicator />
        )
    }

    return (
        <ScrollView className="flex-1 bg-white" contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex-1 py-10 px-8 gap-y-10">
                <View className="gap-y-2">
                    <Text className="text-3xl font-raleway-600 text-zinc-950">Your Account</Text>
                    <Text className="text-zinc-400 font-raleway-400 text-lg">View and manage your account details/settings here.</Text>
                </View>
                <View className="flex-row items-center justify-center gap-x-4">
                    <View className="size-16 rounded-full items-center justify-center bg-blue-600/10">
                        <Text className="font-raleway-500 text-blue-600 text-xl line-clamp-1">{currentUser.name.trim().replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "US"}</Text>
                    </View>
                    <View className="flex-1 gap-y-1">
                        <Text className="text-zinc-950 font-raleway-500 text-xl line-clamp-1">{currentUser.name}</Text>
                        <Text className="font-raleway-400 text-zinc-400 line-clamp-1">{currentUser.email}</Text>
                    </View>
                </View>
                {/* <View className="rounded-2xl overflow-hidden border border-zinc-200">
                    <Link href="/dashboard/account" asChild>
                        <Pressable className="p-6 border-b border-zinc-200 active:bg-zinc-100">
                            <Text className="text-zinc-950 font-raleway-500 text-lg">Edit Details</Text>
                            <Text className="font-raleway-400 text-zinc-400">Change your name here.</Text>
                        </Pressable>
                    </Link>
                    <Link href="/dashboard/account" asChild>
                        <Pressable className="p-6 active:bg-zinc-100">
                            <Text className="text-zinc-950 font-raleway-500 text-lg">Change Password</Text>
                            <Text className="font-raleway-400 text-zinc-400">Change your password here.</Text>
                        </Pressable>
                    </Link>
                </View> */}
                <SignOutButton />
            </View>
        </ScrollView>
    )
}

export default AccountScreen