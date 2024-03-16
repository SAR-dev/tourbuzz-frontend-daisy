import { PackageType } from '@src/types/base'
import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer'
import classNames from 'classnames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Modal from './Modal';
import { parsePrice } from '@src/functions/helpers';
import TourPackageDetails from './TourPackageDetails';
import { Link } from 'react-router-dom';

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
                    <button className="btn bg-base-100" onClick={() => setIsModalOpen(false)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <Link to={`/purchase/tour-package/${pac.id}`} className="btn-accent btn">
                        Purchase Ticket ({parsePrice(pac.price)} TK)
                    </Link>
                </div>
            }>
                <TourPackageDetails pac={pac} />
            </Modal>
        </div>
    )
}

export default TourPackage