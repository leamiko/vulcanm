import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Numbers } from '../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers
    }
})
export class CashListItem extends Vue {

    @Prop({ 'default': () => {} }) item: object;
    @Prop({ 'default': () => [] }) point: object[];

    @Action changeCashItem;
    @Action deleteCashItem;
    @Action clickDetail;

    @Getter cashValidate;
    @Getter btnloader;

    dialogEdit: boolean = false;
    dialogDelete: boolean = false;
    typeBtn: number = 0;

    form: object = {};

    get controlDeleteButtuon() {
        if(this.item['sum'] < 0 || this.item['sum'] > 0) {
            return false;
        }else {
            return true;
        }
    }

    onDialogEdit() {
        this.form = JSON.parse(JSON.stringify(this.item));
        this.dialogEdit = true;
    }

    
    onDialogDelete() {
        this.dialogDelete = true;
    }


    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    @Watch('cashValidate')
    onChange(val: object) {
        if (!Object.keys(val).length) {
            this.dialogEdit = false;
        }
    }

    onClickDetail(item) {
        this.$router.push('/cash/view/' + item.id)
        this.clickDetail(item.name);
    }
}