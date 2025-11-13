/** @type {import("tailwindcss").Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "raleway-100": ["Raleway_100Thin"],
        "raleway-100i": ["Raleway_100Thin_Italic"],
        "raleway-200": ["Raleway_200ExtraLight"],
        "raleway-200i": ["Raleway_200ExtraLight_Italic"],
        "raleway-300": ["Raleway_300Light"],
        "raleway-300i": ["Raleway_300Light_Italic"],
        "raleway-400": ["Raleway_400Regular"],
        "raleway-400i": ["Raleway_400Regular_Italic"],
        "raleway-500": ["Raleway_500Medium"],
        "raleway-500i": ["Raleway_500Medium_Italic"],
        "raleway-600": ["Raleway_600SemiBold"],
        "raleway-600i": ["Raleway_600SemiBold_Italic"],
        "raleway-700": ["Raleway_700Bold"],
        "raleway-700i": ["Raleway_700Bold_Italic"],
        "raleway-800": ["Raleway_800ExtraBold"],
        "raleway-800i": ["Raleway_800ExtraBold_Italic"],
        "raleway-900": ["Raleway_900Black"],
        "raleway-900i": ["Raleway_900Black_Italic"],
      },
    },
  },
  plugins: [],
}