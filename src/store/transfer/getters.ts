import { GetterTree } from 'vuex';
import { StateTransfer } from './types';

export const getters: GetterTree<StateTransfer, any> = {
    transfer: state => state.transfer,
    viewTransfer: state => state.viewTransfer,
    transferValid: state => state.transferValid, 
    transferPageCount: state => state.transferPageCount, 
};