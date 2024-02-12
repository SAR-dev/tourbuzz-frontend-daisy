import { PackageType } from '@src/types/base'
import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer'
import classNames from 'classnames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Modal from './Modal';
import humanNumber from 'human-number';
import { WalletIcon } from '@heroicons/react/24/outline';

const TourPackage = ({ pac }: { pac: PackageType }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

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
                    <button className={classNames({
                        "btn-accent btn": true,
                        "btn-disabled": !isChecked
                    })}>
                        Proceed to Payment
                        <WalletIcon className='h-5 w-5' />
                    </button>
                </div>
            }>
                <div className="overflow-y-auto custom-scrollbar max-h-[50vh] mt-5">
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-arrow join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                🛎️ Included Services
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={pac.included} />
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                🙅🏻 Excluded Services
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={pac.excluded} />
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                📑 Conditions
                            </div>
                            <div className="collapse-content">
                                <MarkdownRenderer md_text={pac.conditions} />
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item accordion-open">
                            <div className="collapse-title font-semibold">
                                🏷️ Price: {humanNumber(pac.price)} TK
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-control w-fit mt-3">
                    <label className="label cursor-pointer">
                        <input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="checkbox" />
                        <span className="label-text ml-2">I have read the terms and conditions and I agree to pay <b>{humanNumber(pac.price)} TK</b> to purchase thic package.</span>
                    </label>
                </div>
            </Modal>
        </div>
    )
}

export default TourPackage