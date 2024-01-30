import { create } from 'zustand'

type ImageModalStore = {
    url: string | null
    openModal: (props: string) => void
    closeModal: () => void
}

export const useImageModalStore = create<ImageModalStore>((set) => ({
    url: null,
    openModal: (url: string) => set(() => ({ url })),
    closeModal: () => set(() => ({ url: null })),
}))