import { EmojiType, emojis } from '@src/assets/emojis'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from './constantStore'

type EmojiStore = {
    defaultEmojis: EmojiType[]
    expanded: boolean
    setExpanded: (props: boolean) => void
}

export const useEmojiStore = create<EmojiStore>()(
    persist(
        (set) => ({
            defaultEmojis: emojis.filter(e => e.default),
            expanded: false,
            setExpanded: (value: boolean) => {
                set(() => ({ expanded: value }))
            },
        }), {
        name: constants.EMOJI_STORE_KEY,
        storage: createJSONStorage(() => localStorage),
    })
)