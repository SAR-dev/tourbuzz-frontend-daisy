import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { postUserEnquiry } from '@src/api/enquiry';
import { useNotification } from '@src/contexts/Notification';
import { NotificationType } from '@src/enums/NotificationType';
import { formatDate, parrseToNDigit } from '@src/functions/helpers';
import { EnquiryType } from '@src/types/base'
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';

const EnquiryChatBubble = ({ enquiry }: { enquiry: EnquiryType }) => {
    const createdAt = formatDate(enquiry.created_at)
    const answeredAt = enquiry.answered_at ? formatDate(enquiry.answered_at) : null

    return (
        <li className="mb-10 ms-6">
            <div className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 ring-8 ring-base-200">
                {answeredAt ? (
                    <CheckCircleIcon className='h-6 w-6 text-success' />
                ) : <div className='loading h-6' />}
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <div className="card flex flex-row gap-2 bg-base-200 border border-base-300 p-3 text-sm w-fit">
                    <div className='h-6 w-6 flex-shrink-0'>
                        <img className='h-6 w-6 object-cover rounded-full' src={enquiry.user.avatar?.thumbnail_url} alt="" />
                    </div>
                    <div>
                        {enquiry.question}
                    </div>
                </div>
                <div className="text-xs text-base-content/80">
                    {parrseToNDigit(createdAt.day, 2)} {createdAt.month_name.slice(0, 3)} {createdAt.year} {parrseToNDigit(createdAt.hour24, 2)}:{parrseToNDigit(createdAt.minute, 2)}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {enquiry.answer ? (
                    <>
                        <div className="card flex flex-row gap-2 bg-base-200 border border-base-300 p-3 text-sm w-fit">
                            <div className='h-6 w-6 flex-shrink-0'>
                                <div className='text-xl'>🤗</div>
                            </div>
                            <div>
                                {enquiry.answer}
                            </div>
                        </div>
                        <div className="text-xs text-base-content/80">
                            {parrseToNDigit(createdAt.day, 2)} {createdAt.month_name.slice(0, 3)} {createdAt.year} {parrseToNDigit(createdAt.hour24, 2)}:{parrseToNDigit(createdAt.minute, 2)}
                        </div>
                    </>
                ) : (
                    <div className="text-sm w-fit text-warning">
                        😴 Answer is pending from admin....
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