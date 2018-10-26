import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html'),
})
export class CashViewFilter extends Vue {

    @Action getCashOperation;
    @Action getCashTypeList;
    @Action getStuffList;

    @Getter cashTypeDefault;
    @Getter cashTypeUser;
    @Getter stuff;
    @Getter cashTypeUserOn;
    @Getter cashTypeUserOff;
    @Getter btnloader;

    @Prop({ 'default': () => {} }) form: object;

    rangeDate: object = {
        shortcuts: [
            {
                text: 'За вчера',
                onClick(picker) {
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    start.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, start]);
                }
            }, {
                text: 'За неделю',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За месяц',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За 3 месяца',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }
        ]
    };

    date: number[] = [];

    mounted() {
        this.getStuffList(1);
        this.getCashTypeList(1);
    }

    clear() {
        this.date = null;
        this.form['created_at_start'] = '';
        this.form['created_at_end'] = '';
        this.form['sum_min'] = '';
        this.form['sum_max'] = '';
        this.form['act_type_id'] = '';
        this.form['custom_act_type_id'] = '';
        this.form['created_by'] = '';
        this.getCashOperation(this.form);
    }

    userTypeActive(form) {
        const type: boolean = Number(form['act_type_id']) === 1 || Number(form['act_type_id']) === 7;
        return !form['act_type_id'] || !type;
    }

    get typeUser() {
        let type: object[] = [];
        switch (this.form['act_type_id']) {
            case 1: type = this.cashTypeUserOn; break;
            case 7: type = this.cashTypeUserOff; break;
            default: this.form['created_by'] = ''; 
        }
        return type;
    }

    @Watch('date')
    change(val: number[]) {
        if (val) {
            val[1] += 3600 * 1000 * 24 - 1;
            this.form['created_at_start'] = Math.floor(val[0] / 1000);
            this.form['created_at_end'] = Math.floor(val[1] / 1000);
        } else {
            this.form['created_at_start'] = '';
            this.form['created_at_end'] = '';
        }
    }
}