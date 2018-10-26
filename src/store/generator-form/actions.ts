import TemplateFormProvider from '../../api/providers/template-form';

import { ActionTree } from 'vuex';
import { StateForm } from './types';

const colForm = null;

export const actions: ActionTree<StateForm, any> = {

    getTemplateForm({ commit }, item) {
        TemplateFormProvider.getTemplateForm()
            .then( res => {
                commit('GET_FORM', { item: res.data });
            })
            .catch( err => console.log(err));
    }
};