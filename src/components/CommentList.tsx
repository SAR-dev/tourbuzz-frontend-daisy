import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { formatDate, parrseToNDigit } from "@src/functions/helpers"
import { constants } from "@src/stores/constantStore"
import { ChildCommentType, ParentCommentType } from "@src/types/comment"
import TimeAgo from 'react-timeago'

const ChildComment = ({ comment }: { comment: ChildCommentType }) => {
    const formattedDate = formatDate(comment.created_at)
    return (
        <div className="relative pl-12 relative">
            <span
                className="absolute left-3 top-3 h-px w-16 bg-base-300 group-hover:bg-info/50"
            />
            <div className="flex items-start space-x-2">
                <div className="relative px-1 flex-shrink-0">
                    <div className="ring-1 ring-offset-2 ring-base-300 group-hover:ring-info rounded-full">
                        <img
                            src={comment.author.avatar?.optimized_url}
                            className="h-5 w-5 rounded-full object-cover"
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center text-sm">
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-base-content/70">
                            <TimeAgo minPeriod={60} date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour, 2)}:{parrseToNDigit(formattedDate.minute, 2)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="whitespace-pre-line mt-2">{comment.details}</div>
        </div>
    )
}

const TreeComment = ({ comment }: { comment: ParentCommentType }) => {
    const formattedDate = formatDate(comment.created_at)
    return (
        <li className="group">
            <div className="relative pb-5">
                <span
                    className="absolute left-3 top-0 h-full w-px bg-base-300 group-hover:bg-info/50"
                />
                <div className="relative flex items-start space-x-2">
                    <div className="relative px-1 flex-shrink-0">
                        <div className="ring-1 ring-offset-2 ring-base-300 group-hover:ring-info rounded-full">
                            <img
                                src={comment.author.avatar?.optimized_url}
                                className="h-5 w-5 rounded-full object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1 items-center text-sm">
                            <div className="font-medium">{comment.author.name}</div>
                            <div className="text-base-content/70">
                                <TimeAgo minPeriod={60} date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour, 2)}:{parrseToNDigit(formattedDate.minute, 2)}
                            </div>
                        </div>
                        <div className="whitespace-pre-line">{comment.details}</div>
                        <div>
                            <button className="flex gap-2 items-center text-sm font-medium text-base-content/50 hover:text-base-content">
                                <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
                {comment.children.length > 0 && (
                    <div className="flex flex-col gap-5 mt-5">
                        {comment.children.map((e, i) => (
                            <ChildComment comment={e} key={i} />
                        ))}
                    </div>
                )}
            </div>
        </li>
    )
}

const CommentList = ({
    comments,
    limit,
    toogleLimit
}: {
    comments: ParentCommentType[],
    limit: number,
    toogleLimit: () => void
}) => {
    return (
        <section>
            {!(limit !== 0 || comments.length < constants.COMMENT_LIMIT.ARTICLE) && (
                <button className="mb-3 btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => toogleLimit()}>Show latest threads</button>
            )}
            <ul className="mt-5">
                {comments.map((comment) => (
                    <TreeComment comment={comment} key={comment.id} />
                ))}
            </ul>
            {(limit !== 0 || comments.length < constants.COMMENT_LIMIT.ARTICLE) && (
                <button className="mt-3 btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => toogleLimit()}>Show all threads</button>
            )}
        </section>
    )
}

export default CommentList
