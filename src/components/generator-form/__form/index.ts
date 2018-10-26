import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./form.html')
})
export class FormGen extends Vue {

    @Action addPosition;
    @Action delPosition;

    @Prop() form: object[];
    @Prop() colNum: number;

    date = null;
    menu = false;
}