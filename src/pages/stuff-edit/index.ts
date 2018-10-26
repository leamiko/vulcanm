import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { StuffForm } from '../../components/stuff-form';

@Component({
    template: require('./index.html'),
    components: {
        'stuff-form': StuffForm
    }
})
export class StuffEditPage extends Vue {

    @Action addBreadcrumb;
    @Action getViewStuff;

    @Getter viewStuff;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Компания', 'link': '/settings' }, { 'id': 2, 'section': 'Сотрудники', 'link': '/stuff' }, { 'id': 3, 'section': 'Изменение', 'link': null }];
    loading: boolean = true;

    mounted() {
        this.getViewStuff(this.$route.params.id);
        this.addBreadcrumb(this.breadcrumb);        
    }

    get view() {
        return this.viewStuff;
    }

    @Watch('viewStuff')
    onLoad(val: object) {
        this.$nextTick( () => this.loading = false );
    }
}