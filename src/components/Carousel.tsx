import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Children, cloneElement, createRef, useRef, useState, ReactNode } from 'react';

const Carousel = ({ children, smallButton }: { children: ReactNode; smallButton?: boolean }) => {
    const itemsCount = Children.count(children);
    const itemRefs = useRef(Array(itemsCount).fill(null).map(() => createRef<HTMLDivElement>()));
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        itemRefs.current[index]?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        setActiveIndex(index);
    };

    const goNext = () => {
        if (activeIndex < itemsCount - 1) {
            scrollToIndex(activeIndex + 1);
        }
    };

    const goPrev = () => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        }
    };

    return (
        <div className="relative group h-full">
            <div className="carousel w-full h-full flex overflow-x-auto no-scrollbar">
                {Children.map(children, (child, i) => {
                    if (!child || typeof child !== 'object' || !('key' in child)) return null;
                    return cloneElement(child as React.ReactElement, {
                        ref: itemRefs.current[i], // Attach ref safely
                    });
                })}
            </div>
            <div className="absolute top-0 right-0 h-full flex items-center">
                <button
                    className={classNames(
                        'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2',
                        { 'btn-sm': smallButton }
                    )}
                    onClick={goNext}
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="absolute top-0 left-0 h-full flex items-center">
                <button
                    className={classNames(
                        'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2',
                        { 'btn-sm': smallButton }
                    )}
                    onClick={goPrev}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
