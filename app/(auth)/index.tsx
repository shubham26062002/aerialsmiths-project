import { Link } from "expo-router"
import { Image, Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const AuthScreen = () => {
    return (
        <ScrollView className="flex-1 bg-white" contentContainerClassName="flex-1">
            <SafeAreaView className="flex-1">
                <View className="flex-1 py-10 px-8 gap-y-10">
                    <View className="items-center justify-center flex-1">
                        <Image className="w-[200px] h-[200px] object-cover" source={require("../../assets/images/logo.png")} alt="Logo" />
                    </View>
                    <View className="gap-y-10">
                        <View className="gap-y-2">
                            <Text className="text-center text-3xl font-raleway-600 text-zinc-950">Aerialsmitsh Employee Dashboard</Text>
                            <Text className="text-center text-zinc-400 font-raleway-400 text-lg">Employee dashboard to generate PDF reports and manage timesheet entries.</Text>
                        </View>
                        <View className="gap-y-4">
                            <Link href="/sign-in" asChild>
                                <Pressable className="h-12 px-5 items-center justify-center rounded-lg bg-zinc-950 active:bg-zinc-800">
                                    <Text className="font-raleway-500 text-white">Sign in</Text>
                                </Pressable>
                            </Link>
                            <Link href="/sign-up" asChild>
                                <Pressable className="h-12 px-5 items-center justify-center rounded-lg active:bg-zinc-100 border border-zinc-200">
                                    <Text className="font-raleway-500 text-zinc-950">Sign up</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default AuthScreen