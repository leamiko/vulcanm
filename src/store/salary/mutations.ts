import {MutationTree} from 'vuex';

import {
    SET_SALARY_OPERATION_UNPAID_LIST_BY_USER_ID,
    SalaryState,
    SET_SALARY_TRANSFER_LIST_BY_USER_ID,
    SET_SALARY_OPERATION_LIST_BY_TRANSFER_ID,
    SET_STUFF_WITH_SALARY_BALANCE,
} from './types';

export const mutations: MutationTree<SalaryState> = {
    [SET_SALARY_OPERATION_UNPAID_LIST_BY_USER_ID](
        state, {data, pageCount, currentPage}) {
        state.salaryOperationUnpaidListByUserId = data;
        state.salaryOperationUnpaidListByUserIdPageCount = pageCount;
        state.salaryOperationUnpaidListByUserIdCurrentPage = currentPage;
    },
    
    [SET_SALARY_TRANSFER_LIST_BY_USER_ID](state, {data}) {
        state.salaryTransferListByUserId = data;
    },
    [SET_SALARY_OPERATION_LIST_BY_TRANSFER_ID](state, {data}) {
        state.salaryOperationListByTransferId = data;
    },
    [SET_STUFF_WITH_SALARY_BALANCE](state, {data}) {
        state.stuffWithSalaryBalance = data;
    },
};
