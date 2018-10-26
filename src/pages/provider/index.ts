import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html'),
})
export class ProviderPage extends Vue {

    @Getter provider;
    @Getter providerPageCurrent;
    @Getter providerPageCount;

    @Action getProviderList;
    @Action deleteProvider;
    @Action addBreadcrumb;
    @Action addActionBtn;

    dialogDelete: boolean = false;
    dialogView: boolean = false;
    loading: boolean = false;
    providerView: object = {};
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Компания', 'link': '/reference' }, { 'id': 2, 'section': 'Справочники', 'link': '/reference' }, { 'id': 3, 'section': 'Поставщики', 'link': null }];
    actionbtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новый поставщик', 'link': '/reference/provider/add', 'icon': 'fa-plus' }];

    mounted() {
        this.getProviderList(1);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionbtn);
    }

    destroyed() {
        this.addBreadcrumb([]);
        this.addActionBtn([]);
    }

    loadPage(val) {
        this.getProviderList(val);
    }

    viewProvider(val, column) {
        if (column.type === 'default' || column.type === 'index') {
            this.providerView = val;
            this.dialogView = !this.dialogView;
        }
    }

    onDialogDelete(item) {
        this.providerView = item;
        this.dialogDelete = !this.dialogDelete;
    }

    @Watch('provider')
    onLoad() {
        this.$nextTick(() => this.loading = false );
    }
}