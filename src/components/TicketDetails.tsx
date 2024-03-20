import { TicketType } from '@src/types/base'
import PackagePurchaseCard from './PackagePurchaseCard'
import { PrinterIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';

const TicketDetails = ({ ticket }: { ticket: TicketType }) => {
    const componentRef = useRef<HTMLInputElement>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
        documentTitle: "TourBuzz | Ticket"
    });

    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <table className="w-full text-left w-full border border-base-300">
                <thead className="text-xs uppercase bg-base-200">
                    <tr>
                        <th></th>
                        <th scope="col" className="p-3">
                            Invoice No
                        </th>
                        <th scope="col" className="p-3">
                            Tour
                        </th>
                        <th scope="col" className="p-3">
                            Package
                        </th>
                        <th scope="col" className="p-3">
                            Unit Price
                        </th>
                        <th scope="col" className="p-3">
                            No of tickets
                        </th>
                        <th scope="col" className="p-3">
                            Total Price
                        </th>
                        <th scope="col" className='p-3 w-52'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <PackagePurchaseCard
                        tour={ticket.booked_package.tour}
                        tour_package={ticket.booked_package.tour_package}
                        payment={ticket.payment}
                        ticket_amount={ticket.ticket_amount}
                        remaining_tickets={ticket.booked_package.tour_package.threshold - ticket.booked_package.ticket_sold}
                        action={
                            <button className='btn btn-accent btn-sm' onClick={handlePrint}>
                                <PrinterIcon className='h-4 w-4' />
                                Print Invoice
                            </button>
                        }
                    />
                </tbody>
            </table>
            <div className="print p-5" ref={componentRef}>
                <Invoice />
            </div>
        </div>
    )
}

export default TicketDetails