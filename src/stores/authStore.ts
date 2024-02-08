import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from './constantStore'
import { JwtPayload, jwtDecode } from 'jwt-decode'

type AuthStore = {
    token: string | null,
    setToken: (props: string | null) => void,
    isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            setToken: (value: string | null) => {
                set(() => ({ token: value }))
            },
            isLoggedIn: () => {
                const token = get().token;
                if(!token) return false;
                const decoded: JwtPayload = jwtDecode(token)
                if(!decoded.exp || !decoded.iat) return false;
                if(decoded.exp <= decoded.iat) return false;
                return true;
            }
        }), {
        name: constants.JWT_AUTH_KEY,
        storage: createJSONStorage(() => localStorage),
    })
)