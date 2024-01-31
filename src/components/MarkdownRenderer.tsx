import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji';
import remarkImages from 'remark-images'
import rehypeExternalLinks from 'rehype-external-links';
import Markdown from 'react-markdown'
import ImageLoader from './ImageLoader';

const linkTargetBlank = {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
}

const MarkdownRenderer = ({ md_text }: { md_text: string }) => {
    return (
        <div className="markdown max-w-[125ch]">
            <Markdown
                remarkPlugins={[remarkGfm, emoji, remarkImages]}
                rehypePlugins={[[rehypeExternalLinks, linkTargetBlank]]}
                components={{
                    img(props) {
                        const { src } = props
                        return <ImageLoader src={src ?? ""} className="card min-h-32 max-w-full" />
                    }
                }}
            >
                {md_text}
            </Markdown>
        </div>
    )
}

export default MarkdownRenderer