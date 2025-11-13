import { AddTimesheetEntryForm } from "@/components/add-timesheet-entry-form"
import { DashboardLoadingIndicator } from "@/components/dashboard-loading-indicator"
import { useGetClients } from "@/hooks/use-get-clients"
import { useScreenTitle } from "@/hooks/use-screen-title"
import { useShowBackButton } from "@/hooks/use-show-back-button"
import { usePathname } from "expo-router"
import { useEffect } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native"

const AddEntryScreen = () => {
    const { data: clients = [], isLoading } = useGetClients()

    const pathname = usePathname()

    const { setTitle } = useScreenTitle()

    const { setShowBackButton } = useShowBackButton()

    useEffect(() => {
        if (pathname === "/dashboard/timesheet/add-entry") {
            setTitle("Add Timesheet Entry")

            setShowBackButton(true)
        }
    }, [pathname])

    if (isLoading || !clients) {
        return (
            <DashboardLoadingIndicator />
        )
    }

    return (
        <KeyboardAvoidingView className="flex-1" style={{
            flex: 1,
        }} contentContainerClassName="flex-1" contentContainerStyle={{
            flex: 1,
        }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
            <ScrollView className="flex-1 bg-white" style={{
                flex: 1,
                backgroundColor: "white",
            }} contentContainerClassName="flex-grow" contentContainerStyle={{
                flexGrow: 1,
            }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View className="flex-1 py-10 px-8 gap-y-10">
                    <View className="gap-y-2">
                        <Text className="text-3xl font-raleway-600 text-zinc-950">Add Timesheet Entry</Text>
                        <Text className="text-zinc-400 font-raleway-400 text-lg">Fill the details given below to insert new timesheet entry record.</Text>
                    </View>
                    <AddTimesheetEntryForm clientsDropdownData={clients.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }))} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddEntryScreen