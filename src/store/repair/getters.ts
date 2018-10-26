import { GetterTree } from 'vuex';
import { StateRepair} from './types';

export const getters: GetterTree<StateRepair, any> = {
    repair: state => state.repair,
    pageCountRepair: state => state.pageCountRepair,
    pageCurrentRepair: state => state.pageCurrentRepair
};