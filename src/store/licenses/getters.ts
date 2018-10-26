import { GetterTree } from 'vuex';
import { StateLicenses } from './types';

export const getters: GetterTree<StateLicenses, any> = {
    licensesList: state => state.licensesList,
    licensesListPageCount: state => state.licensesListPageCount
};
