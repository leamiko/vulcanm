import {GetterTree} from 'vuex';
import {SalaryState} from './types';

export const getters: GetterTree<SalaryState, any> = {
    salaryOperationUnpaidListByUserId:
        (state) => state.salaryOperationUnpaidListByUserId,
    salaryOperationUnpaidListByUserIdPageCount:
        state => state.salaryOperationUnpaidListByUserIdPageCount,
    salaryOperationUnpaidListByUserIdCurrentPage:
        state => state.salaryOperationUnpaidListByUserIdCurrentPage,
    totalSalaryOperationAmount:
        state => state.salaryOperationUnpaidListByUserId.reduce(
            (previousValue, currentValue) => {
                return previousValue + Number(currentValue.sum);
            }, 0),
    salaryTransferListByUserId: state => state.salaryTransferListByUserId,
    salaryOperationListByTransferId:
        state => state.salaryOperationListByTransferId,
    stuffWithSalaryBalance: state => state.stuffWithSalaryBalance,
};
