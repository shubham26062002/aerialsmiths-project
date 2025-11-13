import { Text, View } from "react-native"

export type TimesheetCardProps = {
    id: string,
    title: string,
    status: "pending" | "rejected" | "approved",
    client: string,
    startTime: string,
    endTime: string,
    totalHrs: string,
    position: string,
    siteAddress: string,
}

export const TimesheetCard = ({
    id,
    title,
    status,
    client,
    startTime,
    endTime,
    totalHrs,
    position,
    siteAddress,
}: TimesheetCardProps) => {
    return (
        <View className="py-8 px-6 rounded-2xl border border-zinc-200 border-dashed gap-y-4">
            <View className="flex-row items-center justify-center gap-x-4">
                <Text className="flex-1 font-inter-600 text-xl text-zinc-950">{title}</Text>

                {status === "pending" && (
                    <View className="py-2 px-4 rounded-full bg-blue-600/10">
                        <Text className="font-inter-500 text-blue-600">Pending</Text>
                    </View>
                )}

                {status === "approved" && (
                    <View className="py-2 px-4 rounded-full bg-green-600/10">
                        <Text className="font-inter-500 text-green-600">Approved</Text>
                    </View>
                )}

                {status === "rejected" && (
                    <View className="py-2 px-4 rounded-full bg-red-600/10">
                        <Text className="font-inter-500 text-red-600">Rejected</Text>
                    </View>
                )}

            </View>
            <View className="gap-y-2">
                <View className="flex-row gap-x-2">
                    <Text className="w-1/3 text-zinc-950 font-inter-500">Client: </Text>
                    <Text className="w-2/3 font-inter-400 text-zinc-400">{client}</Text>
                </View>
                <View className="flex-row gap-x-2">
                    <Text className="w-1/3 text-zinc-950 font-inter-500">Position: </Text>
                    <Text className="w-2/3 font-inter-400 text-zinc-400">{position}</Text>
                </View>
                <View className="flex-row gap-x-2">
                    <Text className="w-1/3 text-zinc-950 font-inter-500">Start Time: </Text>
                    <Text className="w-2/3 font-inter-400 text-zinc-400">{startTime}</Text>
                </View>
                <View className="flex-row gap-x-2">
                    <Text className="w-1/3 text-zinc-950 font-inter-500">End Time: </Text>
                    <Text className="w-2/3 font-inter-400 text-zinc-400">{endTime}</Text>
                </View>
                <View className="flex-row gap-x-2">
                    <Text className="w-1/3 text-zinc-950 font-inter-500">Total Hrs: </Text>
                    <Text className="w-2/3 font-inter-400 text-zinc-400">{totalHrs}</Text>
                </View>
                <View className="flex-row gap-x-2">
                    <Text className="w-1/3 text-zinc-950 font-inter-500">Site Address: </Text>
                    <Text className="w-2/3 font-inter-400 text-zinc-400">{siteAddress}</Text>
                </View>
            </View>
        </View>
    )
}