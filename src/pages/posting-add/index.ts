import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ViewDate } from '../../components/forms/date';
import { ViewUserName } from '../../components/forms/user-name';
import { Numbers } from '../../components/forms/numbers';
import { PostingItem } from '../../components/posting-item';
import { ModalCatalog } from '../../components/modal-catalog';

@Component({
    template: require('./index.html'),
    components: {
        'date': ViewDate,
        'user-name': ViewUserName,
        'numbers': Numbers,
        'posting-item': PostingItem,
        'modal-catalog': ModalCatalog
    }
})
export class PostingAddPage extends Vue {

    @Action getCashList;
    @Action getProviderList;
    @Action getStorageList;
    @Action sendPosting;
    @Action addBreadcrumb;

    @Getter user;
    @Getter postingNewItemList;
    @Getter storages;
    @Getter provider;
    @Getter cashList;
    @Getter btnloader;

    newForm: object = { 'storage_id': 1, 'parts': [] };
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Поступления на склад', 'link': '/part/posting' }, { 'id': 3, 'section': 'Новое поступление', 'link': null }];

    mounted() {
        this.getCashList(1);
        this.getProviderList(1);
        this.getStorageList(1);
        this.addBreadcrumb(this.breadcrumb);
    }

    get sum() {
        return this.newForm['parts'].reduce((sum, current) => sum += current['price'] * current['amount'], 0);
    }

    @Watch('postingNewItemList')
    onChangeItem(val: object[]) {
        this.newForm['parts'] = val;
    }
}


