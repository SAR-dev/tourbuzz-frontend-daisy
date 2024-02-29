import { formatDate, parrseToNDigit } from "@src/functions/helpers"
import { constants } from "@src/stores/constantStore"
import { ChildCommentType, ParentCommentType } from "@src/types/comment"
import TimeAgo from 'react-timeago'
import ImageLoader from "./ImageLoader"
import { useMemo, useState } from "react"

const ChildComment = ({ comment }: { comment: ChildCommentType }) => {
    const formattedDate = formatDate(comment.created_at)
    return (
        <div className="relative pl-16 relative">
            <span
                className="absolute left-8 top-7 h-px w-16 bg-base-300 group-hover:bg-info/50"
            />
            <div className="relative flex items-start space-x-3">
                <div className="relative px-1 flex-shrink-0">
                    <div className="card ring-1 ring-offset-2 ring-base-300 group-hover:ring-info">
                        <ImageLoader
                            src={comment.author.avatar?.optimized_url}
                            className="h-14 w-14 card object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-base-content/70">
                            <TimeAgo minPeriod={60} date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour12, 2)}:{parrseToNDigit(formattedDate.minute, 2)} {formattedDate.period}
                        </div>
                    </div>
                    <div className="whitespace-pre-line">{comment.details}</div>
                </div>
            </div>
        </div>
    )
}

const TreeComment = ({ comment }: { comment: ParentCommentType }) => {
    const [showReplies, setShowReplies] = useState(false)
    const formattedDate = formatDate(comment.created_at)
    const avatars = useMemo(() => [...new Set(comment.children.map(e => e.author.avatar?.thumbnail_url))], [comment.children])

    return (
        <li className="group">
            <div className="relative pb-8">
                <span
                    className="absolute left-8 top-0 h-full w-px bg-base-300 group-hover:bg-info/50"
                />
                <div className="relative flex items-start space-x-3">
                    <div className="relative px-1 flex-shrink-0">
                        <div className="card ring-1 ring-offset-2 ring-base-300 group-hover:ring-info">
                            <ImageLoader
                                src={comment.author.avatar?.optimized_url}
                                className="h-14 w-14 card object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                            <div className="font-medium">{comment.author.name}</div>
                            <div className="text-base-content/70">
                                <TimeAgo minPeriod={60} date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour12, 2)}:{parrseToNDigit(formattedDate.minute, 2)} {formattedDate.period}
                            </div>
                        </div>
                        <div className="whitespace-pre-line">{comment.details}</div>
                        {avatars.length > 0 && !showReplies && (
                            <div className="flex gap-2 items-center mt-1">
                                {avatars.map(e => (
                                    <div className="h-5 w-5 card">
                                        <ImageLoader src={e} className="h-5 w-5 object-cover card" />
                                    </div>
                                ))}
                                <button className="text-info text-sm font-medium" onClick={() => setShowReplies(true)}>{comment.child_count} replies</button>
                            </div>
                        )}
                    </div>
                </div>
                {comment.children.length > 0 && showReplies && (
                    <div className="flex flex-col gap-8 mt-8">
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
