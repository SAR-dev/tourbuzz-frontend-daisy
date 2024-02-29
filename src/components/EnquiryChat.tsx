import { postUserEnquiry } from '@src/api/enquiry';
import { formatDate, parrseToNDigit } from '@src/functions/helpers';
import { EnquiryType } from '@src/types/base'
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';

const AdminChatBubble = ({ enquiry }: { enquiry: EnquiryType }) => {
    const answeredAt = enquiry.answered_at ? formatDate(enquiry.answered_at) : null

    return (
        <div className="flex gap-3 justify-start">
            <div className="w-10 flex-shrink-0">
                <div className="h-10 w-10 rounded-full flex justify-center items-center border border-base-300 text-xl">
                    👨🏻‍💻
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className={classNames({
                    "card p-3 rounded-tl-none": true,
                    "bg-base-200": enquiry.answered_at,
                    "bg-base-200 text-base-content/50": !enquiry.answered_at
                })}>
                    <div className="whitespace-pre-line">
                        {enquiry.answer ?? "Answer pending from admin..."}
                    </div>
                </div>
                {answeredAt && (
                    <div className='text-base-content/80 text-sm text-left'>
                        {parrseToNDigit(answeredAt.day, 2)} {answeredAt.month_name.slice(0, 3)} {answeredAt.year} {parrseToNDigit(answeredAt.hour24, 2)}:{parrseToNDigit(answeredAt.minute, 2)}
                    </div>
                )}
            </div>
        </div>
    )
}

const UserChatBubble = ({ enquiry }: { enquiry: EnquiryType }) => {
    const createdAt = formatDate(enquiry.created_at)
    return (
        <div className="flex gap-3 justify-end">
            <div className="flex flex-col gap-2">
                <div className="card p-3 bg-accent text-accent-content rounded-tr-none">
                    <div className="whitespace-pre-line">
                        {enquiry.question}
                    </div>
                </div>
                <div className='text-base-content/80 text-xs text-right'>
                    {parrseToNDigit(createdAt.day, 2)} {createdAt.month_name.slice(0, 3)} {createdAt.year} {parrseToNDigit(createdAt.hour24, 2)}:{parrseToNDigit(createdAt.minute, 2)}
                </div>
            </div>
            <div className="w-10 flex-shrink-0">
                <img src={enquiry.user.avatar?.thumbnail_url} className='h-10 w-10 rounded-full object-cover' />
            </div>
        </div>
    )
}

const EnquiryChat = ({ enquiries }: { enquiries: EnquiryType[] }) => {
    const queryClient = useQueryClient()

    const [isLoading, setIsLoading] = useState(false)
    const [question, setQuestion] = useState<string>("")

    const addEnquiry = () => {
        if (question.length <= 10) {
            toast.error("Question must be minimum 10 characters length");
            return;
        }
        setIsLoading(false)
        postUserEnquiry({ question })
            .then(() => {
                setQuestion("")
                toast.success("Enquiry submitted")
                queryClient.invalidateQueries({ queryKey: ["enquiries"] })
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div>
                <div className='title font-semibold text-2xl'>Welcome to the Admin Chat Room!</div>
                <div>Whether you have questions, feedback, or need assistance, our admin team is ready to assist you. Let's chat! 🚀</div>
            </div>
            <div className="card w-full p-3 border border-base-300 my-5">
                <div className='h-96 w-full custom-scrollbar overflow-y-auto'>
                    {enquiries.map((enquiry, i) => (
                        <div className="grid-cols-1 gap-3 w-full" key={i}>
                            <div className="grid grid-cols-2">
                                <div />
                                <UserChatBubble enquiry={enquiry} />
                            </div>
                            <div className="grid-cols-2">
                                <AdminChatBubble enquiry={enquiry} />
                                <div />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full gap-5">
                <TextareaAutosize
                    className='textarea textarea-bordered w-full'
                    placeholder='Start typing enquiry...'
                    onChange={e => setQuestion(e.target.value)}
                    value={question}
                    disabled={isLoading}
                />
                <button className="btn btn-info w-48 flex-shrink-0" disabled={isLoading} onClick={addEnquiry}>
                    {isLoading && (
                        <div className="loading h-5 w-5" />
                    )}
                    Send Message
                </button>
            </div>
        </div>
    )
}

export default EnquiryChat