import { GetterTree } from 'vuex';
import { StateForm} from './types';

export const getters: GetterTree<StateForm, any> = {
    form: state => state.form,

    colOne: state => state.positionForm['1'].map( item => state.form.find( form => form['id'] === item)),
    colTwo: state => state.positionForm['2'].map( item => state.form.find( form => form['id'] === item)),
    colThree: state => state.positionForm['3'].map( item => state.form.find( form => form['id'] === item)),
    colFour: state => state.positionForm['4'].map( item => state.form.find( form => form['id'] === item)),


    buffer: state => {
        const buffer = state.positionForm['1']
            .concat(state.positionForm['2']
                .concat(state.positionForm['3']
                    .concat(state.positionForm['4'])
                )
            );
       return state.form.filter( item => buffer.indexOf(item['id']) < 0).reverse();
//        return buffer.map( item => state.form.find( form => form['id'] === item));
    },

    newForm: state => state.newForm
};