import { FaceSmileIcon } from '@heroicons/react/24/outline'
import EmojiSelect from './EmojiSelect'
import { EmojiSummaryType } from '@src/types/reaction'
import classNames from 'classnames'

const EmojiDisplay = ({
    reactionSummary,
    handleEmojiSelect,
    minimal
}:{
    reactionSummary: EmojiSummaryType
    handleEmojiSelect: (props: string) => void
    minimal?: boolean
}) => {
    return (
        <div className="flex gap-2 items-center">
            <EmojiSelect
                button={
                    <button className="reaction-badge w-7 p-0 border border-base-300">
                        <FaceSmileIcon className="h-6 w-6" />
                    </button>
                }
                setEmoji={handleEmojiSelect}
            />
            {reactionSummary.topReactions.map((e, i) => (
                <button
                    className={classNames({
                        "reaction-badge outline outline-1 outline-base-100/50": true,
                        "border-2 border-info/50": e.reacted && !minimal,
                        "border border-base-300": minimal,
                        "bg-base-200": e.reacted && minimal
                    })}
                    onClick={() => handleEmojiSelect(e.emoji)}
                    key={i}
                >
                    <span>{e.emoji}</span>
                    <span>{e.count}</span>
                </button>
            ))}
            {reactionSummary.remainingCountSum > 0 && (
                <button className="reaction-badge border border-base-300">
                    <span>➕</span>
                    <span>{reactionSummary.remainingCountSum}</span>
                </button>
            )}
        </div>
    )
}

export default EmojiDisplay