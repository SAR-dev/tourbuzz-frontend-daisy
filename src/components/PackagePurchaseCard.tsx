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

const PackagePurchaseCard = ({ tour, tour_package, payment }: { tour: TourType, tour_package: PackageType, payment: PaymentType }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [invoiced, setInvoiced] = useState(false)
    const [paymentLink, setPaymentLink] = useLocalStorageState<string>(constants.TOUR_TICKET_INVOICE_STORE_KEY + tour_package.id, {
        defaultValue: ""
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noOfTickets, setNoOfTickets] = useState(1)
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
        <div className="card border border-base-300 p-5">
            <div className='flex flex-row space-x-5 mb-5'>
                <div className="w-36 h-20">
                    <ImageLoader src={tour.avatar.thumbnail_url} className='h-20 w-36 card object-cover' />
                </div>
                <div className="flex flex-col">
                    <Link to={`/tours/${tour.slug}`} className="title text-xl font-semibold hover:text-teal-500 duration-100">{tour.title}</Link>
                    <div>Organized By <Link to={`/organizers/${tour.organizer.username}`} className="link link-hover font-medium">{tour.organizer.name}</Link></div>
                    <div>From <span className='font-medium'>{startAt.day} {startAt.month_name}, {startAt.year}</span> to <span className='font-medium'>{finishAt.day} {finishAt.month_name}, {finishAt.year}</span></div>
                </div>
            </div>
            <div className="flex">
                <table className="w-full text-left w-full border border-base-300">
                    <thead className="text-xs uppercase bg-base-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Unit Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No of tickets
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Price
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="px-6 py-4 font-medium">
                                {tour_package.title}
                            </th>
                            <td className="px-6 py-4">
                                <button className="btn btn-sm" onClick={() => setIsModalOpen(true)}>See Details</button>
                            </td>
                            <td className="px-6 py-4">{parsePrice(tour_package.price)} TK</td>
                            <td className="px-6 py-4">
                                <input type="number" value={noOfTickets} onChange={(e) => setNoOfTickets(Number(e.target.value))} className="input input-bordered w-20" />
                            </td>
                            <td className="px-6 py-4">{parsePrice(tour_package.price * noOfTickets)} TK</td>
                            <td className="px-6 py-4">
                                <button className="btn btn-sm btn-accent" onClick={getInvoiceNo}>Pay with Bkash</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        </div>
    )
}

export default PackagePurchaseCard