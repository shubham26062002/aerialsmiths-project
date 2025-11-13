import { ActivityIndicator, View } from "react-native"
import colors from "tailwindcss/colors"

export const DashboardLoadingIndicator = () => {
    return (
        <View className="bg-white flex-1 py-10 px-8 items-center justify-center">
            <ActivityIndicator className="text-zinc-950 size-7" size={28} color={colors.zinc["950"]} />
        </View>
    )
}