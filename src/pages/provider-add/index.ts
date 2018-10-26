import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ProviderForm } from '../../components/provider-form';

@Component({
    template: require('./index.html'),
    components: {
        'provider-form': ProviderForm
    }
})
export class ProviderAddPage extends Vue {

    @Action addBreadcrumb;

    item: object = {};

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Справочники', 'link': '/reference' },
            { 'id': 3, 'section': 'Поставщики', 'link': '/reference/provider' },
            { 'id': 4, 'section': 'Новый поставщик', 'link': null }
        ]);
    }

}