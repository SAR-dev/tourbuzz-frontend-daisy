import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ReactElement, Children, RefObject, cloneElement, createRef, useEffect, useState } from 'react';

const Carousel = ({ children }: { children: ReactElement[] }) => {
    const [itemRefs, setItemRefs] = useState<RefObject<HTMLDivElement>[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setItemRefs((prevRefs) => {
            const newRefs: RefObject<HTMLDivElement>[] = Array(children.length)
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
        if (activeIndex > children.length - 2) return;
        scrollToIndex(activeIndex + 1)
    }

    const goPrev = () => {
        if (activeIndex == 0) return;
        scrollToIndex(activeIndex - 1)
    }

    return (
        <div className="relative group">
            <div className="carousel w-full">
                {Children.map(children, (child, i) => {
                    return cloneElement(child, {
                        key: i,
                        ref: itemRefs[i],
                        index: i + 1,
                    });
                })}
            </div>
            <div className="absolute top-0 right-0 h-full flex items-center">
                <button className='btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2' onClick={goNext}>
                    <ChevronRightIcon className='h-5 w-5' />
                </button>
            </div>
            <div className="absolute top-0 left-0 h-full flex items-center">
                <button className='btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2' onClick={goPrev}>
                    <ChevronLeftIcon className='h-5 w-5' />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
