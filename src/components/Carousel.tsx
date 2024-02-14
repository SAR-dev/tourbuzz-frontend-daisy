import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Children, RefObject, cloneElement, createRef, useEffect, useState, ReactNode } from 'react';

const Carousel = ({ children, smallButton }: { children: ReactNode, smallButton?: boolean }) => {
    const [itemRefs, setItemRefs] = useState<RefObject<HTMLDivElement>[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setItemRefs((prevRefs) => {
            const newRefs: RefObject<HTMLDivElement>[] = Array(Children.count(children))
                .fill(null)
                .map((_, i) => prevRefs[i] || createRef<HTMLDivElement>());
            return newRefs;
        });
    }, [children]);

    const scrollToIndex = (index: number) => {
        itemRefs[index]?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        setActiveIndex(index);
    };

    const goNext = () => {
        if (activeIndex > Children.count(children) - 2) return;
        scrollToIndex(activeIndex + 1)
    }

    const goPrev = () => {
        if (activeIndex == 0) return;
        scrollToIndex(activeIndex - 1)
    }

    return (
        <div className="relative group h-full">
            <div className="carousel w-full h-full">
                {Children.map(children, (child, i) => {
                    return cloneElement(child as React.ReactElement, {
                        key: i,
                        ref: itemRefs[i],
                        index: i + 1,
                    });
                })}
            </div>
            <div className="absolute top-0 right-0 h-full flex items-center">
                <button
                    className={classNames({
                        'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2': true,
                        'btn-sm': smallButton
                    })}
                    onClick={goNext}
                >
                    <ChevronRightIcon className='h-5 w-5' />
                </button>
            </div>
            <div className="absolute top-0 left-0 h-full flex items-center">
                <button
                    className={classNames({
                        'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2': true,
                        'btn-sm': smallButton
                    })}
                    onClick={goPrev}
                >
                    <ChevronLeftIcon className='h-5 w-5' />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
