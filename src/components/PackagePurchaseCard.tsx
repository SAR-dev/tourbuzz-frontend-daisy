import { InvoiceCreateReq, PackageType, PaymentType, TourType } from '@src/types/base'
import ImageLoader from './ImageLoader'
import { formatDate } from '@src/functions/helpers';
import { useState } from 'react';
import { parsePrice } from '@src/functions/helpers';
import Modal from './Modal';
import TourPackageDetails from './TourPackageDetails';
import { Link } from 'react-router-dom';
import { getPaymentLink } from '@src/api/bkash';
import toast from 'react-hot-toast';
import useLocalStorageState from 'use-local-storage-state';
import { constants } from '@src/stores/constantStore';

const PackagePurchaseCard = ({ 
    tour, 
    tour_package, 
    payment,
    ticket_amount 
}: { 
    tour: TourType, 
    tour_package: PackageType, 
    payment: PaymentType,
    ticket_amount: number 
}) => {
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
        setIsLoading(true)
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
            .catch((err) => {
                toast.error(err.response.data.message)
                setIsLoading(false)
            })
    }

    return (
        <tr className='border-t border-base-300'>
            <td className="p-3 font-medium">{payment.invoice_no}</td>
            <th scope="row">
                <div className='flex flex-row space-x-5 p-2'>
                    <div className="w-36 h-20">
                        <ImageLoader src={tour.avatar.thumbnail_url} className='h-20 w-36 card object-cover' />
                    </div>
                    <div className="flex flex-col font-normal">
                        <Link to={`/tours/${tour.slug}`} className="font-medium hover:text-teal-500 duration-100">{tour.title}</Link>
                        <div className='text-sm'>Organized By <Link to={`/organizers/${tour.organizer.username}`} className="link link-hover font-medium">{tour.organizer.name}</Link></div>
                        <div className='text-sm'>From <span className='font-medium'>{startAt.day} {startAt.month_name}, {startAt.year}</span> to <span className='font-medium'>{finishAt.day} {finishAt.month_name}, {finishAt.year}</span></div>
                    </div>
                </div>
            </th>
            <td className="p-3">
                {tour_package.title}
            </td>
            <td className="p-3">
                <button className="btn btn-sm" onClick={() => setIsModalOpen(true)}>See Details</button>
            </td>
            <td className="p-3">{parsePrice(tour_package.price)} TK</td>
            <td className="p-3">
                <input type="number" value={noOfTickets} onChange={(e) => setNoOfTickets(Number(e.target.value))} className="input input-bordered w-20" />
            </td>
            <td className="p-3">{parsePrice(tour_package.price * noOfTickets)} TK</td>
            <td className="p-3">
                <button className="btn btn-sm btn-accent" onClick={getInvoiceNo}>Pay with Bkash</button>
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
                                <div className="spinner h-10 w-10" />
                            </div>
                            <div className='text-center text-xl'>
                                You will be soon redirected to payment page.
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