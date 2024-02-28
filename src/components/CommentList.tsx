import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { formatDate, parrseToNDigit } from "@src/functions/helpers"
import { constants } from "@src/stores/constantStore"
import { CommentType } from "@src/types/comment"
import TimeAgo from 'react-timeago'

const TreeComment = ({ comment }: { comment: CommentType }) => {
    const formattedDate = formatDate(comment.created_at)
    return (
        <li className="group">
            <div className="relative pb-8">
                <span
                    className="absolute left-3 top-5 h-full w-0.5 bg-base-300 group-hover:bg-base-content/50"
                    aria-hidden="true"
                />
                <div className="relative flex items-start space-x-3">
                    <div>
                        <div className="relative px-1">
                            <div className="ring-2 ring-offset-2 ring-blue-500 rounded-full">
                                <img
                                    src={comment.author.avatar?.optimized_url}
                                    className="h-5 w-5 rounded-full object-cover"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1 items-center text-sm">
                            <div className="font-medium">Sayed Rafi</div>
                            <div className="text-base-content/70">
                                <TimeAgo date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour, 2)}:{parrseToNDigit(formattedDate.minute, 2)}
                            </div>
                        </div>
                        <div className="whitespace-pre-line">{comment.details}</div>
                        <div>
                            <button className="flex gap-2 items-center text-sm font-medium text-base-content/70">
                                <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                                Replies ({comment.child_count})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

const CommentList = ({
    comments,
    limit,
    setLimit
}: {
    comments: CommentType[],
    limit: number,
    setLimit: (props: number) => void
}) => {
    return (
        <section className="">
            <div className="flex justify-between items-center mb-6">
                <h2 className="title text-2xl font-semibold">
                    Discussion (20)
                </h2>
            </div>
            <div className="mb-6">
                <textarea
                    rows={6}
                    className="textarea textarea-bordered w-full"
                    placeholder="Share your thoughts..."
                    defaultValue={""}
                />
                <button className="btn btn-info">
                    Post comment
                </button>
            </div>
            {(limit !== 0 || comments.length < constants.COMMENT_LIMIT.ARTICLE) ? (
                <button className="btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => setLimit(0)}>Show previous threads</button>
            ) : (
                <button className="btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => setLimit(5)}>Show latest threads</button>
            )}
            <ul className="mt-5">
                {comments.map((e, i) => (
                    <TreeComment comment={e} key={i} />
                ))}
            </ul>
        </section>
    )
}

export default CommentList
