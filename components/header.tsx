import { useScreenTitle } from "@/hooks/use-screen-title"
import { useShowBackButton } from "@/hooks/use-show-back-button"
import { useRouter } from "expo-router"
import { ArrowLeftIcon, MenuIcon } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

type HeaderProps = {
    onMenuButtonPress: () => void,
}

export const Header = ({
    onMenuButtonPress,
}: HeaderProps) => {
    const { title } = useScreenTitle()

    const router = useRouter()

    const { showBackButton } = useShowBackButton()

    return (
        <View className="bg-white border-b border-b-zinc-200">
            <SafeAreaView edges={["top"]}>
                <View className="py-6 px-8 flex-row gap-x-10 items-center justify-between">
                    <View className="flex-row flex-1 items-center justify-center gap-x-4">

                        {(router.canGoBack() && showBackButton) && (
                            <Pressable className="size-10 rounded-lg items-center justify-center active:bg-zinc-100" onPress={() => router.back()}>
                                <ArrowLeftIcon className="size-5 text-zinc-950" size={20} color={colors.zinc["950"]} />
                            </Pressable>
                        )}

                        <Text className="text-xl font-raleway-500 text-zinc-950 flex-1 line-clamp-1">{title}</Text>
                    </View>
                    <Pressable className="size-10 rounded-lg items-center justify-center active:bg-zinc-100" onPress={onMenuButtonPress}>
                        <MenuIcon className="size-5 text-zinc-950" size={20} color={colors.zinc["950"]} />
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    )
}