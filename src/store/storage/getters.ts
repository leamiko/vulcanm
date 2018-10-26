import { GetterTree } from 'vuex';
import { StateStorage } from './types';

export const getters: GetterTree<StateStorage, any> = {
    storages: state => state.storages,
    validStorage: state => state.validStorage,
    pageStorCount: state => state.pageStorCount,
    pageStorCurrent: state => state.pageStorCurrent
};