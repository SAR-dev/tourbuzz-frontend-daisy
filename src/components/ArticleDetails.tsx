import { ArticleType } from '@src/types/base'
import Title from './Title'
import ImageLoader from './ImageLoader'
import MarkdownRenderer from './MarkdownRenderer'
import Carousel from './Carousel'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useReaction } from '@src/contexts/Reaction'
import { ReactionDataType, addReactionToArticle, getReactionToArticle } from '@src/api/reaction'
import { getTopEmojiReactionsWithSummary } from '@src/functions/helpers'
import toast from 'react-hot-toast'
import EmojiDisplay from './EmojiDisplay'
import CommentList from './CommentList'
import { CommentListDataType, addCommentByArticleId, getCommentsByArticleId } from '@src/api/comment'
import { useRef, useState } from 'react'
import { constants } from '@src/stores/constantStore'
import { AddCommentType } from '@src/types/comment'
import useLocalStorageState from 'use-local-storage-state'
import { useDebounceFn } from 'ahooks'
import { useAuthStore } from '@src/stores/authStore'
import { useSignInModalStore } from '@src/stores/signInModalStore'

const ArticleDetails = ({ article }: { article: ArticleType }) => {
    const commentsRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const { add } = useReaction()
    const { isLoggedIn } = useAuthStore()
    const { setIsOpenSignIn } = useSignInModalStore();
    const [commentLimit, setCommentLimit] = useState(constants.COMMENT_LIMIT.ARTICLE)

    const [commentDetails, setCommentDetails] = useLocalStorageState<string>(constants.ARTICLE_COMMENT_STORE_KEY + article.id, {
        defaultValue: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const articleReactions = useQuery<ReactionDataType, Error>({
        queryKey: ['article-reactions', article.id],
        queryFn: () => getReactionToArticle({ id: article.id })
    })

    const articleComments = useQuery<CommentListDataType, Error>({
        queryKey: ['article-comments', article.id, commentLimit],
        queryFn: () => getCommentsByArticleId({ id: article.id, limit: commentLimit })
    })

    const reactionSummary = getTopEmojiReactionsWithSummary(articleReactions.data?.data ?? [], 5)

    const handleEmojiSelect = (value: string) => {
        addReactionToArticle({ id: article.id, emoji: value })
            .then((res) => {
                queryClient.invalidateQueries({ queryKey: ['article-reactions', article.id] })
                if (res.data.added) {
                    add({ emoji: value })
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    const { run } = useDebounceFn(
        () => {
            if (commentsRef.current) {
                commentsRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }
        },
        {
          wait: 500,
        },
      );

    const handleCommentSubmit = () => {
        if(!isLoggedIn()){
            setIsOpenSignIn(true)
            return;
          }
        if (commentDetails.length < 2) return;

        const data: AddCommentType = {
            reference_id: article.id,
            parent_id: 0,
            details: commentDetails
        }
        setIsLoading(true)
        addCommentByArticleId({ data })
            .then(() => {
                setCommentDetails("")
                queryClient.invalidateQueries({ queryKey: ['article-comments', article.id] })
                run()
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toogleLimit = () => {
        if(commentLimit === 0){
            setCommentLimit(constants.COMMENT_LIMIT.ARTICLE)
            run()
        } else {
            setCommentLimit(0)
            run()
        }
    }

    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <Title>{article.title}</Title>
                            <div>{article.subtitle}</div>
                        </div>
                        <div className="card h-[30rem] overflow-hidden">
                            <Carousel>
                                {article.images.map((image, i) => (
                                    <div className="carousel-item w-full" key={i}>
                                        <ImageLoader src={image.optimized_url} modalSrc={image.source_url} className="w-full object-cover" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="card w-full flex flex-row gap-3 items-center border border-base-300 p-2">
                            <EmojiDisplay reactionSummary={reactionSummary} handleEmojiSelect={handleEmojiSelect} minimal />
                            {reactionSummary.topReactions.length < 5 && (
                                <div className="text-sm text-base-content/50">Give a reaction to let others know how you feel...</div>
                            )}
                        </div>
                        <MarkdownRenderer md_text={article.md_desc} />
                        <div ref={commentsRef}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="title text-2xl font-semibold">
                                    Threads ({articleComments.data?.data ? articleComments.data.data.length : 0})
                                </h2>
                            </div>
                            <div className="mb-6">
                                <textarea
                                    rows={6}
                                    className="textarea textarea-bordered w-full custom-scrollbar"
                                    placeholder="Share your thoughts..."
                                    value={commentDetails}
                                    onChange={e => setCommentDetails(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button className="btn btn-info" disabled={isLoading} onClick={handleCommentSubmit}>
                                    {isLoading && (
                                        <div className="loading h-5 w-5" />
                                    )}
                                    Start new thread
                                </button>
                            </div>
                            {articleComments.data && (
                                <CommentList comments={articleComments.data.data} limit={commentLimit} toogleLimit={toogleLimit} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col gap-10 sticky top-[5rem]">
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Summary</Title>
                            </div>
                            <div className='whitespace-pre-line'>
                                {article.summary}
                            </div>
                            <div className="flex gap-2 mt-5">
                                {article.category.split(",").map((e, i) => (
                                    <div className="bg-base-300 font-medium px-2.5 py-0.5 card inline-flex" key={i}>
                                        {e.trim()}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Author Info</Title>
                            </div>
                            <div>
                                <ImageLoader
                                    src={article.writer.avatar.optimized_url}
                                    modalSrc={article.writer.avatar.source_url}
                                    className="h-32 card"
                                />
                                <div className="font-semibold text-xl my-2">{article.writer.name}</div>
                                <div className='whitespace-pre-line'>
                                    {article.writer.about}
                                </div>
                                <div className="mt-5">
                                    <a href={article.writer.website} target='_blank' className="link">
                                        Visit writer's website
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetails