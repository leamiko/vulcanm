import { GetterTree } from 'vuex';
import { StateCategory} from './types';

export const getters: GetterTree<StateCategory, any> = {
    categoryList: state => state.categories
};