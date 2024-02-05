import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from './constantStore'

export enum ThemeName {
    Light = "light",
    Dark = "dark",
    Corporate = "corporate",
    Retro = "retro",
    Cupcake = "cupcake",
    Luxury = "luxury"
}

type ThemeStore = {
    theme: ThemeName
    setTheme: (props: ThemeName) => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: ThemeName.Light,
            setTheme: (value: ThemeName) => {
                set(() => ({ theme: value }))
                document.querySelector('html')?.setAttribute('data-theme', value)
            },
        }), {
        name: constants.THEME_STORE_KEY,
        storage: createJSONStorage(() => localStorage),
    })
)