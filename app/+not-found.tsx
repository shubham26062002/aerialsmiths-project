import { Link } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const NotFoundScreen = () => {
    return (
        <ScrollView className="flex-1 bg-white" contentContainerClassName="flex-1">
            <SafeAreaView className="flex-1">
                <View className="flex-1 py-10 px-8 items-center justify-center gap-y-10">
                    <View className="gap-y-2">
                        <Text className="text-center text-3xl font-raleway-600 text-zinc-950">404 Not Found!</Text>
                        <Text className="text-center text-zinc-400 font-raleway-400 text-lg">The page you’re looking for doesn’t exist.</Text>
                    </View>
                    <Link href="/dashboard" asChild>
                        <Pressable className="h-12 px-5 rounded-lg items-center justify-center bg-zinc-950 active:bg-zinc-800">
                            <Text className="text-white font-raleway-500">Go to dashboard</Text>
                        </Pressable>
                    </Link>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default NotFoundScreen