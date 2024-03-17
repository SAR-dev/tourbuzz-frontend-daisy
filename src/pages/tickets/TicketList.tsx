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
        <div className="grid grid-cols-1 gap-5">
            {tickets.data?.data.map((ticket, i) => (
                <PackagePurchaseCard 
                    tour={ticket.booked_package.tour} 
                    tour_package={ticket.booked_package.tour_package} 
                    payment={ticket.payment} 
                    key={i} 
                />
            ))}
        </div>
      </div>
    </AuthNavLayout>
  )
}

export default TicketList