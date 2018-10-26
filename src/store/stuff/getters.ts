import { GetterTree } from 'vuex';
import { StateStuff} from './types';

export const getters: GetterTree<StateStuff, any> = {
    stuff: state => state.stuff,
    viewStuff: state => state.viewStuff,
    validStuff: state => state.validStuff,
    stuffPageCount: state => state.stuffPageCount,
    stuffPageCurrent: state => state.stuffPageCurrent,
    salaryPeriodTypeList: state => state.salaryPeriodTypeList,
    sellPartSalaryTypeList: state => state.sellPartSalaryTypeList,
    repairPartSalaryType: state => state.repairPartSalaryType,
    fullEmployeeName: state => {
        let last_name = state.viewStuff.last_name || '';
        let first_name = state.viewStuff.first_name || '';
        let middle_name = state.viewStuff.middle_name || '';
        
        return `${last_name} ${first_name} ${middle_name}`;
    },
    shortEmployeeName: state => {
        let last_name = state.viewStuff.last_name || '';
        let first_name = state.viewStuff.first_name ?
            state.viewStuff.first_name[0] : '';
        let middle_name = state.viewStuff.middle_name ?
            state.viewStuff.middle_name[0] : '';
        
        return `${last_name} ${first_name}. ${middle_name}.`;
    }
};