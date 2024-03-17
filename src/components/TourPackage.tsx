import { PackageType } from '@src/types/base';
import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer'
import classNames from 'classnames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Modal from './Modal';
import { parsePrice } from '@src/functions/helpers';
import TourPackageDetails from './TourPackageDetails';
import { bookInvoice } from '@src/api/package';
import { BookCreateReq } from '@src/types/package';
import { useNotification } from '@src/contexts/Notification';
import { NotificationType } from '@src/enums/NotificationType';

const TourPackage = ({ pac }: { pac: PackageType }) => {
    const notification = useNotification()
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOpenIndex = (index: number) => {
        setOpenIndex(index === openIndex ? null : index)
    }

    const bookTicket = () => {
        const data: BookCreateReq = {
            packages_id: pac.id,
            ticket_amount: 1
        }
        setIsLoading(true)
        bookInvoice({ data })
            .then(() => {
                setIsLoading(false)
                setIsModalOpen(false)
                notification.add({
                    title: "Ticket Booked",
                    message: "Your ticket has been booked. Go to cart to finish payment.",
                    status: NotificationType.SUCCESS
                })
            })
            .catch(() => {
                setIsLoading(false)
                notification.add({
                    title: "Error Occured",
                    message: "There was an error booking your ticket. Please try again",
                    status: NotificationType.ERROR
                })
            })
    }

    return (
        <div>
            <div className="join join-vertical w-full">
                <div
                    className={classNames({
                        "collapse collapse-arrow join-item": true,
                        "accordion-open": openIndex === 0
                    })}
                    onClick={() => handleOpenIndex(0)}
                >
                    <div className="collapse-title font-semibold">
                        🛎️ Included Services
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={pac.included} />
                    </div>
                </div>
                <div
                    className={classNames({
                        "collapse collapse-arrow join-item": true,
                        "accordion-open": openIndex === 1
                    })}
                    onClick={() => handleOpenIndex(1)}
                >
                    <div className="collapse-title font-semibold">
                        🙅🏻 Excluded Services
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={pac.excluded} />
                    </div>
                </div>
                <div
                    className={classNames({
                        "collapse collapse-arrow join-item": true,
                        "accordion-open": openIndex === 2
                    })}
                    onClick={() => handleOpenIndex(2)}
                >
                    <div className="collapse-title font-semibold">
                        📑 Conditions
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={pac.conditions} />
                    </div>
                </div>
            </div>
            <div className="px-3 mt-3">
                <button className="btn w-full" onClick={() => setIsModalOpen(true)}>
                    See Details
                    <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={`Package Details: ${pac.title}`} maxWidth='50rem' closeButton footer={
                <div className="flex items-center justify-between">
                    <button className="btn bg-base-100" onClick={() => setIsModalOpen(false)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <button className={classNames({
                        "btn-accent btn": true,
                        "btn-disabled": isLoading
                    })} onClick={bookTicket}>
                        Book Ticket ({parsePrice(pac.price)} TK)
                    </button>
                </div>
            }>
                <TourPackageDetails pac={pac} />
            </Modal>
        </div>
    )
}

export default TourPackage