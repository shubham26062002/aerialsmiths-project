import { useScreenTitle } from "@/hooks/use-screen-title"
import { useShowBackButton } from "@/hooks/use-show-back-button"
import { Link, usePathname } from "expo-router"
import { useEffect } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

const DashboardScreen = () => {
    const pathname = usePathname()

    const { setTitle } = useScreenTitle()

    const { setShowBackButton } = useShowBackButton()

    useEffect(() => {
        if (pathname === "/dashboard") {
            setTitle("Dashboard")

            setShowBackButton(false)
        }
    }, [pathname])

    return (
        <ScrollView className="flex-1 bg-white" contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex-1 py-10 px-8 gap-y-10">
                <View className="gap-y-2">
                    <Text className="text-3xl font-raleway-600 text-zinc-950">Your Dashboard</Text>
                    <Text className="text-zinc-400 font-raleway-400 text-lg">Generate reports in PDF format or fill your timesheet entries here.</Text>
                </View>
                <View className="rounded-2xl overflow-hidden border border-zinc-200">
                    <Link href="/dashboard/generate-report" asChild>
                        <Pressable className="p-6 border-b border-zinc-200 active:bg-zinc-100">
                            <Text className="text-zinc-950 font-raleway-500 text-lg">Generate Report</Text>
                            <Text className="font-raleway-400 text-zinc-400">Generate new report in PDF format.</Text>
                        </Pressable>
                    </Link>
                    <Link href="/dashboard/timesheet" asChild>
                        <Pressable className="p-6 active:bg-zinc-100">
                            <Text className="text-zinc-950 font-raleway-500 text-lg">View Timesheet Entries</Text>
                            <Text className="font-raleway-400 text-zinc-400">View all your inserted timesheet entries.</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}

export default DashboardScreen