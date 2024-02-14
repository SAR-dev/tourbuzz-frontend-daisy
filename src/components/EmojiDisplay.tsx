import EmojiSelect from './EmojiSelect'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { EmojiSummaryType } from '@src/types/reaction'
import classNames from 'classnames'

const EmojiDisplay = ({
    reactionSummary,
    handleEmojiSelect
}:{
    reactionSummary: EmojiSummaryType
    handleEmojiSelect: (props: string) => void
}) => {
    return (
        <div className="flex gap-1">
            <EmojiSelect
                button={
                    <button className="reaction-badge w-7 p-0">
                        <FaceSmileIcon className="h-5 w-5" />
                    </button>
                }
                setEmoji={handleEmojiSelect}
            />
            {reactionSummary.topReactions.map((e, i) => (
                <button
                    className={classNames({
                        "reaction-badge": true,
                        "ring-1 ring-inset ring-info": e.reacted
                    })}
                    onClick={() => handleEmojiSelect(e.emoji)}
                    key={i}
                >
                    <span>{e.emoji}</span>
                    <span>{e.count}</span>
                </button>
            ))}
            {reactionSummary.remainingCountSum > 0 && (
                <button className="reaction-badge">
                    <span>+</span>
                    <span>{reactionSummary.remainingCountSum}</span>
                </button>
            )}
        </div>
    )
}

export default EmojiDisplay