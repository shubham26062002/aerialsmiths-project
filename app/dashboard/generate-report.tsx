import { GenerateReportForm } from "@/components/generate-report-form"
import { useScreenTitle } from "@/hooks/use-screen-title"
import { useShowBackButton } from "@/hooks/use-show-back-button"
import { usePathname } from "expo-router"
import { useEffect } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native"

const GenerateReportScreen = () => {
    const pathname = usePathname()

    const { setTitle } = useScreenTitle()

    const { setShowBackButton } = useShowBackButton()

    useEffect(() => {
        if (pathname === "/dashboard/generate-report") {
            setTitle("Generate Report")

            setShowBackButton(false)
        }
    }, [pathname])

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
                        <Text className="text-3xl font-raleway-600 text-zinc-950">Generate PDF Report</Text>
                        <Text className="text-zinc-400 font-raleway-400 text-lg">Fill the details given below to generate report in PDF format.</Text>
                    </View>
                    <GenerateReportForm />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default GenerateReportScreen