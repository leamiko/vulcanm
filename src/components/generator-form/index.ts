import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter, State} from 'vuex-class';
import { Form } from '../../store/generator-form/types';

import { FormGen } from './__form';

@Component({
    template: require('./generator.html'),
    components: {
        'form-gen': FormGen
    }
})
export class GeneratorForm extends Vue {

    pos: number = null;

    @Action addForm;

    @Getter form;
    @Getter colOne;
    @Getter colTwo;
    @Getter colThree;
    @Getter colFour;
    @Getter buffer;
    @Getter newForm;

    dialog: boolean = false;
    type: object = [
        { 'id': 1, 'type': 'text', 'label': 'Текст' },
        { 'id': 2, 'type': 'number', 'label': 'Число' },
        { 'id': 3, 'type': 'checkbox', 'label': 'Галочка' },
        { 'id': 4, 'type': 'date', 'label': 'Дата' }
    ];

    date = null;
    menu: boolean = false;

    idForm() {
        return this.$route.params.id;
    }

    e11 = [];
    people = [
        { id: 1, name: 'Sandra Adams' },
        { id: 2, name: 'Ali Connors' },
        { id: 3, name: 'Trevor Hansen' },
        { id: 4, name: 'Tucker Smith' },
        { id: 5, name: 'Britta Holt' },
        { id: 6, name: 'Jane Smith ' },
        { id: 7, name: 'John Smith' },
        { id: 8, name: 'Sandra Williams' },
        { id: 9, name: 'Sandra Adams' },
        { id: 10, name: 'Ali Connors' },
        { id: 11, name: 'Trevor Hansen' },
        { id: 12, name: 'Tucker Smith' },
        { id: 13, name: 'Britta Holt' },
        { id: 14, name: 'Jane Smith ' },
        { id: 15, name: 'John Smith' },
        { id: 16, name: 'Sandra Williams' },
        { id: 17, name: 'Sandra Adams' },
        { id: 18, name: 'Ali Connors' },
        { id: 19, name: 'Trevor Hansen' },
        { id: 20, name: 'Tucker Smith' },
        { id: 21, name: 'Britta Holt' },
        { id: 22, name: 'Jane Smith ' },
        { id: 23, name: 'John Smith' },
        { id: 24, name: 'Sandra Williams' }
    ];

}