import { TanstackReactQueryProvider } from "@/components/providers/tanstack-react-query-provider"
import "@/global.css"
import { Raleway_100Thin, Raleway_100Thin_Italic, Raleway_200ExtraLight, Raleway_200ExtraLight_Italic, Raleway_300Light, Raleway_300Light_Italic, Raleway_400Regular, Raleway_400Regular_Italic, Raleway_500Medium, Raleway_500Medium_Italic, Raleway_600SemiBold, Raleway_600SemiBold_Italic, Raleway_700Bold, Raleway_700Bold_Italic, Raleway_800ExtraBold, Raleway_800ExtraBold_Italic, Raleway_900Black, Raleway_900Black_Italic, useFonts } from "@expo-google-fonts/raleway"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Raleway_100Thin,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light,
    Raleway_300Light_Italic,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black,
    Raleway_900Black_Italic,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <TanstackReactQueryProvider>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="dashboard" />
        </Stack>
      </ThemeProvider>
    </TanstackReactQueryProvider>
  )
}

export default RootLayout