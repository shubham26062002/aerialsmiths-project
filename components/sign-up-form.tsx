import { useSignUp } from "@/hooks/use-sign-up"
import { cn } from "@/lib/cn"
import { signUpSchema } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Haptics from "expo-haptics"
import { UserPlusIcon } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native"
import colors from "tailwindcss/colors"
import { z } from "zod"

export const SignUpForm = () => {
    const { mutation } = useSignUp()

    const { handleSubmit, control, formState } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    })

    const onPress = handleSubmit(async (data) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        return mutation.mutate(data)
    })

    return (
        <View className="gap-y-4">
            <Controller control={control} name="name" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Name</Text>
                    <TextInput className={cn("h-10 py-0 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.name?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter name" editable={!mutation.isPending} autoCapitalize="words" autoComplete="name" autoCorrect={true} spellCheck={true} importantForAutofill="yes" textContentType="name" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" />

                    {!!formState.errors.name?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.name.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="email" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Email</Text>
                    <TextInput className={cn("h-10 py-0 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.email?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter email" editable={!mutation.isPending} autoCapitalize="none" autoComplete="email" autoCorrect={false} spellCheck={false} importantForAutofill="yes" inputMode="email" keyboardType="email-address" textContentType="emailAddress" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={(value) => field.onChange(value.toLowerCase())} keyboardAppearance="light" />

                    {!!formState.errors.email?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.email.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="password" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Password</Text>
                    <TextInput className={cn("h-10 py-0 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.password?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter password" editable={!mutation.isPending} autoCapitalize="none" autoComplete="password" autoCorrect={false} spellCheck={false} importantForAutofill="yes" textContentType="password" returnKeyType="done" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} secureTextEntry={true} keyboardAppearance="light" />

                    {!!formState.errors.password?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.password.message}</Text>
                    )}

                </View>
            )} />
            <Pressable className={cn("flex-row items-center justify-center gap-x-2 h-12 px-5 rounded-lg bg-zinc-950 active:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} disabled={mutation.isPending} onPress={onPress}>

                {mutation.isPending ? (
                    <ActivityIndicator className="text-white size-5" color="white" size={20} />
                ) : (
                    <>
                        <UserPlusIcon className="text-white size-[1.125rem]" color="white" size={18} />
                        <Text className="text-white font-raleway-500">Create account</Text>
                    </>
                )}

            </Pressable>
        </View>
    )
}