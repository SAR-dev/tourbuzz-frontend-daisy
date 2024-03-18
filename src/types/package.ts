export interface InvoiceCreateReq {
    invoice_no: string
    ticket_amount: number
}

export interface BookCreateReq {
    packages_id: number
    ticket_amount: number
}

export interface BookCancelReq {
    invoice_no: string
}