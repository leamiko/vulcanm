import { GetterTree } from 'vuex';
import { StatePoint } from './types';

export const getters: GetterTree<StatePoint, any> = {
    point: state => state.point,
    typePoint: state => state.typePoint,
    viewPoint: state => state.viewPoint,
    validPoint: state => state.validPoint,
    pointPageCount: state => state.pointPageCount,
};