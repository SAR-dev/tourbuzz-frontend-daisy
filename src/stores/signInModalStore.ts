import { create } from 'zustand'

type SignInModalStore = {
    isOpenSignIn: boolean,
    setIsOpenSignIn: (props: boolean) => void,
    disableClose: boolean,
    setDisableClose: (props: boolean) => void,
}

export const useSignInModalStore = create<SignInModalStore>((set) => ({
    isOpenSignIn: false,
    setIsOpenSignIn: (isOpenSignIn: boolean) => set(() => ({ isOpenSignIn })),
    disableClose: false,
    setDisableClose: (disableClose: boolean) => set(() => ({ disableClose }))
}))