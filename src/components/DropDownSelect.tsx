import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import classNames from 'classnames';

interface DropDownSelectProps {
    button: ReactNode;
    options: {
        icon?: ReactNode
        text: string
        value: string
        handleClick?: () => void;
    }[]
    selectedValue?: string;
}

export default function DropdownSelect({...props}: DropDownSelectProps) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    {props.button}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg bg-base-100 ring-1 ring-base-content/10 focus:outline-none">
                    <div className="px-1 py-1 ">
                        {props.options.map((option, i) => (
                        <Menu.Item key={i}>
                            {({ active }) => (
                                <button
                                    className={classNames({
                                        "card flex flex-row gap-2 items-center w-full p-2 text-sm my-px": true,
                                        "bg-primary/20": active,
                                        "bg-primary text-primary-content": props.selectedValue == option.value
                                    })}
                                    onClick={option.handleClick}
                                >
                                    {option.icon}
                                    {option.text}
                                </button>
                            )}
                        </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
