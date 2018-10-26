import { GetterTree } from 'vuex';
import { StatePreloader} from './types';

export const getters: GetterTree<StatePreloader, any> = {
    preloader: state => state.preloader,
    btnloader: state => state.btnloader
};