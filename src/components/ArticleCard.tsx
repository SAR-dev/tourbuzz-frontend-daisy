import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";
import { ArticleType } from "@src/types/base";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useReaction } from "@src/contexts/Reaction";
import { ReactionDataType, addReactionToArticle, getReactionToArticle } from "@src/api/reaction";
import { getTopEmojiReactionsWithSummary } from "@src/functions/helpers";
import toast from "react-hot-toast";
import EmojiDisplay from "./EmojiDisplay";

const ArticleCard = ({ article }: { article: ArticleType }) => {
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
        <div className="flex flex-col gap-3">
            <div className="card h-64 w-full relative overflow-hidden">
                <ImageLoader
                    src={article.images[0].optimized_url}
                    modalSrc={article.images[0].source_url}
                    className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 m-2">
                    <div className="group flex items-center rounded-full bg-slate-200 p-1 overflow-hidden">
                        <img className="h-8 w-8 rounded-full" src={article.writer.avatar.thumbnail_url} alt={article.writer.name} />
                        <div className="p-0 group-hover:px-2 font-semibold opacity-0 group-hover:opacity-100 w-0 h-0 group-hover:w-auto group-hover:h-6 translate-x-40 group-hover:translate-x-0 transition-all duration-100 ease-in-out">{article.writer.name}</div>
                    </div>
                </div>
            </div>
            <div className="opacity-75 italic line-clamp-1">
                {article.subtitle}
            </div>
            <Link to={`/articles/${article.slug}`} className="font-semibold text-xl title line-clamp-2 hover:text-teal-500 duration-100">
                {article.title}
            </Link>
            <div className="line-clamp-4 whitespace-pre-line">
                {article.summary}
            </div>
            <div className="card flex gap-3 items-center items-center flex-row">
                <EmojiDisplay reactionSummary={reactionSummary} handleEmojiSelect={handleEmojiSelect} minimal />
                {reactionSummary.topReactions.length < 5 && (
                    <div className="text-sm text-base-content/50">Give a reaction ...</div>
                )}
            </div>
        </div>
    )
}

export default ArticleCard;