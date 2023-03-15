export interface ICreateInvoiceCommand{
    dateEmitted?: number;
    ticketID?: string;
    customerID?: string;
    invoiceAmount?: number;
    warrantyID?: string;
    isPaid?: boolean;
}