import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "@src/components/ErrorPage";
import LoaderScreen from "@src/components/LoaderScreen";
import { getTicketByInvoice, TicketByInvoiceDataType } from "@src/api/ticket";
import TicketDetails from "@src/components/TicketDetails";

const Ticket = () => {
    const { invoice_no = "" } = useParams();
    const ticket = useQuery<TicketByInvoiceDataType, Error>({
        queryKey: ['ticket', invoice_no],
        queryFn: () => getTicketByInvoice({ invoice_no })
    })

    if(ticket.isError){
        return <ErrorPage error={ticket.error} />
    }

    if(ticket.isLoading){
        return <LoaderScreen />
    }

    return (
        <NavLayout>
            {ticket.data && (
                <TicketDetails ticket={ticket.data.data} />
            )}
        </NavLayout>
    )
}

export default Ticket;