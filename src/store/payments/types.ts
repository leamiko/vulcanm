
export const GET_PAYMENT_LIST = 'GET_PAYMENT_LIST';

// Store

export interface StatePaymentList {
    paymentList: PaymentsList;
    paymentListPageCount: null;
}

// Models

export interface PaymentsList {
    id: number;
    type: number;
    name: string;
    status_id: number;
    status_name: string;
    acquirer_id: number;
    acquirer_name: string;
    sum: number;
}