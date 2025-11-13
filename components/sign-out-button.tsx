import { useSignOut } from "@/hooks/use-sign-out"
import { cn } from "@/lib/cn"
import * as Haptics from "expo-haptics"
import { LogOutIcon } from "lucide-react-native"
import { ActivityIndicator, Pressable, Text } from "react-native"
import colors from "tailwindcss/colors"

export const SignOutButton = () => {
    const { mutation } = useSignOut()

    const onPress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        return mutation.mutate()
    }

    return (
        <Pressable className={cn("flex-row items-center justify-center gap-x-2 h-12 px-5 rounded-lg border border-zinc-200 active:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} onPress={onPress}>

            {!!mutation.isPending ? (
                <ActivityIndicator className="text-zinc-950 size-5" size={20} color={colors.zinc["950"]} />
            ) : (
                <LogOutIcon className="text-zinc-950 size-[1.125rem]" size={18} color={colors.zinc["950"]} />
            )}

            <Text className="font-raleway-500 text-zinc-950">Sign out</Text>
        </Pressable>
    )
}