import { SignUpForm } from "@/components/sign-up-form"
import { Link, useRouter } from "expo-router"
import { ArrowLeftIcon } from "lucide-react-native"
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

const SignUpScreen = () => {
    const router = useRouter()

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
                <SafeAreaView className="flex-1">
                    <View className="flex-1 py-10 px-8 items-start justify-between gap-y-10">

                        {router.canGoBack() && (
                            <Pressable className="size-10 rounded-lg items-center justify-center border border-zinc-200 active:bg-zinc-100" onPress={() => router.back()}>
                                <ArrowLeftIcon className="size-5 text-zinc-950" size={20} color={colors.zinc["950"]} />
                            </Pressable>
                        )}

                        <View className="w-full gap-y-10">
                            <View className="gap-y-2">
                                <Text className="text-center text-3xl font-raleway-600 text-zinc-950">Sign up</Text>
                                <Text className="text-center text-zinc-400 font-raleway-400 text-lg">Fill the details given below to create your account.</Text>
                            </View>
                            <SignUpForm />
                        </View>
                        <View className="w-full items-center justify-center">
                            <Link href="/sign-in" asChild>
                                <Pressable className="h-10 px-4 rounded-lg items-center justify-center active:bg-zinc-100">
                                    <Text className="font-raleway-500 text-zinc-950">Already have an account?</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen