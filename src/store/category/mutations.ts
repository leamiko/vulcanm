import { MutationTree } from 'vuex';
import {
    GET_CATEGORY,
    EDIT_CATEGORY,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    StateCategory } from './types';

// let cat = {};
// function searchCategory(value, key) {
//     value.forEach( (item, i, value) => {
//         if (item.key === key) {
//             cat = item;
//             cat['index'] = i;
//         } else if (item.children) {
//             searchCategory(item.children, key);
//         }
//     });
// }

export const mutations: MutationTree<StateCategory> = {

    [GET_CATEGORY](state, { item }) {
        state.categories = item;
    }

//     [EDIT_CATEGORY](state, { item, id }) {
//         cat = {};
//         searchCategory(state.categories, id);
//         cat['title'] = item.name;
//     },

//     [ADD_CATEGORY](state, { item, id }) {
//         const newItem: object = {
//             'key': item.id,
//             'title': item.name,
//             'expanded': false,
//             'folder': false,
//             'parent_id': item.parent_id,
//             'children': []
//         };
//         if (item.parent_id === 1) {
//             state.categories.unshift(newItem);
//         } else {
//             cat = {};
//             searchCategory(state.categories, id);
//             cat['folder'] = true;
//             cat['expanded'] = true;
//             cat['children'].push(newItem);
//         }
//     },

//     [DELETE_CATEGORY](state, { item, id }) {
        
//         function getIndex(array) {
//             return array.findIndex( (i) => i['key'] === item.id);
//         }

//         if (item.parent_id === 1) {
//             state.categories.splice(getIndex(state.categories), 1);
//         } else {
//             cat = {};
//             searchCategory(state.categories, id);
//             cat['children'].splice(getIndex(cat['children']), 1);
//         }
//     },
};
