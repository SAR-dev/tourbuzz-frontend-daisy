import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from './constantStore'
import { JwtPayload, jwtDecode } from 'jwt-decode'

type AuthStore = {
    token: string | null,
    setToken: (props: string | null) => void,
    isLoggedIn: () => boolean,
    getLoggedInUserId: () => number
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            setToken: (value: string | null) => {
                set(() => ({ token: value }))
            },
            isLoggedIn: () => {
                const authToken = get().token;
                if(!authToken) return false;
                const decoded: JwtPayload = jwtDecode(authToken)
                const now = Math.floor(Date.now() / 1000);
                if(!decoded.exp || !decoded.iat) return false;
                if(decoded.exp <= now) return false;
                return true;
            },
            getLoggedInUserId: () => {
                const authToken = get().token;
                if(!authToken) return 0;
                const decoded: JwtPayload = jwtDecode(authToken)
                const now = Math.floor(Date.now() / 1000);
                if(!decoded.exp || !decoded.iat) return 0;
                if(decoded.exp <= now) return 0;
                return Number(decoded.sub);
            }
        }), {
        name: constants.JWT_AUTH_KEY,
        storage: createJSONStorage(() => localStorage),
    })
)