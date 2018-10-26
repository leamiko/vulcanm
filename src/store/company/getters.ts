import { GetterTree } from 'vuex';
import { StateCompany } from './types';

export const getters: GetterTree<StateCompany, any> = {
    company: state => state.company,
    country: state => state.country
};