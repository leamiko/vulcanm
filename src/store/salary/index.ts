import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';
import {SalaryState} from './types';

export const state: SalaryState = {
    salaryOperationUnpaidListByUserId: [],
    salaryOperationUnpaidListByUserIdPageCount: undefined,
    salaryOperationUnpaidListByUserIdCurrentPage: undefined,
    
    salaryTransferListByUserId: [],
    salaryOperationListByTransferId: [],
    
    stuffWithSalaryBalance: [],
};

export const salary = {
    state,
    getters,
    actions,
    mutations,
};
