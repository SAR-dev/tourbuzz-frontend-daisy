import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { TicketListDataType, getTickets } from '@src/api/ticket'
import { useAuthStore } from '@src/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const CartButton = () => {
    const { isLoggedIn } = useAuthStore()
    const tickets = useQuery<TicketListDataType, Error>({
        queryKey: ['tickets'],
        queryFn: () => getTickets(),
        enabled: isLoggedIn()
    })

    const count = useMemo(
        () => {
            if (!tickets || !tickets.data) return 0; 
            return tickets.data.data.filter(e => !e.payment.completed).length;
        },
        [tickets]
    );

    return (
        <Link to="/tickets" className="btn btn-ghost relative">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 m-1 bg-info/20 text-info flex items-center justify-center w-5 h-5 text-xs rounded-full">{count}</span>
        </Link>
    )
}

export default CartButton