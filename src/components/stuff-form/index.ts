import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class StuffForm extends Vue {

    @Action sendStuff;
    @Action changeStuff;

    @Action getPointList;

    @Getter point;
    @Getter btnloader;
    @Getter validStuff;

    @Prop() type: string;
    @Prop() item: object;

    newItem: object = {};
    copyPassword: string = '';
    period: object[] = [ { 'id': 1, 'name': 'Дневной'}, { 'id': 2, 'name': 'Месячный'} ];
    percent: object[] = [ { 'id': 1, 'name': '% (от полной стоимости)'}, { 'id': 2, 'name': '% (от прибыли)'} ];

    mounted() {
        this.getPointList(1);
    }

    get typeForm() {
        return this.type === 'edit';
    }

    get rights() {
        return this.item['rights'] === undefined ? false : this.item['rights'];
    }

    get checkPass() {
        return this.item['password'] === undefined || this.copyPassword === this.item['password'] ? '' : 'Пароль указан не верно';
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    @Watch('validStuff')
    onChangeValid(val: object) {
        if (!Object.keys(val).length) {
            this.$router.push('/stuff');
        }
    }

}