import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html'),
})
export class ClientSourcePage extends Vue {
    
    @Action getClientSourceList;
    @Action changeClientSource;
    @Action sendClientSource;
    @Action deleteClientSource;
    @Action addBreadcrumb;

    @Getter clientSource;
    @Getter clientSourceValid;
    @Getter clientSourcePageCount;
    @Getter btnloader;

    loading: boolean = true;
    dialogEdit: boolean = false;
    dialogDelete: boolean = false;
    newItem: object = { 'name': ''};
    editItem: object = {};

    beforeMount () {
        this.getClientSourceList(1);
    }

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/reference' },
            { 'id': 2, 'section': 'Справочники', 'link': '/reference' },
            { 'id': 3, 'section': 'Источники клиентов', 'link': null }
        ]);
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    onDialogEdit(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogEdit = !this.dialogEdit;
    }

    onDialogDelete(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogDelete = !this.dialogDelete;
    }

    loadPage(val) {
        this.getClientSourceList(val);
    }

    @Watch('clientSource')
    onLoad() {
        if (!Object.keys(this.clientSourceValid).length) {
            this.newItem = { 'name': ''};
        }
        this.$nextTick(() => this.loading = false );
    }

    @Watch('clientSourceValid')
    onChangeValid() {
        this.dialogEdit = false;
    }

}