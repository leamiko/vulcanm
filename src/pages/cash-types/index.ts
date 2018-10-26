import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html'),
})
export class CashTypesPage extends Vue {

    @Getter btnloader;
    @Getter cashTypeUser;
    @Getter cashTypeDefault;
    @Getter cashTypeValid;
    @Getter cashTypePageCount;

    @Action addBreadcrumb;
    @Action getCashTypeList;
    @Action sendCashType;
    @Action changeCashType;
    @Action deleteCashType;

    loading: boolean = true;
    newItem: object = { 'name': '', 'increase': false };
    editItem: object = {};
    dialogEdit: boolean = false;
    dialogDelete: boolean = false;


    beforeMount() {
        this.getCashTypeList(1);
    }

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/reference' },
            { 'id': 2, 'section': 'Справочники', 'link': '/reference' },
            { 'id': 3, 'section': 'Кассовые операции', 'link': null }
        ]);
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    loadPage(val) {
        this.getCashTypeList(val);
    }

    onDialogEdit(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogEdit = !this.dialogEdit;
    }

    onDialogDelete(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogDelete = !this.dialogDelete;
    }

    @Watch('cashTypeUser')
    onLoad() {
        this.$nextTick(() => this.loading = false );
        if (!Object.keys(this.cashTypeValid).length) {
            this.newItem = { 'name': '', 'increase': false };
        }
    }

    @Watch('cashTypeValid')
    onChangeCashTypeValid(val: object) {
        this.dialogEdit = false;
    }

}