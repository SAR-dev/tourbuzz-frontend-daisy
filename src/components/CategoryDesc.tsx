import { PackageType } from '@src/types/base'
import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer'
import classNames from 'classnames'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const CategoryDesc = ({ pac }: { pac: PackageType }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [openPackage, setOpenPackage] = useState(false)

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
                <button className="btn w-full" onClick={() => setOpenPackage(true)}>
                    See Details
                    <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

export default CategoryDesc