import { GetterTree } from 'vuex';
import { StateClient} from './types';

export const getters: GetterTree<StateClient, any> = {
    client: state => state.client,
    clientInn: state => state.clientInn,
    clientPersonValid: state => state.clientPersonValid,
    clientCompanyValid: state => state.clientCompanyValid,
    viewClient: state => state.viewClient,
    pageCount: state => state.pageCount,
    pageCurrent: state => state.pageCurrent
};