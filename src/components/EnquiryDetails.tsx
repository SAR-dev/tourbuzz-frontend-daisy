import { EnquiryType } from '@src/types/base'
import TextareaAutosize from 'react-textarea-autosize';

const ChatBubbleLeft = () => (
    <div className="flex gap-3 mr-auto">
        <div className="w-10 flex-shrink-0">
            <img src="https://i.pravatar.cc/300" className='h-10 w-10 rounded-full object-cover' />
        </div>
        <div className="flex flex-col gap-2">
            <div className="card p-3 bg-base-200 rounded-tl-none">
                <div className="whitespace-pre-line">
                    Tailwind is a utility-first css framework.
                </div>
            </div>
            <div className='text-base-content/80 text-sm text-left'>11:12 PM</div>
        </div>
    </div>
)

const ChatBubbleRight = () => (
    <div className="flex gap-3 ml-auto">
        <div className="flex flex-col gap-2">
            <div className="card p-3 bg-accent text-accent-content rounded-tr-none">
                <div className="whitespace-pre-line">
                    Tailwind is a utility-first css framework.
                </div>
            </div>
            <div className='text-base-content/80 text-sm text-right'>11:12 PM</div>
        </div>
        <div className="w-10 flex-shrink-0">
            <img src="https://i.pravatar.cc/300" className='h-10 w-10 rounded-full object-cover' />
        </div>
    </div>
)

const EnquiryDetails = ({ enquiries }: { enquiries: EnquiryType[] }) => {
    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div>
                <div className='title font-semibold text-2xl'>Welcome to the Admin Chat Room!</div>
                <div>Whether you have questions, feedback, or need assistance, our admin team is ready to assist you. Let's chat! 🚀</div>
            </div>
            <div className="card w-full p-3 border border-base-300 my-5">
                <div className='h-96 w-full custom-scrollbar overflow-y-auto'>
                    <div className="grid grid-cols-1 gap-3">
                        <ChatBubbleLeft />
                        <ChatBubbleRight />
                    </div>
                </div>
            </div>

            <div className="flex w-full gap-5">
                <TextareaAutosize className='textarea textarea-bordered w-full' placeholder='Start typing...' />
                <button className="btn btn-info">Send Message</button>
            </div>
        </div>
    )
}

export default EnquiryDetails