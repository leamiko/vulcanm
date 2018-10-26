export const SET_SALARY_OPERATION_UNPAID_LIST_BY_USER_ID =
    'SET_SALARY_OPERATION_UNPAID_LIST_BY_USER_ID';
export const SET_SALARY_TRANSFER_LIST_BY_USER_ID =
    'SET_SALARY_TRANSFER_LIST_BY_USER_ID';
export const SET_SALARY_OPERATION_LIST_BY_TRANSFER_ID =
    'SET_SALARY_OPERATION_LIST_BY_TRANSFER_ID';
export const SET_STUFF_WITH_SALARY_BALANCE =
    'SET_STUFF_WITH_SALARY_BALANCE';


export interface SalaryState {
    salaryOperationUnpaidListByUserId: SalaryOperation[];
    salaryOperationUnpaidListByUserIdPageCount: number | undefined;
    salaryOperationUnpaidListByUserIdCurrentPage: number | undefined;
    
    salaryTransferListByUserId: SalaryTransfer[];
    salaryOperationListByTransferId: SalaryOperation[];
    
    stuffWithSalaryBalance: UserWithSalaryBalance[];
}

export interface SalaryTransfer {
    id: number;
    user_id: number;
    comment: string;
    created_at: number;
    total_sum: number;
    user: any;
}

export interface SalaryOperation {
    id: string;
    user_id: string;
    act_type: string;
    act_id: string;
    sum: string;
    comment: string;
    payed: string;
    system_info: string;
    created_at: string;
}

export interface UserWithSalaryBalance {
    salaryBalance: string;
}
