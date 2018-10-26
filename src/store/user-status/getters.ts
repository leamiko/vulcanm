import { GetterTree } from 'vuex';
import { StateUserStatus} from './types';

export const getters: GetterTree<StateUserStatus, any> = {
    repairStatus: state => state.repairStatus,
    userStatus: state => state.userStatus.sort( (i, j) => i['parent_id'] - j['parent_id']),
    validStatus: state => state.validStatus,
    userStatusPageCount: state => state.userStatusPageCount,
    
    repairsSetting: state => state.repairsSetting
};