import { postUserEnquiry } from '@src/api/enquiry';
import { useNotification } from '@src/contexts/Notification';
import { NotificationType } from '@src/enums/NotificationType';
import { formatDate, parrseToNDigit } from '@src/functions/helpers';
import { EnquiryType } from '@src/types/base'
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { MessageChatbot } from "tabler-icons-react"

const EnquiryChatBubble = ({ enquiry }: { enquiry: EnquiryType }) => {
    const createdAt = formatDate(enquiry.created_at)
    const answeredAt = enquiry.answered_at ? formatDate(enquiry.answered_at) : null

    return (
        <li className="mb-10 ms-6">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 ring-8 ring-base-200">
                📣
            </span>
            <div className="block text-sm font-normal leading-none text-base-content/80">
                {parrseToNDigit(createdAt.day, 2)} {createdAt.month_name.slice(0, 3)} {createdAt.year} {parrseToNDigit(createdAt.hour, 2)}:{parrseToNDigit(createdAt.minute, 2)}
            </div>
            <div className="mt-2 mb-4">
                <div className='font-semibold'>
                    {enquiry.question}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {answeredAt && (
                    <div className="flex gap-2 items-center text-sm font-normal leading-none text-base-content/80">
                        <MessageChatbot className='h-6 w-6' />
                        <div>
                            {parrseToNDigit(answeredAt.day, 2)} {answeredAt.month_name.slice(0, 3)} {answeredAt.year} {parrseToNDigit(answeredAt.hour, 2)}:{parrseToNDigit(answeredAt.minute, 2)}
                        </div>
                    </div>
                )}
                {enquiry.answer ? (
                    <div className="text-base font-normal text-base-content/80">{enquiry.answer}</div>
                ) : (
                    <div className="bg-base-200 border border-base-300 card py-2 px-3 text-sm w-fit">
                        Answer is pending from admin....
                    </div>
                )}
            </div>
        </li>
    )
}

const EnquiryDetails = ({ enquiries }: { enquiries: EnquiryType[] }) => {
    const queryClient = useQueryClient()
    const notification = useNotification()

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
                notification.add({
                    title: "Enquiry Submitted",
                    message: "Your enquiry has been submitted. An admin soon return to you. It might take 1-2 days depending on type of question. Please wait.",
                    status: NotificationType.SUCCESS
                })
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
            <div className="w-full mb-5 mt-10">
                <div className="pl-5 max-w-[50rem]">
                    <ol className="relative border-s border-base-300">
                        {enquiries.map((enquiry, i) => (
                            <EnquiryChatBubble enquiry={enquiry} key={i} />
                        ))}
                    </ol>
                </div>
                <div className='max-w-[50rem]'>
                    <div className="flex w-full gap-5">
                        <TextareaAutosize
                            className='textarea textarea-bordered w-full'
                            placeholder='Start typing enquiry...'
                            onChange={e => setQuestion(e.target.value)}
                            value={question}
                            disabled={isLoading}
                        />
                        <button className="btn btn-info w-42 flex-shrink-0" disabled={isLoading} onClick={addEnquiry}>
                            {isLoading && (
                                <div className="loading h-5 w-5" />
                            )}
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnquiryDetails