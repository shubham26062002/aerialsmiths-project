import { ActivityIndicator, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

export const AuthLoadingIndicator = () => {
    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1">
                <View className="flex-1 py-10 px-8 items-center justify-center">
                    <ActivityIndicator className="text-zinc-950 size-7" size={28} color={colors.zinc["950"]} />
                </View>
            </SafeAreaView>
        </View>
    )
}