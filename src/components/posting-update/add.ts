import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ModalAddPart } from '../../components/modal-add-part';


@Component({
    template: require('./add_posting.html'),
    components: {
        'modal-add-part': ModalAddPart,
    }
})

export class AddPosting extends Vue {

    @Action addBreadcrumb;
    @Action sendPosting;
    @Action getStorageList;
    @Action getProviderList;

    @Getter storages;
    @Getter provider;
    @Getter user;
    @Getter postingValid;
    @Getter btnloader;

    newPostingForm: object = {
        'storage_id': 1,
        'provider_id': '',
        'cash_id': '',
        'parts': [],
        'update_prices': false
    };
    breadcrumb: object[] = [
        { 'id': 1, 'section': 'Склад', 'link': '/part' },
        { 'id': 2, 'section': 'Поступления на склад', 'link': '/part/posting' },
        { 'id': 3, 'section': 'Новое поступление', 'link': null }
    ];
    
    mounted() {
        document.title = 'Поступления на склад';
        this.getStorageList();
        this.getProviderList();
        this.addBreadcrumb(this.breadcrumb);
        this.addNewPartItem();
        this.$root.$on('addPostingList', i => this.addPostingList(i));
        this.$root.$on('deletePostingList', i => this.deletePostingList(i));
    }

    get currentUser() {
        const lastName: string = this.user['last_name'] !== null ? this.user['last_name'] : '';
        const firstName: string = this.user['first_name'] !== null ? this.user['first_name'] : '';
        const middleName: string = this.user['middle_name'] !== null ? this.user['middle_name'] : '';
        return lastName + ' ' + firstName + ' ' + middleName;
    }

    get date() {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date().toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    addNewPartItem() {
        this.$root.$on('AddNewPartItem', i => {
            const item = { 'part_id': i.id, 'name': i.name, 'amount': 1, 'price': i.posting_price === null ? 0 : i.posting_price, };
            this.addPostingList(item);
        });
    }

    send() {
        console.log(this.newPostingForm);
        this.sendPosting(this.newPostingForm);
    }

    addPostingList(item) {
        this.newPostingForm['parts'].push(item);
    }

    deletePostingList(item) {
        const index: number = this.newPostingForm['parts'].findIndex(i => i.part_id === item.part_id);
        this.newPostingForm['parts'].splice(index, 1);
    }
}