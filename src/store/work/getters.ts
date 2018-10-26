import { GetterTree } from 'vuex';
import { StateWork } from './types';

export const getters: GetterTree<StateWork, any> = {
    work: state => state.work,
    viewWork: state => state.viewWork,
    workValid: state => state.workValid, 
    workPageCount: state => state.workPageCount, 
};