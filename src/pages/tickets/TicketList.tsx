import { TicketListDataType, getTickets } from '@src/api/ticket';
import ErrorPage from '@src/components/ErrorPage'
import PackagePurchaseCard from '@src/components/PackagePurchaseCard';
import AuthNavLayout from '@src/layouts/AuthNavLayout'
import { useAuthStore } from '@src/stores/authStore';
import { useQuery } from '@tanstack/react-query'

const TicketList = () => {
  const { isLoggedIn } = useAuthStore()
  const tickets = useQuery<TicketListDataType, Error>({
    queryKey: ['tickets'],
    queryFn: () => getTickets(),
    enabled: isLoggedIn()
  })

  if (tickets.isError) {
    return <ErrorPage error={tickets.error} />
  }

  return (
    <AuthNavLayout>
      <div className="container mx-auto px-10 pt-5 pb-16">
        <section className='mb-5'>
          <div className="bg-info/20 text-info-content p-10 card flex flex-row items-center gap-5">
            <div className="text-6xl">📦</div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="title text-2xl font-semibold">Your Tickets</div>
              <div className="title">
                Here are the tickets that you have booked or purchased. Grab your tickets before they are sold out.
              </div>
            </div>
          </div>
        </section>
        {tickets.data && (
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
              {tickets.data.data.length === 0 && (
                <tr>
                  <th colSpan={9}>
                    <div className="p-5 text-center font-normal">You have not booked any tickets yet 🪐</div>
                  </th>
                </tr>
              )}
              {tickets.data.data.map((ticket, i) => (
                <PackagePurchaseCard
                  tour={ticket.booked_package.tour}
                  tour_package={ticket.booked_package.tour_package}
                  payment={ticket.payment}
                  ticket_amount={ticket.ticket_amount}
                  remaining_tickets={ticket.booked_package.tour_package.threshold - ticket.booked_package.ticket_sold}
                  key={i}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AuthNavLayout>
  )
}

export default TicketList