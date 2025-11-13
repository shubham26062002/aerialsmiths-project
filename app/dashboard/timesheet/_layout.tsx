import { Stack } from "expo-router"

const TimesheetLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default TimesheetLayout