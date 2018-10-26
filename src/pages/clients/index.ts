import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ViewUserName } from '../../components/forms/user-name';
import { NumberPhone } from '../../components/forms/number-phone';

@Component({
    template: require('./index.html'),
    components: {
        'user-name': ViewUserName,
        'phone': NumberPhone
    }
})
export class ClientsPage extends Vue {

    @Getter client;
    @Getter clientSource;
    @Getter pageCount;

    @Action getClientList;
    @Action getClientSourceList;
    @Action filterClient;
    @Action addBreadcrumb;
    @Action addActionBtn;

    loading: boolean = true;

    filter = { 
        'name': '', 
        'phone': '', 
        'source_id': '', 
        'status_id': '',
        'page': 1 
    };

    mounted() {
        this.getClientList(1);
        this.getClientSourceList();

        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Клиенты', 'link': null }
        ]);
        this.addActionBtn([
            { 'id': 1, 'type': 'add', 'title': 'Новый клиент', 'link': '/clients/add', 'icon': 'fa-plus' }
        ]);
    }

    beforeDestroy() {
        this.addActionBtn([]);
    }

    loadPage(val) {
        this.loading = true;
        this.filter['page'] = val;
    }

    onFilter() {
        this.filter['page'] = 1;
        this.filterClient(this.filter);
    }

    goTo(id) {
        this.$router.push('/clients/view/' + id);
    }

    @Watch('client')
    onLoad() {
        window.scroll(0, 0);
        this.$nextTick( () => this.loading = false );
    }

    @Watch('filter.page')
    onChildChanged(val: object, oldVal: object) { 
        this.filterClient(this.filter);
    }

    @Watch('filter.name')
    onNameChanged(val: object, oldVal: object) { 
        this.onFilter();
    }

    @Watch('filter.phone')
    onPhoneChanged(val: object, oldVal: object) { 
        this.onFilter();
    }

    @Watch('filter.status_id')
    onStatusChanged(val: object, oldVal: object) { 
        this.onFilter();
    }

    @Watch('filter.source_id')
    onSourceChanged(val: object, oldVal: object) { 
        this.onFilter();
    }
}