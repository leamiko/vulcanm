import { GetterTree } from 'vuex';
import { StatePosting} from './types';

export const getters: GetterTree<StatePosting, any> = {
    posting: state => state.posting,
    postingView: state => state.postingView,
    postingValid: state => state.postingValid, 
    postingPageCount: state => state.postingPageCount,
    postingNewItemList: state => state.postingNewItemList
};