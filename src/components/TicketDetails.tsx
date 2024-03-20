import { TicketType } from '@src/types/base'
import { ArrowRightIcon, ArrowUpRightIcon, CubeIcon, InformationCircleIcon, PrinterIcon, TicketIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';
import Title from './Title';
import { Link } from 'react-router-dom';
import OrganizerVerification from './OrganizerVerification';
import TourPackageDetails from './TourPackageDetails';
import { parsePrice } from '@src/functions/helpers';
import Modal from './Modal';

const TicketDetails = ({ ticket }: { ticket: TicketType }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const componentRef = useRef<HTMLInputElement>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
        documentTitle: "TourBuzz | Ticket"
    });

    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <Title>
                                {ticket.booked_package.tour.title}
                            </Title>
                            <div className="flex gap-1 items-center">
                                This tour is organized by
                                <Link to={`/organizers/${ticket.booked_package.tour.organizer.username}`} className="link link-hover">
                                    {ticket.booked_package.tour.organizer.name}
                                </Link>.
                                This organizer is {ticket.booked_package.tour.organizer.verification} verified.
                                <OrganizerVerification organizer={ticket.booked_package.tour.organizer}>
                                    <button className="btn btn-circle btn-ghost btn-xs text-info">
                                        <InformationCircleIcon className="h-4 w-4" />
                                    </button>
                                </OrganizerVerification>
                            </div>
                        </div>

                        <table className="w-full text-left w-full border border-base-300">
                            <thead className="text-xs uppercase bg-base-200">
                                <tr>
                                    <th></th>
                                    <th scope="col" className="p-3">
                                        Package Name
                                    </th>
                                    <th scope="col" className="p-3">
                                        Package Price
                                    </th>
                                    <th scope="col" className="p-3">
                                        Package Details
                                    </th>
                                    <th scope="col" className="p-3">
                                        Tour Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-sm font-medium'>
                                <td className='px-3 border-r border-base-300'>
                                    <CubeIcon className='h-5 w-5' />
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    {ticket.booked_package.tour_package.title}
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    {parsePrice(ticket.booked_package.tour_package.price)} BDT
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    <button className="btn btn-sm" onClick={() => setIsModalOpen(true)}>
                                        See Details
                                        <ArrowUpRightIcon className='h-4 w-4' />
                                    </button>
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    <Link to={`/tours/${ticket.booked_package.tour.slug}`} className='btn btn-sm'>
                                        View Tour
                                        <ArrowRightIcon className='h-4 w-4' />
                                    </Link>
                                </td>
                            </tbody>
                        </table>

                        <table className="w-full text-left w-full border border-base-300">
                            <thead className="text-xs uppercase bg-base-200">
                                <tr>
                                    <th></th>
                                    <th scope="col" className="p-3">
                                        Invoice No
                                    </th>
                                    <th scope="col" className="p-3">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="p-3">
                                        Tickets
                                    </th>
                                    <th scope="col" className="p-3">
                                        Amount
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='text-sm font-medium'>
                                <td className='px-3 border-r border-base-300'>
                                    <TicketIcon className='h-5 w-5' />
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    {ticket.payment.invoice_no}
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    {ticket.payment.payment_type} {ticket.payment.reference_no}
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    {ticket.ticket_amount}
                                </td>
                                <td className="border-r border-base-300 p-3 font-medium">
                                    {ticket.payment.payment_amount} {ticket.payment.currency}
                                </td>
                                <td className="p-3">
                                    <button className="btn btn-sm btn-accent" onClick={handlePrint}>
                                        <PrinterIcon className='h-4 w-4' />
                                        Print Invoice
                                    </button>
                                </td>
                            </tbody>
                        </table>

                        <div>
                            <div className="title text-2xl font-semibold mb-3">
                                Your Documents
                            </div>
                            <table className="w-full text-left w-full border border-base-300">
                                <thead className="text-xs uppercase bg-base-200">
                                    <tr>
                                        <th></th>
                                        <th scope="col" className="p-3">
                                            Filename
                                        </th>
                                        <th scope="col" className="p-3">
                                            Link
                                        </th>
                                        <th scope="col" className="p-3">
                                            Note
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-sm font-medium'>
                                    {ticket.files.length === 0 && (
                                        <tr>
                                            <th colSpan={4} className='p-3 text-center font-normal'>
                                                There are no files now. Please check again later.
                                            </th>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <Invoice ticket={ticket} />
                </div>
            </div>
            <div className="print p-5" ref={componentRef}>
                <Invoice ticket={ticket} />
            </div>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title={`Package Details: ${ticket.booked_package.tour_package.title}`}
                maxWidth='50rem'
                closeButton
            >
                <TourPackageDetails pac={ticket.booked_package.tour_package} />
            </Modal>
        </div>
    )
}

export default TicketDetails