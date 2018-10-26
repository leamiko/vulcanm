import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { ModalAddPart } from '../../components/modal-add-part';
import { CancelForm } from '../../components/forms/cancel';

@Component({
    template: require('./index.html'),
    components: {
        'modal-add-part': ModalAddPart,
        'cancel-form': CancelForm
    }
})
export class TransferAddPage extends Vue {
    
    @Action addBreadcrumb;
    @Action loadStorage;
    @Action getStorageList;

    @Getter user;
    @Getter storages;
    @Getter btnloader;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Перемещения между складами', 'link': null }];
    newForm: object = {
        'from_storage_id': 1,
        'to_storage_id': 2,
        'parts': []
    };


    mounted() {
        this.addBreadcrumb(this.breadcrumb);
        this.loadStorage();
        this.$root.$on('addPostingList', i => this.addTransferList(i));
        this.$root.$on('delPostingList', i => this.delTransferList(i));
        this.$root.$on('AddNewPosting', () => this.getStorageList(this.newForm));
        this.$root.$on('ClearNewList', i => {
            this.newForm['from_storage_id'] = i;
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
   
    // oldVal: number = 1;

    // @Watch('newTransferForm.from_storage_id')
    // onChange(val: number) {
    //     if (this.newTransferForm['parts'].length && val !== this.oldVal) {        
    //     this.$msgbox({
    //         title: '',
    //         message: 'При смене склада будут удалены все товары из перемещения. Сменить склад?',
    //         confirmButtonText: 'Да',
    //         cancelButtonText: 'Нет',
    //         showCancelButton: true,
    //         type: 'warning',
    //         center: true
    //       }).then(() => {
    //         this.oldVal = val;
    //         this.newTransferForm['parts'] = [];
    //       }).catch(() => {
    //         this.newTransferForm['from_storage_id'] = this.oldVal;
    //       });
    //     }
    // }
}