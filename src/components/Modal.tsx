import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Fragment, ReactNode } from 'react';

const Modal = ({
    isOpen,
    setIsOpen,
    title,
    children,
    footer,
    maxWidth = "30rem",
    closeButton
}: {
    isOpen: boolean,
    setIsOpen: (props: boolean) => void,
    title: string,
    children: ReactNode,
    maxWidth?: string,
    closeButton?: boolean,
    footer?: ReactNode
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-base-content/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full transform overflow-hidden card p-5 bg-base-100 text-left align-middle shadow-xl transition-all" style={{ maxWidth }}>
                                <Dialog.Title
                                    as="div"
                                    className="mb-2 flex justify-between items-center"
                                >
                                    <div className='text-lg font-semibold'>{title}</div>
                                    {closeButton && (
                                        <button className="btn btn-square btn-sm" onClick={() => setIsOpen(false)}>
                                            <XMarkIcon className='h-5 w-5' />
                                        </button>
                                    )}
                                </Dialog.Title>
                                <div>{children}</div>
                                <div className="mt-4">{footer}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal;
