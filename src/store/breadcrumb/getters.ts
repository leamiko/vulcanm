import { GetterTree } from 'vuex';
import { StateBreadcrumb} from './types';

export const getters: GetterTree<StateBreadcrumb, any> = {
    breadcrumb: state => state.breadcrumb,
    actionBtn: state => state.actionBtn
};