import { GetterTree } from 'vuex';
import { StateBug} from './types';

export const getters: GetterTree<StateBug, any> = {
    bug: state => state.bug
};