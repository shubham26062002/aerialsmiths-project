import { ALLOWED_IMAGES_FORMATS, MAX_IMAGES_COUNT, REPORT_TYPES_DATA } from "@/constants"
import { useGenerateReport } from "@/hooks/use-generate-report"
import { cn } from "@/lib/cn"
import { generateReportSchema } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker from "@react-native-community/datetimepicker"
import { format, parseISO } from "date-fns"
import * as Haptics from "expo-haptics"
import * as ImagePicker from "expo-image-picker"
import { ChevronDownIcon, FilePlusIcon, ImagePlusIcon, ImagesIcon, RefreshCwIcon, XIcon } from "lucide-react-native"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import colors from "tailwindcss/colors"
import { z } from "zod"

export const GenerateReportForm = () => {
    const now = new Date()

    const today = new Date(now)

    today.setHours(0, 0, 0, 0)

    const [showDatePicker, setShowDatePicker] = useState(false)

    const [showDateOfServicePicker, setShowDateOfServicePicker] = useState(false)

    const { mutation } = useGenerateReport()

    const { handleSubmit, reset, control, formState, watch, setValue } = useForm<z.infer<typeof generateReportSchema>>({
        resolver: zodResolver(generateReportSchema),
        defaultValues: {
            type: "aerialsmiths",
            date: today.toISOString(),
            address: "",
            clientName: "",
            title: "",
            dateOfService: today.toISOString(),
            images: [],
        },
        mode: "onChange",
    })

    const images = watch("images")

    const placeholdersCount = (3 - (images.length % 3)) % 3

    const onPress = handleSubmit(async (data) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        return mutation.mutate(data)
    })

    const onUploadImagesButtonPress = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== "granted") {
                return Alert.alert("Permission Required", "This app requires access to your photos so you can select and upload them for your reports.")
            }

            const remaining = MAX_IMAGES_COUNT - images.length

            if (remaining <= 0) {
                return Alert.alert("Upload Limit Reached", `You’ve reached the upload limit. Each report can include up to ${MAX_IMAGES_COUNT} images.`)
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                quality: 1,
                allowsMultipleSelection: true,
                orderedSelection: true,
                selectionLimit: remaining,
                exif: true,
            })

            if (!result.canceled) {
                const newImages = result.assets

                const invalidImage = newImages.find((item) => {
                    const extension = item.uri.split(".").pop()?.toLowerCase() || item.type?.split("/").pop()?.toLowerCase()

                    if (!extension) {
                        return true
                    }

                    return !ALLOWED_IMAGES_FORMATS.includes(extension)
                })

                if (!!invalidImage) {
                    return Alert.alert("Unsupported Image Format", "Some of the selected images aren’t supported. Please upload only JPG, JPEG, or PNG files.")
                }

                const allImages = [...images, ...newImages]

                if (allImages.length > MAX_IMAGES_COUNT) {
                    return Alert.alert("Upload Limit Reached", `You’ve reached the upload limit. Each report can include up to ${MAX_IMAGES_COUNT} images.`)
                }

                return setValue("images", allImages)
            }

            return await Haptics.selectionAsync()
        } catch (error: any) {
            return Alert.alert("Image Upload Failed", "Something went wrong while uploading your images. Please try again later.")
        }
    }

    return (
        <View className="gap-y-4">
            <Controller control={control} name="type" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Type</Text>
                    <View className={cn("", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")}>
                        <Dropdown disable={mutation.isPending} data={REPORT_TYPES_DATA} valueField="value" labelField="label" value={field.value} onChange={(item) => field.onChange(item.value)} onBlur={field.onBlur} selectedTextStyle={{
                            color: !!formState.errors.type?.message ? colors.red["600"] : colors.zinc["950"],
                            fontFamily: "Raleway_500Medium",
                            fontSize: 15,
                        }} activeColor={colors.zinc["100"]} showsVerticalScrollIndicator={false} containerStyle={{
                            backgroundColor: "white",
                            overflow: "hidden",
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: colors.zinc["200"],
                        }} itemTextStyle={{
                            color: colors.zinc["950"],
                            fontFamily: "Raleway_500Medium",
                            fontSize: 15,
                        }} style={{
                            height: 38,
                            paddingHorizontal: 16,
                            paddingVertical: 0,
                            backgroundColor: !!formState.errors.type?.message ? `${colors.red["600"]}1A` : colors.zinc["100"],
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: "white",
                        }} renderRightIcon={() => (
                            <ChevronDownIcon className={cn("text-zinc-950 size-[1.125rem]", !!formState.errors.type?.message && "text-red-600")} size={18} color={!!formState.errors.type?.message ? colors.red["600"] : colors.zinc["950"]} />
                        )} />
                    </View>

                    {!!formState.errors.type?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.type.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="date" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Date</Text>
                    <Pressable className={cn("h-10 px-4 rounded-lg items-center justify-center bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.date?.message && "bg-red-600/10 active:bg-red-600/20")} onPress={() => setShowDatePicker(true)} disabled={mutation.isPending}>
                        <Text className={cn("font-raleway-500 text-zinc-950", !!formState.errors.date?.message && "text-red-600")}>{format(parseISO(field.value), "dd/MM/yyyy")}</Text>
                    </Pressable>

                    {showDatePicker && (
                        <DateTimePicker mode="date" disabled={mutation.isPending} value={new Date(field.value)} onBlur={field.onBlur} onChange={(_, value) => {
                            if (!!value) {
                                const newValue = new Date(value)

                                newValue.setHours(0, 0, 0, 0)

                                field.onChange(newValue.toISOString())
                            }

                            return setShowDatePicker(false)
                        }} />
                    )}

                    {!!formState.errors.date?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.date.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="address" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Address</Text>
                    <TextInput className={cn("h-40 py-2.5 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.address?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter address" editable={!mutation.isPending} autoCapitalize="words" autoComplete="street-address" autoCorrect={true} spellCheck={true} importantForAutofill="yes" textContentType="fullStreetAddress" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" textAlignVertical="top" multiline={true} />

                    {!!formState.errors.address?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.address.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="clientName" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Client Name</Text>
                    <TextInput className={cn("h-10 py-0 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.clientName?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter client name" editable={!mutation.isPending} autoCapitalize="words" autoComplete="name" autoCorrect={true} spellCheck={true} importantForAutofill="yes" textContentType="name" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" />

                    {!!formState.errors.clientName?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.clientName.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="title" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Title</Text>
                    <TextInput className={cn("h-10 py-0 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.title?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter title" editable={!mutation.isPending} autoCapitalize="words" autoCorrect={true} spellCheck={true} importantForAutofill="yes" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" />

                    {!!formState.errors.title?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.title.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="dateOfService" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Date Of Service</Text>
                    <Pressable className={cn("h-10 px-4 rounded-lg items-center justify-center bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.dateOfService?.message && "bg-red-600/10 active:bg-red-600/20")} onPress={() => setShowDateOfServicePicker(true)} disabled={mutation.isPending}>
                        <Text className={cn("font-raleway-500 text-zinc-950", !!formState.errors.dateOfService?.message && "text-red-600")}>{format(parseISO(field.value), "dd/MM/yyyy")}</Text>
                    </Pressable>

                    {showDateOfServicePicker && (
                        <DateTimePicker mode="date" disabled={mutation.isPending} value={new Date(field.value)} onBlur={field.onBlur} onChange={(_, value) => {
                            if (!!value) {
                                const newValue = new Date(value)

                                newValue.setHours(0, 0, 0, 0)

                                field.onChange(newValue.toISOString())
                            }

                            return setShowDateOfServicePicker(false)
                        }} />
                    )}

                    {!!formState.errors.dateOfService?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.dateOfService.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="images" render={() => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Images</Text>
                    <Pressable className={cn("items-center justify-center h-10 px-4 rounded-lg flex-row gap-x-2 bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.images?.message && "bg-red-600/10 active:bg-red-600/20")} disabled={mutation.isPending} onPress={onUploadImagesButtonPress}>
                        <ImagePlusIcon className={cn("size-[1.125rem] text-zinc-950", !!formState.errors.images?.message && "text-red-600")} size={18} color={!!formState.errors.images?.message ? colors.red["600"] : colors.zinc["950"]} />
                        <Text className={cn("font-raleway-500 text-zinc-950", !!formState.errors.images?.message && "text-red-600")}>Upload images</Text>
                    </Pressable>

                    {!!formState.errors.images?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.images.message}</Text>
                    )}

                </View>
            )} />

            {images.length > 0 ? (
                <View className="py-8 px-6 rounded-2xl border border-dashed border-zinc-200 flex-row flex-wrap gap-4 items-start justify-center">

                    {images.map((item, index) => (
                        <View className={cn("w-[29%] gap-y-2 items-center justify-center", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} key={index}>
                            <View className="w-full aspect-[2/3] bg-zinc-100 rounded overflow-hidden">
                                <Image className="size-full object-cover" source={{
                                    uri: item.uri,
                                }} alt={`Image ${index + 1}`} resizeMode="cover" />
                            </View>
                            <Pressable className={cn("items-center justify-center size-10 rounded-lg bg-red-600/10 active:bg-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} disabled={mutation.isPending} onPress={() => {
                                const newImages = images.filter((_, i) => i !== index)

                                return setValue("images", newImages)
                            }}>
                                <XIcon className="text-red-600 size-5" size={20} color={colors.red["600"]} />
                            </Pressable>
                        </View>
                    ))}

                    {Array.from({
                        length: placeholdersCount,
                    }).map((_, index) => (
                        <View className="w-[29%]" key={index} />
                    ))}

                </View>
            ) : (
                <View className="py-8 px-6 rounded-2xl border border-dashed border-zinc-200 items-center justify-center gap-y-4">
                    <ImagesIcon className="size-6 text-zinc-400" size={24} color={colors.zinc["400"]} />
                    <Text className="text-center text-zinc-400 font-raleway-400">All your uploaded images will appear here.</Text>
                </View>
            )}

            <View className="gap-x-4 flex-row">
                <Pressable className={cn("flex-1 flex-row items-center justify-center gap-x-2 h-12 px-5 rounded-lg border border-zinc-200 active:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} disabled={mutation.isPending} onPress={() => reset()}>
                    <RefreshCwIcon className="text-zinc-950 size-[1.125rem]" color={colors.zinc["950"]} size={18} />
                    <Text className="text-zinc-950 font-raleway-500">Reset</Text>
                </Pressable>
                <Pressable className={cn("flex-1 flex-row items-center justify-center gap-x-2 h-12 px-5 rounded-lg bg-zinc-950 active:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} disabled={mutation.isPending} onPress={onPress}>

                    {mutation.isPending ? (
                        <ActivityIndicator className="text-white size-5" color="white" size={20} />
                    ) : (
                        <FilePlusIcon className="text-white size-[1.125rem]" color="white" size={18} />
                    )}

                    <Text className="text-white font-raleway-500">Generate</Text>
                </Pressable>
            </View>
        </View>
    )
}