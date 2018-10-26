import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { ModalAddPart } from '../modal-add-part';
import { CancelForm } from '../forms/cancel';

@Component({
    template: require('./view.html'),
    components: {
        'modal-add-part': ModalAddPart,
        'cancel-form': CancelForm,
    }
})
export class CancelView extends Vue {

    @Action addBreadcrumb;
    @Action getCancelView;    
    @Action sendRevertPart;    
    @Action sendRevert;    

    @Getter cancelView;    
    @Getter cancelValid; 
    
    loading: boolean = true;    
    dialog: boolean = false;    
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Списания', 'link': '/cancel' }, { 'id': 3, 'section': 'Списание №', 'link': null }];
    delItem: object = {};
    cancelItemForm: object = {'cancel_part_id': null, 'amount': 1};

    mounted() {
        this.breadcrumb[2]['section'] += this.$route.params.id;
        this.getCancelView(this.$route.params.id);
        this.addBreadcrumb(this.breadcrumb);
        this.$root.$on('delPostingList', i => this.onDialogDelete(i));
        this.$root.$on('delAllCancel', () => { this.delCancel(); });
    }

    parts(val) {
        if (val.parts !== undefined) {
            return val.parts.map( i => {       
                return { 'part_id': i.id, 
                         'name': i.part.name, 
                         'amount': i.amount, 
                         'price': i.price 
                       };
            });
        } else {
            return [];
        }
    }

    date(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    currentUser(user) {
        if (user !== undefined && user !== null) {
            const lastName: string = user['last_name'] !== null  ? user['last_name'] : '';
            const firstName: string = user['first_name'] !== null ? user['first_name'] : '';
            const middleName: string = user['middle_name'] !== null ? user['middle_name'] : '';
            return lastName + ' ' + firstName + ' ' + middleName;
        } else {
            return false;
        }
    }

    onDialogDelete(item) {
        this.cancelItemForm['cancel_part_id'] = item.part_id; 
        this.delItem = item;
        this.dialog = true;
    }

    delCancel() {
        const id: number = Number(this.$route.params.id);
        const item: object = { 'cancel_id': id };
        this.sendRevert(item);
    }
    
    newRevertPart(item) {
        this.sendRevertPart(item);
        this.dialog = false;
    }

    @Watch('cancelView')
    onLoad() {
        this.$nextTick(() => this.loading = false);
    }
}