import { formatDate, parrseToNDigit } from "@src/functions/helpers"
import { constants } from "@src/stores/constantStore"
import { ChildCommentType, ParentCommentType } from "@src/types/comment"
import TimeAgo from 'react-timeago'
import ImageLoader from "./ImageLoader"
import { useMemo, useRef, useState } from "react"
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { useDebounceFn } from "ahooks"

const ChildComment = ({ comment }: { comment: ChildCommentType }) => {
    const formattedDate = formatDate(comment.created_at)
    return (
        <div className="relative pl-16">
            <span
                className="absolute left-8 top-7 h-[1.5px] w-16 bg-base-300 group-hover:bg-info/50"
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

const TreeComment = ({
    comment,
    last,
    submitReply
}: {
    comment: ParentCommentType,
    last: boolean,
    submitReply: ({ ...props }: {
        parent_id: number,
        setLoading: (props: boolean) => void,
        replyDetails: string,
        setReplyDetails: (props: string) => void,
        setShowReplyEditor: (props: boolean) => void
    }) => void
}) => {
    const replyEditorRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [replyDetails, setReplyDetails] = useState("")
    const [showReplyEditor, setShowReplyEditor] = useState(false)

    const [showReplies, setShowReplies] = useState(false)
    const formattedDate = formatDate(comment.created_at)
    const avatars = useMemo(() => [...new Set(comment.children.map(e => e.author.avatar?.thumbnail_url))], [comment.children])

    const { run } = useDebounceFn(
        () => {
            if (replyEditorRef.current) {
                replyEditorRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }
        },
        {
            wait: 500,
        },
    );

    const showReply = () => {
        setShowReplies(true)
        setShowReplyEditor(true)
        run()
    }

    return (
        <li className="group">
            <div className="relative pb-8">
                {!last && (
                    <span
                        className="absolute left-8 top-0 h-full w-[1.5px] bg-base-300 group-hover:bg-info/50"
                    />
                )}
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
                        <div className="flex gap-3 items-center mt-1">
                            <button className="flex text-info text-sm font-medium items-center gap-2" onClick={showReply}>
                                <ChatBubbleLeftIcon className="h-5 w-5" />
                                Reply
                            </button>
                            {avatars.length > 0 && !showReplies && (
                                <div className="flex gap-2 items-center">
                                    {avatars.map((e, i) => (
                                        <div className="h-5 w-5 card" key={i}>
                                            <ImageLoader src={e} className="h-5 w-5 object-cover card" />
                                        </div>
                                    ))}
                                    <button className="text-info text-sm font-medium" onClick={() => setShowReplies(true)}>
                                        {comment.child_count} Replies
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {comment.children.length > 0 && showReplies && (
                    <div className="flex flex-col gap-8 mt-8">
                        {comment.children.map((e, i) => (
                            <ChildComment comment={e} key={i} />
                        ))}
                    </div>
                )}
                {showReplyEditor && (
                    <div className="relative pl-16 mt-8" ref={replyEditorRef}>
                        <span
                            className="absolute left-8 top-7 h-[1.5px] w-16 bg-base-300 group-hover:bg-info/50"
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
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex gap-1 items-center">
                                    <div className="font-medium">{comment.author.name}</div>
                                </div>
                                <div>
                                    <textarea
                                        rows={6}
                                        className="textarea textarea-bordered w-full custom-scrollbar resize-none"
                                        placeholder="Share your thoughts..."
                                        value={replyDetails}
                                        onChange={e => setReplyDetails(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <div className="flex gap-3 mt-1">
                                    <button className="btn btn-info btn-sm" disabled={isLoading} onClick={() => submitReply({parent_id: comment.id, setLoading: setIsLoading, replyDetails, setReplyDetails, setShowReplyEditor})}>
                                        {isLoading && (
                                            <div className="loading h-5 w-5" />
                                        )}
                                        Send Reply
                                    </button>
                                    <button className="btn btn-sm" onClick={() => setShowReplyEditor(false)}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </li>
    )
}

const CommentList = ({
    comments,
    limit,
    toogleLimit,
    submitReply
}: {
    comments: ParentCommentType[],
    limit: number,
    toogleLimit: () => void,
    submitReply: ({ ...props }: {
        parent_id: number,
        setLoading: (props: boolean) => void,
        replyDetails: string,
        setReplyDetails: (props: string) => void,
        setShowReplyEditor: (props: boolean) => void
    }) => void
}) => {
    return (
        <section>
            <ul className="mt-5">
                {comments.map((comment, i) => (
                    <TreeComment comment={comment} key={comment.id} last={comments.length - 1 === i} submitReply={submitReply} />
                ))}
            </ul>

            {comments.length !== 0 && (<>
                {(limit !== 0 || comments.length < constants.COMMENT_LIMIT.ARTICLE) ? (
                    <button className="mt-3 btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => toogleLimit()}>Show all threads</button>
                ) : (
                    <button className="mb-3 btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => toogleLimit()}>Show latest threads</button>
                )}
            </>)}
        </section>
    )
}

export default CommentList
