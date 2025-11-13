import { DashboardLoadingIndicator } from "@/components/dashboard-loading-indicator"
import { TimesheetCard, TimesheetCardProps } from "@/components/timesheet-card"
import { useGetTimesheetEntries } from "@/hooks/use-get-timesheet-entries"
import { useScreenTitle } from "@/hooks/use-screen-title"
import { useShowBackButton } from "@/hooks/use-show-back-button"
import { format, parseISO } from "date-fns"
import { Link, usePathname } from "expo-router"
import { ClockPlusIcon, PlusCircleIcon } from "lucide-react-native"
import { useEffect } from "react"
import { FlatList, Pressable, Text, View } from "react-native"
import colors from "tailwindcss/colors"

const TimesheetScreen = () => {
    const { data: timesheetEntries = [], isLoading } = useGetTimesheetEntries()

    const pathname = usePathname()

    const { setTitle } = useScreenTitle()

    const { setShowBackButton } = useShowBackButton()

    useEffect(() => {
        if (pathname === "/dashboard/timesheet") {
            setTitle("Timesheet")

            setShowBackButton(false)
        }
    }, [pathname])

    if (isLoading || !timesheetEntries) {
        return (
            <DashboardLoadingIndicator />
        )
    }

    return (
        <View className="flex-1 py-10 px-8 gap-y-10 bg-white">
            <View className="gap-y-2">
                <Text className="text-3xl font-raleway-600 text-zinc-950">Your Timesheet</Text>
                <Text className="text-zinc-400 font-raleway-400 text-lg">View all your inserted timesheet entries here.</Text>
            </View>

            {timesheetEntries.length > 0 ? (
                <FlatList data={timesheetEntries} keyExtractor={(item) => item.id} renderItem={
                    ({
                        item,
                    }) => {
                        const formattedItem: TimesheetCardProps = {
                            id: item.id,
                            title: format(parseISO(item.date), "EEEE - dd MMMM yyyy"),
                            status: item.status,
                            client: item.client.name,
                            startTime: format(parseISO(item.startTime), "hh:mm a"),
                            endTime: format(parseISO(item.endTime), "hh:mm a"),
                            totalHrs: item.totalHrs,
                            position: item.position,
                            siteAddress: item.siteAddress,
                        }

                        return (
                            <TimesheetCard {...formattedItem} />
                        )

                    }} showsVerticalScrollIndicator={false} contentContainerClassName="gap-y-4" />
            ) : (
                <View className="py-8 px-6 rounded-2xl border border-dashed border-zinc-200 items-center justify-center gap-y-4">
                    <ClockPlusIcon className="size-6 text-zinc-400" size={24} color={colors.zinc["400"]} />
                    <Text className="text-center text-zinc-400 font-raleway-400">All your inserted timesheet entries will appear here.</Text>
                </View>
            )}

            <Link href="/dashboard/timesheet/add-entry" asChild>
                <Pressable className="h-12 px-5 rounded-lg bg-zinc-950 active:bg-zinc-800 items-center justify-center flex-row gap-x-2">
                    <PlusCircleIcon className="text-white size-[1.125rem]" color="white" size={18} />
                    <Text className="font-raleway-500 text-white">Add entry</Text>
                </Pressable>
            </Link>
        </View >
    )
}

export default TimesheetScreen