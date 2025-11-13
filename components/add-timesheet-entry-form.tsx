import { useAddTimesheetEntry } from "@/hooks/use-add-timesheet-entry"
import { cn } from "@/lib/cn"
import { addTimesheetEntrySchema } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker from "@react-native-community/datetimepicker"
import { format, parseISO } from "date-fns"
import * as Haptics from "expo-haptics"
import { ChevronDownIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import colors from "tailwindcss/colors"
import { z } from "zod"

type AddTimesheetEntryFormProps = {
    clientsDropdownData: {
        value: string,
        label: string,
    }[],
}

export const AddTimesheetEntryForm = ({
    clientsDropdownData,
}: AddTimesheetEntryFormProps) => {
    const { mutation } = useAddTimesheetEntry()

    const [showDatePicker, setShowDatePicker] = useState(false)

    const [showStartTimePicker, setShowStartTimePicker] = useState(false)

    const [showEndTimePicker, setShowEndTimePicker] = useState(false)

    const now = new Date()

    const today = new Date(now)

    const startTime = new Date(now)

    const endTime = new Date(now)

    today.setHours(0, 0, 0, 0)

    startTime.setFullYear(today.getFullYear(), today.getMonth(), today.getDate())

    startTime.setHours(10, 0, 0, 0)

    endTime.setFullYear(today.getFullYear(), today.getMonth(), today.getDate())

    endTime.setHours(17, 0, 0, 0)

    const { handleSubmit, control, reset, formState, watch, setValue } = useForm<z.infer<typeof addTimesheetEntrySchema>>({
        resolver: zodResolver(addTimesheetEntrySchema),
        defaultValues: {
            position: "",
            siteAddress: "",
            client: "",
            date: today.toISOString(),
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            remarks: "",
        },
        mode: "onChange",
    })

    useEffect(() => {
        const date = new Date(watch("date"))

        const startTime = new Date(watch("startTime"))

        const endTime = new Date(watch("endTime"))

        const newStartTime = new Date(date)

        newStartTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)

        const newEndTime = new Date(date)

        newEndTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0)

        setValue("startTime", newStartTime.toISOString())

        setValue("endTime", newEndTime.toISOString())
    }, [watch("date")])

    const onPress = handleSubmit(async (data) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        return mutation.mutate(data)
    })

    return (
        <View className="gap-y-4">
            <Controller control={control} name="client" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Client</Text>
                    <View className={cn("", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")}>
                        <Dropdown disable={mutation.isPending} data={clientsDropdownData} valueField="value" labelField="label" value={field.value} onChange={(item) => field.onChange(item.value)} onBlur={field.onBlur} selectedTextStyle={{
                            color: !!formState.errors.client?.message ? colors.red["600"] : colors.zinc["950"],
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
                            backgroundColor: !!formState.errors.client?.message ? `${colors.red["600"]}1A` : colors.zinc["100"],
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: "white",
                        }} renderRightIcon={() => (
                            <ChevronDownIcon className={cn("text-zinc-950 size-[1.125rem]", !!formState.errors.client?.message && "text-red-600")} size={18} color={!!formState.errors.client?.message ? colors.red["600"] : colors.zinc["950"]} />
                        )} placeholder="Select client" placeholderStyle={{
                            color: !!formState.errors.client?.message ? colors.red["600"] : colors.zinc["950"],
                            fontFamily: "Raleway_500Medium",
                            fontSize: 15,
                        }} />
                    </View>

                    {!!formState.errors.client?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.client.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="position" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Position</Text>
                    <TextInput className={cn("h-10 py-0 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.position?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter position" editable={!mutation.isPending} autoCapitalize="words" autoCorrect={true} spellCheck={true} importantForAutofill="yes" textContentType="jobTitle" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" />

                    {!!formState.errors.position?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.position.message}</Text>
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
            <Controller control={control} name="startTime" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Start Time</Text>
                    <Pressable className={cn("h-10 px-4 rounded-lg items-center justify-center bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.startTime?.message && "bg-red-600/10 active:bg-red-600/20")} onPress={() => setShowStartTimePicker(true)} disabled={mutation.isPending}>
                        <Text className={cn("font-raleway-500 text-zinc-950", !!formState.errors.startTime?.message && "text-red-600")}>{format(parseISO(field.value), "hh:mm a")}</Text>
                    </Pressable>

                    {showStartTimePicker && (
                        <DateTimePicker mode="time" disabled={mutation.isPending} value={new Date(field.value)} onBlur={field.onBlur} onChange={(_, value) => {
                            if (!!value) {
                                const newValue = new Date(value)

                                const selectedDate = new Date(watch("date"))

                                newValue.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

                                newValue.setSeconds(0, 0)

                                field.onChange(newValue.toISOString())
                            }

                            return setShowStartTimePicker(false)
                        }} />
                    )}

                    {!!formState.errors.startTime?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.startTime.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="endTime" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">End Time</Text>
                    <Pressable className={cn("h-10 px-4 rounded-lg items-center justify-center bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.endTime?.message && "bg-red-600/10 active:bg-red-600/20")} onPress={() => setShowEndTimePicker(true)} disabled={mutation.isPending}>
                        <Text className={cn("font-raleway-500 text-zinc-950", !!formState.errors.endTime?.message && "text-red-600")}>{format(parseISO(field.value), "hh:mm a")}</Text>
                    </Pressable>

                    {showEndTimePicker && (
                        <DateTimePicker mode="time" disabled={mutation.isPending} value={new Date(field.value)} onBlur={field.onBlur} onChange={(_, value) => {
                            if (!!value) {
                                const newValue = new Date(value)

                                const selectedDate = new Date(watch("date"))

                                newValue.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

                                newValue.setSeconds(0, 0)

                                field.onChange(newValue.toISOString())
                            }

                            return setShowEndTimePicker(false)
                        }} />
                    )}

                    {!!formState.errors.endTime?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.endTime.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="siteAddress" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Site Address</Text>
                    <TextInput className={cn("h-40 py-2.5 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.siteAddress?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter site address" editable={!mutation.isPending} autoCapitalize="words" autoComplete="street-address" autoCorrect={true} spellCheck={true} importantForAutofill="yes" textContentType="fullStreetAddress" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" textAlignVertical="top" multiline={true} />

                    {!!formState.errors.siteAddress?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.siteAddress.message}</Text>
                    )}

                </View>
            )} />
            <Controller control={control} name="remarks" render={({
                field,
            }) => (
                <View className="gap-y-2">
                    <Text className="font-raleway-500 text-zinc-950 uppercase">Remarks</Text>
                    <TextInput className={cn("h-40 py-2.5 px-3 rounded-lg border border-zinc-200 font-raleway-400 text-zinc-950 focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none", !!formState.errors.remarks?.message && "border-red-600 focus:border-red-600")} placeholderClassName="text-zinc-400" placeholderTextColor={colors.zinc["400"]} placeholder="Enter remarks" editable={!mutation.isPending} autoCapitalize="sentences" autoComplete="street-address" autoCorrect={true} spellCheck={true} importantForAutofill="yes" textContentType="fullStreetAddress" returnKeyType="next" onBlur={field.onBlur} value={field.value} onChangeText={field.onChange} keyboardAppearance="light" textAlignVertical="top" multiline={true} />

                    {!!formState.errors.remarks?.message && (
                        <Text className="font-raleway-300 text-red-600">{formState.errors.remarks.message}</Text>
                    )}

                </View>
            )} />
            <View className="gap-x-4 flex-row">
                <Pressable className={cn("flex-1 flex-row items-center justify-center gap-x-2 h-12 px-5 rounded-lg border border-zinc-200 active:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} disabled={mutation.isPending} onPress={() => reset()}>
                    <RefreshCwIcon className="text-zinc-950 size-[1.125rem]" color={colors.zinc["950"]} size={18} />
                    <Text className="text-zinc-950 font-raleway-500">Reset</Text>
                </Pressable>
                <Pressable className={cn("flex-1 flex-row items-center justify-center gap-x-2 h-12 px-5 rounded-lg bg-zinc-950 active:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none", mutation.isPending && "opacity-50 cursor-not-allowed pointer-events-none")} disabled={mutation.isPending} onPress={onPress}>

                    {mutation.isPending ? (
                        <ActivityIndicator className="text-white size-5" color="white" size={20} />
                    ) : (
                        <>
                            <PlusCircleIcon className="text-white size-[1.125rem]" color="white" size={18} />
                            <Text className="text-white font-raleway-500">Add</Text>
                        </>
                    )}

                </Pressable>
            </View>
        </View>
    )
}