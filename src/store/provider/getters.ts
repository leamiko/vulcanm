import { GetterTree } from 'vuex';
import { StateProvider} from './types';

export const getters: GetterTree<StateProvider, any> = {
    provider: state => state.provider,
    viewProvider: state => state.viewProvider,
    validProvider: state => state.validProvider,
    providerPageCount: state => state.providerPageCount,
    providerPageCurrent: state => state.providerPageCurrent
};