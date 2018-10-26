import { GetterTree } from 'vuex';
import { StateUser} from './types';

export const getters: GetterTree<StateUser, any> = {
    repairAllColumn: state => state.repairAllColumn.filter( i => state.repairActiveColumn.indexOf(i['value']) < 0),
    repairActiveColumn: state => {
        let active = [];
        state.repairActiveColumn.forEach( i => active.push(state.repairAllColumn.find( j => j['value'] === i)));
        return active;
    },
    user: state => state.user

};