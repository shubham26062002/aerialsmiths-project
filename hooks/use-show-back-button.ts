import { create } from "zustand"

type ShowBackButtonStore = {
    showBackButton: boolean,
    setShowBackButton: (showBackButton: boolean) => void,
}

export const useShowBackButton = create<ShowBackButtonStore>((set) => ({
    showBackButton: false,
    setShowBackButton: (showBackButton) => set({
        showBackButton,
    }),
}))