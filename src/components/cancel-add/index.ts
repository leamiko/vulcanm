import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { ModalAddPart } from '../modal-add-part';
import { CancelForm } from '../forms/cancel';

@Component({
    template: require('./cancel-add.html'),
    components: {
        'modal-add-part': ModalAddPart,
        'cancel-form': CancelForm,
    }
})
export class CancelAdd extends Vue {

    @Action addBreadcrumb;
    @Action getStorageList;
    @Action getStuffList;
    @Action sendCancel;

    @Getter user;
    @Getter stuff;
    @Getter storages;
    @Getter cancelValid;    
    
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Списания', 'link': '/cancel' }, { 'id': 3, 'section': 'Новое списание', 'link': null }];
    newForm: object = {
        'storage_id': 1,
        'penalty_user_id': null,
        'parts': []
    };

    mounted() {
        this.addBreadcrumb(this.breadcrumb);
        this.getStorageList();
        this.getStuffList();
        this.$root.$on('addPostingList', i => this.addTransferList(i));
        this.$root.$on('delPostingList', i => this.delTransferList(i));
        this.$root.$on('AddNewPosting', () => this.addNewCancel(this.newForm));
        this.$root.$on('ClearNewList', i => {
            this.newForm['storage_id'] = i;
            this.newForm['parts'] = [];
        });
    }

    get date() {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date().toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    currentUser(user) {
        const lastName: string = user['last_name'] !== null ? user['last_name'] : '';
        const firstName: string = user['first_name'] !== null ? user['first_name'] : '';
        const middleName: string = user['middle_name'] !== null ? user['middle_name'] : '';
        return lastName + ' ' + firstName + ' ' + middleName;
    }

    addTransferList(item) {
        this.newForm['parts'].push(item);
    }

    delTransferList(item) {
        const index: number = this.newForm['parts'].findIndex(i => i.part_id === item.part_id);
        this.newForm['parts'].splice(index, 1);
    }
    
    addNewCancel(item) {
        const newVal = JSON.parse(JSON.stringify(item));
        newVal.parts.filter( i => { 
            delete i.remain;
            delete i.sum;
        });
        this.sendCancel(newVal);
    }
}