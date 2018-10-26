import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';


@Component({
    template: require('./footer.html'),
})
export class FooterComponent extends Vue {

    nameCompany: string = '© ООО Совинфсистемы 2017 г.';
    time: string = '0.0885';
}