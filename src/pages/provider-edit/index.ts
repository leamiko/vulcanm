import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ProviderForm } from '../../components/provider-form';

@Component({
    template: require('./index.html'),
    components: {
        'provider-form': ProviderForm
    }
})
export class ProviderEditPage extends Vue {

    @Getter viewProvider;

    @Action getViewProvider;
    @Action addBreadcrumb;
    @Action addActionBtn;

    item: object = {};
    loading: boolean = true;
    breadcrumb: object[] = [
        { 'id': 1, 'section': 'Компания', 'link': '/settings' },
        { 'id': 2, 'section': 'Справочники', 'link': '/reference' },
        { 'id': 3, 'section': 'Поставщики', 'link': '/reference/provider' }
    ];

    mounted() {
        this.getViewProvider(this.$route.params.id);
        this.addBreadcrumb(this.breadcrumb);
    }

    destroyed() {
        this.addActionBtn([]);
    }

    @Watch('viewProvider')
    onChange(val: object) {
        this.breadcrumb.push({ 'id': 4, 'section': val['name'], 'link': null });
        this.addBreadcrumb(this.breadcrumb);
        this.item = this.viewProvider;
        this.$nextTick(() => this.loading = false);
    }
}