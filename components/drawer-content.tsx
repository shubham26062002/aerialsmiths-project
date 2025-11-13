import { cn } from "@/lib/cn"
import { Link, usePathname } from "expo-router"
import { ClockIcon, FilePlusIcon, LayoutDashboardIcon, UserCircleIcon } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

export const DrawerContent = () => {
    const pathname = usePathname()

    return (
        <View className="bg-white flex-1">
            <SafeAreaView className="flex-1">
                <View className="flex-1 py-10 px-8 items-start justify-center gap-y-10">
                    <Text className="text-xl font-raleway-600 text-zinc-950">Menu</Text>
                    <View className="w-full gap-y-2">
                        <Link href="/dashboard" asChild>
                            <Pressable className={cn("flex-row items-center justify-start h-10 px-4 rounded-lg gap-x-2 active:bg-zinc-100", pathname === "/dashboard" && "bg-zinc-100")}>
                                <LayoutDashboardIcon size={18} color={colors.zinc["950"]} />
                                <Text className="text-zinc-950 font-raleway-500">Dashboard</Text>
                            </Pressable>
                        </Link>
                        <Link href="/dashboard/generate-report" asChild>
                            <Pressable className={cn("flex-row items-center justify-start h-10 px-4 rounded-lg gap-x-2 active:bg-zinc-100", pathname.startsWith("/dashboard/generate-report") && "bg-zinc-100")}>
                                <FilePlusIcon size={18} color={colors.zinc["950"]} />
                                <Text className="text-zinc-950 font-raleway-500">Generate Report</Text>
                            </Pressable>
                        </Link>
                        <Link href="/dashboard/timesheet" asChild>
                            <Pressable className={cn("flex-row items-center justify-start h-10 px-4 rounded-lg gap-x-2 active:bg-zinc-100", pathname.startsWith("/dashboard/timesheet") && "bg-zinc-100")}>
                                <ClockIcon size={18} color={colors.zinc["950"]} />
                                <Text className="text-zinc-950 font-raleway-500">Timesheet</Text>
                            </Pressable>
                        </Link>
                        <Link href="/dashboard/account" asChild>
                            <Pressable className={cn("flex-row items-center justify-start h-10 px-4 rounded-lg gap-x-2 active:bg-zinc-100", pathname.startsWith("/dashboard/account") && "bg-zinc-100")}>
                                <UserCircleIcon size={18} color={colors.zinc["950"]} />
                                <Text className="text-zinc-950 font-raleway-500">Account</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}