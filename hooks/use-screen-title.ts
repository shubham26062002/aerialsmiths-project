import { create } from "zustand"

type ScreenTitleStore = {
    title: string,
    setTitle: (title: string) => void,
}

export const useScreenTitle = create<ScreenTitleStore>((set) => ({
    title: "",
    setTitle: (title) => set({
        title,
    }),
}))