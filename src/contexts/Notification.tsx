import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { NotificationType } from '@src/enums/NotificationType';
import { Fragment, ReactNode, createContext, useContext, useState } from 'react';

interface NotificationProps {
    title: string;
    message: string;
    body?: ReactNode;
    status: NotificationType;
}

interface CtxInterface {
    add: (props: NotificationProps) => void;
    remove: () => void;
}

const Ctx = createContext<CtxInterface>({
    add: () => {},
    remove: () => {}
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [data, setData] = useState<NotificationProps | null>(null)

    const add = (props: NotificationProps) => {
        setData(props)
        setIsOpen(true)
    }

    const remove = () => {
        setData(null)
        setIsOpen(false)
    }

    return (
        <Ctx.Provider value={{ add, remove }}>
            {children}
            {data && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={remove}>
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
                                    <Dialog.Panel className="w-full transform overflow-hidden card p-5 bg-base-100 text-left align-middle shadow-xl transition-all max-w-md relative">
                                        {data.status !== NotificationType.LOADING && (
                                            <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={() => setIsOpen(false)}>
                                                <XMarkIcon className='h-5 w-5' />
                                            </button>
                                        )}
                                        <div className='flex flex-col gap-3 p-5'>
                                            <div className='flex justify-center'>
                                                {data.status === NotificationType.SUCCESS && (
                                                    <svg className="checkmark success h-20 w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                                        <circle className="checkmark_circle_success" cx="26" cy="26" r="25" fill="none" />
                                                        <path className="checkmark_check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" strokeLinecap="round" />
                                                    </svg>
                                                )}
                                                {data.status === NotificationType.ERROR && (
                                                    <svg className="checkmark error h-20 w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                                        <circle className="checkmark_circle_error" cx="26" cy="26" r="25" fill="none" />
                                                        <path className="checkmark_check" strokeLinecap="round" fill="none" d="M16 16 36 36 M36 16 16 36" />
                                                    </svg>
                                                )}
                                                {data.status === NotificationType.LOADING && (
                                                    <div className="spinner h-20 w-20" />
                                                )}
                                                {data.status === NotificationType.INFO && (
                                                    <div className="text-6xl">📣</div>
                                                )}
                                            </div>
                                            <div className='text-center text-xl font-medium'>{data.title}</div>
                                            <div className='text-center'>{data.message}</div>
                                            <div>{data.body}</div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </Ctx.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(Ctx)