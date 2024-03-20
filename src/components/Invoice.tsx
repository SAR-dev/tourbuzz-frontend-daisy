import { formatDate, parsePrice } from "@src/functions/helpers"
import { TicketType } from "@src/types/base"
import QRCode from "react-qr-code";

const Invoice = ({ ticket }: { ticket: TicketType }) => {
    const paidAt = formatDate(ticket.payment.updated_at)

    return (
        <div className="relative flex flex-col rounded-xl bg-white border max-w-[40rem]">
            <div className="relative min-h-32 overflow-hidden rounded-t-xl bg-gray-900 text-center">
                <figure className="absolute inset-x-0 bottom-0 -mb-px">
                    <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 1920 100.1"
                    >
                        <path
                            fill="#fff"
                            className="fill-white"
                            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                        />
                    </svg>
                </figure>
            </div>
            <div className="relative z-10 -mt-20">
                <span className="mx-auto flex size-[150px] items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm p-8">
                    <QRCode value="http://localhost:3000/tickets/TBZ10000004" />
                </span>
            </div>
            <div className="overflow-y-auto p-7">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Invoice from TourBuzz
                    </h3>
                    <p className="text-sm text-gray-500">Invoice #{ticket.payment.invoice_no}</p>
                </div>
                <div className="flex justify-between w-full mt-10">
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            Amount paid:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">{ticket.payment.payment_amount} {ticket.payment.currency}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            Date paid:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            {paidAt.month_name} {paidAt.day}, {paidAt.year}
                        </span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            Payment method:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            {ticket.payment.payment_type}
                        </span>
                    </div>
                </div>
                <div className="mt-10">
                    <h4 className="text-xs font-semibold uppercase text-gray-800">Summary</h4>
                    <ul className="mt-3 flex flex-col border text-sm text-gray-800">
                        <li className="inline-flex items-center gap-x-2 px-4 py-3">
                            <div className="flex w-full items-center justify-between">
                                <span>Ticket Price</span>
                                <span>{parsePrice(ticket.booked_package.tour_package.price)} BDT</span>
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 px-4 py-3">
                            <div className="flex w-full items-center justify-between">
                                <span>No of Tickets</span>
                                <span>{ticket.ticket_amount}</span>
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 px-4 py-3">
                            <div className="flex w-full items-center justify-between">
                                <span>Total Fee</span>
                                <span>{parsePrice(ticket.ticket_amount * ticket.booked_package.tour_package.price)} BDT</span>
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 border-t px-4 py-3 bg-gray-50 font-semibold">
                            <div className="flex w-full items-center justify-between">
                                <span>Amount paid</span>
                                <span>{parsePrice(ticket.payment.payment_amount)} {ticket.payment.currency}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="mt-10">
                    <p className="text-sm text-gray-500">
                        If you have any questions, please contact us at
                        <span className="font-medium mx-1">
                            example@site.com
                        </span>
                        or call at <span className="font-medium ml-1">+1 898-34-5492</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Invoice