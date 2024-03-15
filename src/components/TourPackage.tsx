import { PackageType } from '@src/types/base'
import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer'
import classNames from 'classnames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Modal from './Modal';
import { parsePrice } from '@src/functions/helpers';

const generateTicketDetails = ({ price }: { price: number }) => (`
- 💰 **Price:** ${parsePrice(price)} Taka.
- 💳 **Payment Method:** Payment will be made through Nagad, a digital payment system.
- ⏳ **Processing Time:** Please note that it might take some time to process the payment.
- 🎟️ **Ticket Number:** Once the payment is successfully processed, you will receive a unique ticket number.
- 📄 **Ticket Details:** You will receive detailed information about your ticket two days prior to the event.
- 📧 **Ticket Delivery:** Additionally, a PDF of your ticket will be sent to your provided email address for your convenience.
- 📱 **Mobile Notification:** You may also receive a mobile notification confirming your ticket purchase.
- 🕰️ **Event Timing:** Please be sure to check the event timing and arrive punctually.
- 📢 **Announcements:** Any updates or announcements regarding the event will be communicated via email or text message.
- 🤝 **Customer Support:** If you encounter any issues or have questions, feel free to reach out to our customer support team for assistance.
`)

const TourPackage = ({ pac }: { pac: PackageType }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenIndex = (index: number) => {
        setOpenIndex(index === openIndex ? null : index)
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
                    <button className="btn" onClick={() => setIsModalOpen(false)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <button className="btn-accent btn">
                        Purchase Ticket ({parsePrice(pac.price)} TK)
                    </button>
                </div>
            }>
                <div className="overflow-y-auto custom-scrollbar max-h-[60vh] my-5">
                    <div className="join join-vertical w-full">
                        <div className="collapse join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                🛎️ Included Services
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={pac.included} />
                            </div>
                        </div>
                        <div className="collapse join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                🙅🏻 Excluded Services
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={pac.excluded} />
                            </div>
                        </div>
                        <div className="collapse join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                📑 Conditions
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={pac.conditions} />
                            </div>
                        </div>
                        <div className="collapse join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                🏷️ Ticket Purchase Details
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={generateTicketDetails({ price: pac.price })} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TourPackage