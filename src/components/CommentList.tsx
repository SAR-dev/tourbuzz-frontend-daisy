import { formatDate, parrseToNDigit } from "@src/functions/helpers"
import { constants } from "@src/stores/constantStore"
import { AddCommentType, ChildCommentType, ParentCommentType, UpdateCommentType } from "@src/types/comment"
import TimeAgo from 'react-timeago'
import ImageLoader from "./ImageLoader"
import { useMemo, useRef, useState } from "react"
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { useDebounceFn } from "ahooks"
import { AnimatePresence, motion } from "framer-motion"
import TextareaAutosize from 'react-textarea-autosize';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ClipboardIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useAuthStore } from "@src/stores/authStore"
import { useSignInModalStore } from "@src/stores/signInModalStore"
import { useQueryClient } from "@tanstack/react-query"
import { DataResponseType, UserType } from "@src/types/base"
import toast from "react-hot-toast"
import classNames from "classnames"
import { deleteComment, updateComment } from "@src/api/comment"

const ChildComment = ({
    comment,
    limit,
    referenceId,
    queryKey,
    admins,
    staffs
}: {
    comment: ChildCommentType,
    limit: number,
    referenceId: number,
    queryKey: string,
    admins?: number[],
    staffs?: number[]
}) => {
    const queryClient = useQueryClient();
    const { getLoggedInUserId } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)

    const [showUpdateEditor, setShowUpdateEditor] = useState(false)
    const [updateDetails, setUpdateDetails] = useState(comment.details)

    const formattedDate = formatDate(comment.created_at)

    const handleUpdateComment = () => {
        if (updateDetails.length < 2) return;

        const data: UpdateCommentType = {
            id: comment.id,
            details: updateDetails
        }
        setIsLoading(true)
        updateComment({ data })
            .then(() => {
                setUpdateDetails(updateDetails)
                setShowUpdateEditor(false)
                queryClient.invalidateQueries({ queryKey: [queryKey, referenceId, limit] })
                toast.success("Comment has been updated")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleDeleteComment = () => {
        deleteComment({ id: comment.id })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: [queryKey, referenceId, limit] })
                toast.success("Comment has been deleted")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

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
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-1 items-center">
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-base-content/70">
                            <TimeAgo minPeriod={60} date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour12, 2)}:{parrseToNDigit(formattedDate.minute, 2)} {formattedDate.period}
                        </div>
                        {admins?.includes(comment.author.id) && (
                            <div className='card text-xs bg-primary/20 px-2 justify-center'>ADMIN</div>
                        )}
                        {staffs?.includes(comment.author.id) && (
                            <div className='card text-xs bg-secondary/20 px-2 justify-center'>STAFF</div>
                        )}
                    </div>
                    <ContextMenu.Root>
                        <ContextMenu.Trigger disabled={showUpdateEditor || comment.deleted}>
                            {showUpdateEditor ? (
                                <div className="w-full">
                                    <TextareaAutosize
                                        minRows={1}
                                        className="textarea textarea-bordered w-full resize-none custom-scrollbar"
                                        placeholder="Write a reply..."
                                        value={updateDetails}
                                        onChange={e => setUpdateDetails(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <div className="flex gap-3 mt-1">
                                        <button className="btn btn-info btn-sm" disabled={isLoading} onClick={handleUpdateComment}>
                                            {isLoading && (
                                                <div className="loading h-5 w-5" />
                                            )}
                                            Update
                                        </button>
                                        <button className="btn btn-sm" onClick={() => setShowUpdateEditor(false)}>Close</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="whitespace-pre-line">{comment.details}</div>
                            )}
                        </ContextMenu.Trigger>
                        <ContextMenu.Portal>
                            <ContextMenu.Content 
                                className="bg-base-100 shadow-lg border border-base-300 card w-48 p-3 flex-col" 
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                sideOffset={5} 
                                align="end"
                            >
                                <ContextMenu.Item
                                    className="flex text-sm gap-3 items-center cursor-pointer hover:bg-base-300 card flex-row p-2 text-info"
                                    onClick={() => navigator.clipboard.writeText(comment.details)}
                                >
                                    <ClipboardIcon className="h-4 w-4" />
                                    Copy
                                </ContextMenu.Item>
                                <ContextMenu.Item
                                    disabled={getLoggedInUserId() !== comment.author.id}
                                    className={classNames({
                                        "flex text-sm gap-3 items-center hover:bg-base-300 card flex-row p-2 text-primary": true,
                                        "cursor-not-allowed": getLoggedInUserId() !== comment.author.id,
                                        "cursor-pointer": getLoggedInUserId() === comment.author.id
                                    })}
                                    onClick={() => setShowUpdateEditor(true)}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                    Edit
                                </ContextMenu.Item>
                                <ContextMenu.Item
                                    disabled={getLoggedInUserId() !== comment.author.id}
                                    className={classNames({
                                        "flex text-sm gap-3 items-center card flex-row p-2": true,
                                        "cursor-not-allowed text-error/50": getLoggedInUserId() !== comment.author.id,
                                        "cursor-pointer hover:bg-base-300 text-error": getLoggedInUserId() === comment.author.id
                                    })}
                                    onClick={handleDeleteComment}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Delete
                                </ContextMenu.Item>
                            </ContextMenu.Content>
                        </ContextMenu.Portal>
                    </ContextMenu.Root>
                </div>
            </div>
        </div>
    )
}

const TreeComment = ({
    comment,
    last,
    submitReply,
    referenceId,
    queryKey,
    limit,
    admins,
    staffs
}: {
    comment: ParentCommentType,
    last: boolean,
    submitReply: ({ data }: { data: AddCommentType }) => Promise<DataResponseType>,
    referenceId: number,
    queryKey: string,
    limit: number,
    admins?: number[],
    staffs?: number[]
}) => {
    const queryClient = useQueryClient();
    const { getLoggedInUserId } = useAuthStore()
    const { isLoggedIn } = useAuthStore()
    const { setIsOpenSignIn } = useSignInModalStore();
    const replyEditorRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false)

    const [replyDetails, setReplyDetails] = useState("")
    const [showReplyEditor, setShowReplyEditor] = useState(false)

    const [showUpdateEditor, setShowUpdateEditor] = useState(false)
    const [updateDetails, setUpdateDetails] = useState(comment.details)

    const [showReplies, setShowReplies] = useState(false)
    const formattedDate = formatDate(comment.created_at)
    const avatars = useMemo(() => [...new Set(comment.children.map(e => e.author.avatar?.thumbnail_url))], [comment.children])

    const { run } = useDebounceFn(
        () => {
            if (replyEditorRef.current) {
                const elementRect = replyEditorRef.current.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.scrollY;
                const middle = absoluteElementTop - (window.innerHeight / 2);
                window.scrollTo({ top: middle, behavior: "smooth" });

                replyEditorRef.current.focus()
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

    const handleReplySubmit = () => {
        if (!isLoggedIn()) {
            setIsOpenSignIn(true)
            return;
        }
        if (replyDetails.length < 2) return;

        const data: AddCommentType = {
            reference_id: referenceId,
            parent_id: comment.id,
            details: replyDetails
        }
        setIsLoading(true)
        submitReply({ data })
            .then(() => {
                setReplyDetails("")
                setShowReplyEditor(false)
                queryClient.invalidateQueries({ queryKey: [queryKey, referenceId, limit] })
                toast.success("Comment has been updated")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleUpdateComment = () => {
        if (updateDetails.length < 2) return;

        const data: UpdateCommentType = {
            id: comment.id,
            details: updateDetails
        }
        setIsLoading(true)
        updateComment({ data })
            .then(() => {
                setUpdateDetails(updateDetails)
                setShowUpdateEditor(false)
                queryClient.invalidateQueries({ queryKey: [queryKey, referenceId, limit] })
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleDeleteComment = () => {
        deleteComment({ id: comment.id })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: [queryKey, referenceId, limit] })
                toast.success("Comment has been deleted")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    return (
        <li className="group">
            <div className="relative pb-8">
                {(!last || (last && comment.child_count > 0)) && (
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
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex gap-1 items-center">
                            <div className="font-medium">{comment.author.name}</div>
                            <div className="text-base-content/70">
                                <TimeAgo minPeriod={60} date={comment.created_at} /> at {parrseToNDigit(formattedDate.hour12, 2)}:{parrseToNDigit(formattedDate.minute, 2)} {formattedDate.period}
                            </div>
                            {admins?.includes(comment.author.id) && (
                                <div className='card text-xs bg-primary/20 px-2 justify-center'>ADMIN</div>
                            )}
                            {staffs?.includes(comment.author.id) && (
                                <div className='card text-xs bg-secondary/20 px-2 justify-center'>STAFF</div>
                            )}
                        </div>
                        <ContextMenu.Root>
                            <ContextMenu.Trigger disabled={showUpdateEditor || comment.deleted}>
                                {showUpdateEditor ? (
                                    <div className="w-full">
                                        <TextareaAutosize
                                            minRows={1}
                                            className="textarea textarea-bordered w-full resize-none custom-scrollbar"
                                            placeholder="Write a reply..."
                                            value={updateDetails}
                                            onChange={e => setUpdateDetails(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <div className="flex gap-3 mt-1">
                                            <button className="btn btn-info btn-sm" disabled={isLoading} onClick={handleUpdateComment}>
                                                {isLoading && (
                                                    <div className="loading h-5 w-5" />
                                                )}
                                                Update
                                            </button>
                                            <button className="btn btn-sm" onClick={() => setShowUpdateEditor(false)}>Close</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="whitespace-pre-line">
                                        {comment.deleted ? (
                                            <div className="border border-error/50 card py-1 px-3 w-fit text-sm bg-error/20 text-error">This comment has been deleted</div>
                                        ) : comment.details}
                                    </div>
                                )}
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal>
                                <ContextMenu.Content 
                                    className="bg-base-100 shadow-lg border border-base-300 card w-48 p-3 flex-col" 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    sideOffset={5} 
                                    align="end"
                                >
                                    <ContextMenu.Item
                                        className="flex text-sm gap-3 items-center cursor-pointer hover:bg-base-300 card flex-row p-2 text-info"
                                        onClick={() => navigator.clipboard.writeText(comment.details)}
                                    >
                                        <ClipboardIcon className="h-4 w-4" />
                                        Copy
                                    </ContextMenu.Item>
                                    <ContextMenu.Item
                                        disabled={getLoggedInUserId() !== comment.author.id}
                                        className={classNames({
                                            "flex text-sm gap-3 items-center card flex-row p-2": true,
                                            "cursor-not-allowed text-primary/50": getLoggedInUserId() !== comment.author.id,
                                            "cursor-pointer hover:bg-base-300 text-primary": getLoggedInUserId() === comment.author.id
                                        })}
                                        onClick={() => setShowUpdateEditor(true)}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                        Edit
                                    </ContextMenu.Item>
                                    <ContextMenu.Item
                                        disabled={getLoggedInUserId() !== comment.author.id}
                                        className={classNames({
                                            "flex text-sm gap-3 items-center card flex-row p-2": true,
                                            "cursor-not-allowed text-error/50": getLoggedInUserId() !== comment.author.id,
                                            "cursor-pointer hover:bg-base-300 text-error": getLoggedInUserId() === comment.author.id
                                        })}
                                        onClick={handleDeleteComment}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        Delete
                                    </ContextMenu.Item>
                                </ContextMenu.Content>
                            </ContextMenu.Portal>
                        </ContextMenu.Root>
                        <div className="flex gap-3 items-center mt-1">
                            {!showUpdateEditor && (
                                <>
                                    <button className="flex group-hover:text-info duration-100 text-sm font-medium items-center gap-2" onClick={showReply}>
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
                                            <button className="group-hover:text-info duration-100 text-sm font-medium" onClick={() => setShowReplies(true)}>
                                                {comment.child_count} Replies
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {comment.children.length > 0 && showReplies && (
                    <AnimatePresence>
                        <div className="flex flex-col gap-8 mt-8">
                            {comment.children.map((e) => (
                                <motion.div
                                    key={e.id}
                                    initial={{ y: 10 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -10 }}
                                >
                                    <ChildComment
                                        comment={e}
                                        limit={limit}
                                        queryKey={queryKey}
                                        referenceId={referenceId}
                                        admins={admins}
                                        staffs={staffs}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
                {showReplyEditor && (
                    <div className="relative pl-16 mt-8">
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
                                    <TextareaAutosize
                                        ref={replyEditorRef}
                                        minRows={1}
                                        className="textarea textarea-bordered w-full resize-none custom-scrollbar"
                                        placeholder="Write a reply..."
                                        value={replyDetails}
                                        onChange={e => setReplyDetails(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <div className="flex gap-3 mt-1">
                                        <button className="btn btn-info btn-sm" disabled={isLoading} onClick={handleReplySubmit}>
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
    submitReply,
    referenceId,
    queryKey,
    admins,
    staffs
}: {
    comments: ParentCommentType[],
    limit: number,
    toogleLimit: () => void,
    submitReply: ({ data }: { data: AddCommentType }) => Promise<DataResponseType>,
    referenceId: number,
    queryKey: string,
    admins?: UserType[],
    staffs?: UserType[]
}) => {
    return (
        <section>
            <ul className="mt-5">
                {comments.map((comment, i) => (
                    <TreeComment
                        comment={comment}
                        key={comment.id}
                        last={comments.length - 1 === i}
                        submitReply={submitReply}
                        referenceId={referenceId}
                        queryKey={queryKey}
                        limit={limit}
                        admins={admins?.map(e => e.id)}
                        staffs={staffs?.map(e => e.id)}
                    />
                ))}
            </ul>

            {comments.length !== 0 && !(comments.length < constants.COMMENT_LIMIT.ARTICLE) && (<>
                {(limit !== 0) ? (
                    <button className="mt-3 btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => toogleLimit()}>Show all threads</button>
                ) : (
                    <button className="mb-3 btn btn-xs btn-ghost border-base-300 hover:bg-base-300 hover:text-base-content w-full" onClick={() => toogleLimit()}>Show latest threads</button>
                )}
            </>)}
        </section>
    )
}

export default CommentList
