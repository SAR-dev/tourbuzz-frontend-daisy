import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { CommentType } from "@src/types/comment"
import TimeAgo from 'react-timeago'

const Comment = ({ comment }: { comment: CommentType }) => {
    // const replies = useQuery<UserDataType, Error>({
    //     queryKey: ['me'],
    //     queryFn: () => getLoggedInUser(),
    //     enabled: isLoggedIn()
    // })

    return (
        <div className="grid grid-cols-1 gap-6 pt-6">
            <article>
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={comment.author.avatar?.thumbnail_url}
                            />
                            {comment.author.name}
                        </p>
                        <p className="text-sm text-base-content/70">
                            <TimeAgo date={comment.created_at} />
                        </p>
                    </div>
                    <button className="btn btn-ghost btn-xs">
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                    </button>
                </footer>
                <p>
                    {comment.details}
                </p>
                <div className="flex items-center mt-4 space-x-4">
                    <button className="flex gap-2 items-center text-sm font-medium text-base-content/70">
                        <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                        Replies ({comment.child_count})
                    </button>
                </div>
            </article>
            {/* <article className="mb-3 ml-12">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough"
                            />
                            Michael Gough
                        </p>
                        <p className="text-sm text-base-content/70">
                            Feb. 8, 2022
                        </p>
                    </div>
                    <button className="btn btn-ghost btn-xs">
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                    </button>
                </footer>
                <p>
                    Much appreciated! Glad you liked it ☺️
                </p>
            </article> */}
        </div>
    )
}

const CommentList = ({ comments }: { comments: CommentType[] }) => {
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
            <div className="flex flex-col gap-6 divide-y divide-base-300">
                {comments.map((e, i) => (
                    <Comment comment={e} key={i} />
                ))}
            </div>
        </section>
    )
}

export default CommentList