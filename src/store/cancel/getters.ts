import { GetterTree } from 'vuex';
import { StateCancel} from './types';

export const getters: GetterTree<StateCancel, any> = {
    cancel: state => state.cancel,
    cancelValid: state => state.cancelValid, 
    cancelPageCount: state => state.cancelPageCount, 
    cancelView: state => state.cancelView, 
};