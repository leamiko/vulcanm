import { MutationTree } from 'vuex';
import {
    GET_STUFF,
    GET_VIEW_STUFF,
    GET_VALID_STUFF,
    GET_SALARY_PERIOD_TYPE_LIST,
    GET_SELL_PART_SALARY_TYPE_LIST,
    GET_REPAIR_PART_SALARY_TYPE,
    EDIT_STUFF,
    DELETE_STUFF,
    INSERT_STUFF,
    StateStuff,
} from './types';

export const mutations: MutationTree<StateStuff> = {

    [GET_STUFF](state, { item, pageCount, pageCurrent }) {
        state.stuff = item;
        state.stuffPageCount = pageCount;
        state.stuffPageCurrent = pageCurrent;
    },

    [GET_VIEW_STUFF](state, { item }) {
        state.viewStuff = item;
    },

    [GET_VALID_STUFF](state, { item }) {
        state.validStuff = item;
    },
    
    [GET_SALARY_PERIOD_TYPE_LIST](state, {item}) {
        state.salaryPeriodTypeList = item;
    },
    
    [GET_SELL_PART_SALARY_TYPE_LIST](state, {item}) {
        state.sellPartSalaryTypeList = item;
    },
    
    [GET_REPAIR_PART_SALARY_TYPE](state, {item}) {
        state.repairPartSalaryType = item;
    },
    
    [INSERT_STUFF](state, { item }) {
        state.stuff.push(item);
    },

    [EDIT_STUFF](state, { item }) {
        const index = state.stuff.findIndex( (i) => i['id'] === item.id);
        state.stuff.splice(index, 1);
        state.stuff.splice(index, 0, item);
    },

    [DELETE_STUFF](state, { item }) {
        const index = state.stuff.findIndex( (i) => i['id'] === item.id);
        state.stuff.splice(index, 1);
    }

};