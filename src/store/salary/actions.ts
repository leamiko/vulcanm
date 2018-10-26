import SalaryOperationProvider
    from '../../api/providers/salaryoperation';
import SalaryTransferProvider
    from '../../api/providers/salarytransfer';
import StuffProvider
    from '../../api/providers/stuff';

import {
    SET_SALARY_OPERATION_UNPAID_LIST_BY_USER_ID,
    SET_SALARY_TRANSFER_LIST_BY_USER_ID,
    SET_SALARY_OPERATION_LIST_BY_TRANSFER_ID,
    SET_STUFF_WITH_SALARY_BALANCE,
} from './types';

import {ActionTree} from 'vuex';
import {SalaryState} from './types';

export const actions: ActionTree<SalaryState, any> = {
    async setSalaryOperationUnpaidListByUserId(
        {commit}, {user_id}) {
        try {
            let res = await SalaryOperationProvider.salaryOperationIndex({
                form: {
                    user_id,
                    payed: '0',
                },
            });
            commit(
                SET_SALARY_OPERATION_UNPAID_LIST_BY_USER_ID,
                {
                    data: res.data,
                    pageCount: res.pageCount,
                    currentPage: res.currentPage,
                },
            );
            return 0;
        } catch (err) {
            throw (err);
        }
    },

    async setSalaryOperationListByTransferId(
        {commit}, {transfer_id, user_id}) {
        try {
            let res = await SalaryOperationProvider.salaryOperationIndex({
                form: {
                    transfer_id,
                },
            });
            commit(
                SET_SALARY_OPERATION_LIST_BY_TRANSFER_ID,
                {
                    data: res.data,
                },
            );
            return 0;
        } catch (err) {
            throw (err);
        }
    },

    async deleteSalaryOperation({commit}, {id}) {
        try {
            let res = await SalaryOperationProvider.salaryOperationDelete({
                vars: {
                    id,
                },
            });
            commit('PUSH_CALL_SUCCESS', {title: 'Операция удалена', item: ''});
            return 0;
        } catch (err) {
            commit('PUSH_CALL_ERROR', {title: 'Произошла ошибка', item: ''});
            throw(err);
        }
    },

    async bonusEmployee({commit}, form) {
        try {
            let res = await SalaryOperationProvider.salaryOperationBonus({
                form,
            });
            commit('PUSH_CALL_SUCCESS', {title: 'Премия добавленна', item: ''});
            return 0;
        } catch (err) {
            commit('PUSH_CALL_ERROR', {title: 'Произошла ошибка', item: ''});
            throw(err);
        }
    },

    async penaltyEmployee({commit}, form) {
        try {
            let res = await SalaryOperationProvider.salaryOperationPenalty({
                form,
            });
            commit(
                'PUSH_CALL_SUCCESS', {title: 'Взыскание добавлено', item: ''});
            return 0;
        } catch (err) {
            commit('PUSH_CALL_ERROR', {title: 'Произошла ошибка', item: ''});
            throw(err);
        }
    },

    async updateSalaryOperation({commit}, {form, id}) {
        try {
            let res = await SalaryOperationProvider.salaryOperationUpdate({
                form,
                vars: {
                    id,
                },
            });
            commit('PUSH_CALL_SUCCESS', {title: 'Операция изменена', item: ''});
            return 0;
        } catch (err) {
            commit('PUSH_CALL_ERROR', {title: 'Произошла ошибка', item: ''});
            throw(err);
        }
    },

    async setSalaryTransferListByUserId(
        {commit}, {user_id}) {
        try {
            let res = await SalaryTransferProvider.salaryTransferIndex({
                form: {
                    user_id,
                },
                expand: ['total_sum'],
            });
            commit(
                SET_SALARY_TRANSFER_LIST_BY_USER_ID,
                {
                    data: res.data,
                },
            );
            return 0;
        } catch (err) {
            throw(err);
        }
    },

    async addSalaryTransfer({commit}, {form}) {
        try {
            let res = await SalaryTransferProvider.salaryTransferAdd({
                form,
            });
            commit('PUSH_CALL_SUCCESS', {title: 'Выплата добавлена', item: ''});
            return 0;
        } catch (err) {
            commit('PUSH_CALL_ERROR', {title: 'Произошла ошибка', item: ''});
            throw(err);
        }
    },

    async deleteSalaryTransfer({commit}, {id}) {
        try {
            let res = await SalaryTransferProvider.salaryTransferDelete({
                vars: {
                    id,
                },
            });
            commit('PUSH_CALL_SUCCESS', {title: 'Выплата удалена', item: ''});
            return 0;
        } catch (err) {
            commit('PUSH_CALL_ERROR', {title: 'Произошла ошибка', item: ''});
            throw(err);
        }
    },

    async setStuffWithSalaryBalance({commit}) {
        try {
            let res = await Promise.all(
                [
                    SalaryOperationProvider.salaryOperationIndex({
                        form: {
                            payed: '0',
                        },
                    }),
                    StuffProvider.getStuffList(),
                ]);
            let [{data: operations}, {data: stuffWithSalaryBalance}] = res;
            let mapSalaryBalanceToUserId = {};
            for (let i = 0; i < operations.length; ++i) {
                mapSalaryBalanceToUserId[operations[i].user_id] = 0;
            }
            for (let i = 0; i < operations.length; ++i) {
                mapSalaryBalanceToUserId[operations[i].user_id] +=
                    operations[i].sum;
            }
            for (let i = 0; i < stuffWithSalaryBalance.length; ++i) {
                stuffWithSalaryBalance[i]['salaryBalance'] =
                    mapSalaryBalanceToUserId[stuffWithSalaryBalance[i].id] || 0;
            }
            commit(SET_STUFF_WITH_SALARY_BALANCE,
                {data: stuffWithSalaryBalance});
            return 0;
        } catch (err) {
            throw(err);
        }
    },
};
