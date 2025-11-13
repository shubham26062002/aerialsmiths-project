import { AuthLoadingIndicator } from "@/components/auth-loading-indicator"
import { DrawerContent } from "@/components/drawer-content"
import { Header } from "@/components/header"
import { useAuth } from "@/components/use-auth"
import { Redirect } from "expo-router"
import { Drawer } from "expo-router/drawer"

const DashboardLayout = () => {
    const { isLoading, sessionToken } = useAuth()

    if (isLoading) {
        return (
            <AuthLoadingIndicator />
        )
    }

    if (!isLoading && !sessionToken) {
        return (
            <Redirect href="/" />
        )
    }

    return (
        <Drawer screenOptions={{
            header: ({
                navigation,
            }) => (
                <Header onMenuButtonPress={() => navigation.toggleDrawer()} />
            ),
        }} drawerContent={() => (
            <DrawerContent />
        )}>
            <Drawer.Screen name="index" />
            <Drawer.Screen name="generate-report" />
            <Drawer.Screen name="timesheet" />
            <Drawer.Screen name="account" />
        </Drawer>
    )
}

export default DashboardLayout