import { TicketListDataType, getTickets } from '@src/api/ticket';
import ErrorPage from '@src/components/ErrorPage'
import PackagePurchaseCard from '@src/components/PackagePurchaseCard';
import AuthNavLayout from '@src/layouts/AuthNavLayout'
import { useQuery } from '@tanstack/react-query'

const TicketList = () => {
  const tickets = useQuery<TicketListDataType, Error>({
    queryKey: ['tickets'],
    queryFn: () => getTickets()
  })

  if (tickets.isError) {
    return <ErrorPage error={tickets.error} />
  }

  return (
    <AuthNavLayout>
      <div className="container mx-auto px-10 pt-5 pb-16">
        <table className="w-full text-left w-full border border-base-300">
          <thead className="text-xs uppercase bg-base-300">
            <tr>
              <th scope="col" className="p-3">
                Invoice No
              </th>
              <th scope="col" className="p-3">
                Tour
              </th>
              <th scope="col" className="p-3">
                Package
              </th>
              <th scope="col" className="p-3 w-36">
                Details
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
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.data?.data.map((ticket, i) => (
              <PackagePurchaseCard
                tour={ticket.booked_package.tour}
                tour_package={ticket.booked_package.tour_package}
                payment={ticket.payment}
                ticket_amount={ticket.ticket_amount}
                key={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </AuthNavLayout>
  )
}

export default TicketList