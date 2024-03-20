import { PackageType, PaymentType, TourShortType } from '@src/types/base';
import ImageLoader from './ImageLoader'
import { formatDate } from '@src/functions/helpers';
import { ReactNode, useState } from 'react';
import { parsePrice } from '@src/functions/helpers';
import Modal from './Modal';
import TourPackageDetails from './TourPackageDetails';
import { Link } from 'react-router-dom';
import { checkInvoice, getPaymentLink } from '@src/api/bkash';
import useLocalStorageState from 'use-local-storage-state';
import { constants } from '@src/stores/constantStore';
import { BookCancelReq, InvoiceCreateReq } from '@src/types/package';
import { ArrowPathIcon, TicketIcon, TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useNotification } from '@src/contexts/Notification';
import { NotificationType } from '@src/enums/NotificationType';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRightIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { cancelInvoice } from '@src/api/ticket';

const PackagePurchaseCard = ({
    tour,
    tour_package,
    payment,
    ticket_amount,
    remaining_tickets,
    action
}: {
    tour: TourShortType,
    tour_package: PackageType,
    payment: PaymentType,
    ticket_amount: number,
    remaining_tickets: number,
    action?: ReactNode
}) => {
    const notification = useNotification()
    const queryClient = useQueryClient()

    const [isChecking, setIsChecking] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [invoiced, setInvoiced] = useState(false)
    const [paymentLink, setPaymentLink] = useLocalStorageState<string>(constants.TOUR_TICKET_INVOICE_STORE_KEY + tour_package.id, {
        defaultValue: ""
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noOfTickets, setNoOfTickets] = useState(ticket_amount)
    const startAt = formatDate(tour.start_at);
    const finishAt = formatDate(tour.finish_at);

    const getInvoiceNo = () => {
        const data: InvoiceCreateReq = {
            invoice_no: payment.invoice_no,
            ticket_amount: noOfTickets
        }
        setIsLoading(true)
        getPaymentLink({ data })
            .then((res) => {
                const data: string = res.data as string
                setPaymentLink(data)
                setInvoiced(true)
            })
            .catch(() => {
                notification.add({
                    title: "Error Occured",
                    message: "There was an error generating payment link. Please try again",
                    status: NotificationType.ERROR
                })
                setIsLoading(false)
            })
    }

    const checkInvoiceNo = () => {
        setIsChecking(true)
        checkInvoice({ invoice_no: payment.invoice_no })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["tickets"] })
                notification.add({
                    title: "Please Check",
                    message: "Payment completed. Please wait for a while for the update.",
                    status: NotificationType.SUCCESS
                })
            })
            .catch((err) => {
                notification.add({
                    title: "Please try again",
                    message: `${err.response.data.message}`,
                    status: NotificationType.INFO
                })
            })
            .finally(() => {
                setIsChecking(false)
            })
    }

    const cancelInvoiceNo = () => {
        const data: BookCancelReq = {
            invoice_no: payment.invoice_no
        }
        setIsChecking(true)
        cancelInvoice({ data })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["tickets"] })
                notification.add({
                    title: "Please Check",
                    message: "Ticket cancelled. Please wait for a while for the update.",
                    status: NotificationType.SUCCESS
                })
            })
            .catch((err) => {
                notification.add({
                    title: "Error Occured",
                    message: err.data.message,
                    status: NotificationType.ERROR
                })
            })
            .finally(() => {
                setIsChecking(false)
            })
    }

    const inc = () => {
        setNoOfTickets(noOfTickets + 1)
    }
    const dec = () => {
        if (noOfTickets <= 1) return;
        setNoOfTickets(noOfTickets - 1)
    }

    return (
        <tr className='border-t border-base-300 text-sm'>
            <td className='px-3 border-r border-base-300'>
                <TicketIcon className='h-5 w-5' />
            </td>
            <td className="border-r border-base-300 p-3 font-medium">{payment.invoice_no}</td>
            <td scope="row" className='border-r border-base-300'>
                <div className='flex flex-row items-center space-x-5 p-3'>
                    <div className="w-36 h-20">
                        <ImageLoader src={tour.avatar.optimized_url} className='h-20 w-36 card object-cover' />
                    </div>
                    <div className="flex flex-col font-normal">
                        <Link to={`/tours/${tour.slug}`} className="font-medium hover:text-teal-500 duration-100">{tour.title}</Link>
                        <div>Organized By <Link to={`/organizers/${tour.organizer.username}`} className="link link-hover font-medium">{tour.organizer.name}</Link></div>
                        <div>From <span className='font-medium'>{startAt.day} {startAt.month_name}, {startAt.year}</span> to <span className='font-medium'>{finishAt.day} {finishAt.month_name}, {finishAt.year}</span></div>
                    </div>
                </div>
            </td>
            <td className="p-3 border-r border-base-300">
                <button className="btn btn-sm" onClick={() => setIsModalOpen(true)}>{tour_package.title}</button>
            </td>
            <td className="p-3 border-r border-base-300">{parsePrice(tour_package.price)} TK</td>
            <td className="p-3 border-r border-base-300 relative">
                <div className="flex space-x-1 justify-center items-center">
                    {!payment.completed && (
                        <button className="btn btn-sm btn-square btn-ghost" onClick={dec}>
                            <MinusIcon className='h-5 w-5' />
                        </button>
                    )}
                    <div className="w-10 h-10 flex items-center justify-center text-sm border border-base-300 card">
                        {noOfTickets}
                    </div>
                    {!payment.completed && (
                        <button className="btn btn-sm btn-square btn-ghost" onClick={inc}>
                            <PlusIcon className='h-5 w-5' />
                        </button>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 w-full text-center text-xs mb-3">{remaining_tickets} tickets left</div>
            </td>
            <td className="p-3 border-r border-base-300">{parsePrice(tour_package.price * noOfTickets)} TK</td>
            <td className="p-3">
                {payment.completed ? (
                    <div className="flex items-center space-x-2">
                        {action ?? (
                            <Link to={`/tickets/${payment.invoice_no}`} className="btn btn-sm btn-accent">
                                View Ticket
                                <ArrowRightIcon className='h-4 w-4' />
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <button className="btn btn-sm btn-accent" onClick={getInvoiceNo}>Bkash Pay</button>
                        <button className="btn btn-sm btn-outline border-base-300 btn-square btn-sm" disabled={isChecking} onClick={cancelInvoiceNo}>
                            <TrashIcon className='h-4 w-4' />
                        </button>
                        <button className="btn btn-sm btn-outline border-base-300 btn-square btn-sm" disabled={isChecking} onClick={checkInvoiceNo}>
                            <ArrowPathIcon className={classNames({
                                'h-4 w-4': true,
                                'animate-spin': isChecking
                            })} />
                        </button>
                    </div>
                )}
            </td>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title={`Package Details: ${tour_package.title}`}
                maxWidth='50rem'
                closeButton
            >
                <TourPackageDetails pac={tour_package} />
            </Modal>
            <Modal
                isOpen={isLoading}
                setIsOpen={setIsLoading}
                title='Payment Processing'
                maxWidth='30rem'
                closeButton={invoiced}
            >
                <div className='flex flex-col gap-3 p-5'>
                    {!invoiced && (
                        <>
                            <div className='flex justify-center'>
                                <div className="loader h-10 w-10" />
                            </div>
                            <div className='text-center text-xl'>
                                Please wait
                            </div>
                            <div className="text-center">
                                You will be soon be able to go to payment page.
                            </div>
                        </>
                    )}
                    {invoiced && (
                        <>
                            <div className='text-center mb-5'>
                                Click the button below to go to payment page. After your payment is completed please wait for a while for the payments to be reflected on our side.
                            </div>
                            <a className="btn btn-accent" href={paymentLink} target='_blank'>Payment Page</a>
                        </>
                    )}
                </div>
            </Modal>
        </tr>
    )
}

export default PackagePurchaseCard