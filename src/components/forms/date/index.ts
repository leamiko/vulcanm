import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
    template: require('./index.html'),
    props: ['type', 'value']
})

export class ViewDate extends Vue {

    get getDateCurrent() {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date().toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    getDate(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }
}