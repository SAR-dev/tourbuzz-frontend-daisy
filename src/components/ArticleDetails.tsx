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

const ArticleDetails = ({ article }: { article: ArticleType }) => {
    const queryClient = useQueryClient();
    const { add } = useReaction()

    const articleReactions = useQuery<ReactionDataType, Error>({
        queryKey: ['article-reactions', article.id],
        queryFn: () => getReactionToArticle({ id: article.id })
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
                        <div className="w-full flex gap-3 items-center">
                            <EmojiDisplay reactionSummary={reactionSummary} handleEmojiSelect={handleEmojiSelect} minimal />
                            {reactionSummary.topReactions.length < 5 && (
                                <div className="text-sm text-base-content/50">Give a reaction to let others know how you feel...</div>
                            )}
                        </div>
                        <MarkdownRenderer md_text={article.md_desc} />
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