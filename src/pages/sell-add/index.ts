import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Numbers } from '../../components/forms/numbers';
import { ViewDate } from '../../components/forms/date';
import { ViewUserName } from '../../components/forms/user-name';
import { ModalAddPart } from '../../components/modal-add-part';
import { CancelForm } from '../../components/forms/cancel';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'date': ViewDate,
        'user-name': ViewUserName,
        'modal-add-part': ModalAddPart,
        'cancel-form': CancelForm
    }
})
export class SellAddPage extends Vue {

    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action getVatList;
    @Action getStorageList;
    @Action getStuffList;
    @Action getClientList;
    @Action sellCreate;
    @Action sellAddPart;
    @Action sellAddWork;
    @Action sellDelPart;
    @Action sellDelWork;
    @Action sellView;
    @Action sellApply;
    @Action sellDelete;
    @Action sellAddPayment;
    

    @Getter stuff;
    @Getter user;
    @Getter client;
    @Getter viewSell;
    @Getter sellPart;
    @Getter sellWork;
    @Getter sellPartList;
    @Getter sellWorkList;
    @Getter sellDataList;
    @Getter sellPaymentList;
    @Getter vatlist;
    @Getter btnloader;
    

    loading: boolean = true;
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Магазин', 'link': '/sell' }, { 'id': 2, 'section': '', 'link': null }];
    newItem: object = {};
    newForm: object = {
        'client_id': null,
        'seller_id': null,
        'parts': [],
        'works': [],
        'payments': [],
        'discounts': [],
    };
    data: object[] = [];
    pay: object = {
        'sell_id': null,
        'sum': 0,
        'cash_id': 1,
        'user_id': null
    };
    titlePage: string = '';
    modalActive: boolean = false;

    partList: object[] = [];
    workList: object[] = [];

    mounted() {
        this.modalActive = this.page ? true : false;
        this.pageName();
        this.getStorageList();
        this.getStuffList();
        this.getClientList();
        this.addInNewPartList();
        this.addInNewWorkList();
        this.delInNewPartList();
        this.getVatList();
    }

    destroyed() {
        this.$root.$off('addInNewPartList');
        this.$root.$off('addInNewWorkList');
        this.$root.$off('delInNewPartList');
    }
    
    get page() {
        return this.$route.name === 'sell-add' ? true : false;
    }

    get partCount() {
        return this.page ? 0 : this.sellPartList.length;
    }

    get workCount() {
        return this.page ? 0 : this.sellWorkList.length;
    }

    get partSum() {
        return this.page ? 0 : this.sellPartList.reduce( (sum, i) => sum + (i.price * i.amount), 0);
    }

    get workSum() {
        return this.page ? 0 : this.sellWorkList.reduce( (sum, i) => sum + (i.price * i.amount), 0);
    }

    get vatSum() {
        return this.page ? 0 : this.sellDataList.reduce( (sum, i) => {
                switch (i.vat) {
                    case 1:
                    case 2: return sum + 0;
                    case 3: return sum + (i.price / 1.1 * 0.1 * i.amount);
                    case 4: return sum + (i.price / 1.18 * 0.18 * i.amount);
                    case 5: return sum + (i.price * 0.1 * i.amount);
                    case 6: return sum + (i.price * 0.18 * i.amount);
                }
            }, 0);
    }

    get vatSumPlus() {
        return this.page ? 0 : this.sellDataList.reduce( (sum, i) => {
                switch (i.vat) {
                    case 1:
                    case 2: 
                    case 3: 
                    case 4: return sum + (i.price * i.amount);
                    case 5: return sum + (i.price * 1.1 * i.amount);
                    case 6: return sum + (i.price * 1.18 * i.amount);
                }
            }, 0);
    }

    get saleSum() {
        return this.vatSumPlus;
    }

    get totalSum() {
        const total: number = this.sellPaymentList.reduce( (sum, i) => sum + i.sum, 0);
        return this.page ? 0 : this.pay['sum'] = this.saleSum - total;
    }

    pageName() {
        if (this.page) {
            this.titlePage = 'Новая продажа';
            this.data = [];
            this.partList = [];
            this.workList = [];
        } else {
            this.titlePage = 'Продажа №' + this.$route.params.id;
            this.data = this.sellDataList;
            this.partList = this.sellPartList;
            this.workList = this.sellWorkList;
            this.sellView(this.$route.params.id);
        }
        document.title = this.breadcrumb[1]['section'] = this.titlePage;
        this.addBreadcrumb(this.breadcrumb);
    }


    addInNewPartList() {
        this.$root.$on('addInNewPartList', i => {
            if (this.page) {
                this.newForm['parts'][0] = i;
                this.sellCreate(this.newForm);
            } 
            if (!this.page) { 
                i['sell_id'] = this.$route.params.id;
                this.sellAddPart(i); 
            }
        });
    }

    addInNewWorkList() {
        this.$root.$on('addInNewWorkList', i => {
            if (this.page) {
                this.newForm['works'][0] = i;
                this.sellCreate(this.newForm);
            } else { 
                i['sell_id'] = this.$route.params.id;
                this.sellAddWork(i); 
            }
        });
    }

    delInNewPartList() {
        this.$root.$on('delInNewPartList', i => {
            const type = i['part_id'] !== undefined;
            type ? this.sellDelPart(i['id']) : this.sellDelWork(i['id']);
        });
    }

    @Watch('user')
    onLoadUser(val: object) {
        this.newForm['seller_id'] = val['id'];
    }

    @Watch('viewSell')
    onChange(val: object) {
        if (this.page) {
            this.$router.push('/sell/view/' + val['id']);
        } else {
            this.newForm['seller_id'] = JSON.parse(JSON.stringify(val['seller_id']));
            this.pay['user_id'] = JSON.parse(JSON.stringify(val['seller_id'])); 
            this.pay['sell_id'] = JSON.parse(JSON.stringify(val['id'])); 
        }
    }

    @Watch('$route.name')
    onChangeName(val: string) {
        this.pageName();
    }

    @Watch('sellDataList')
    onAddNew(val: object[]) {
        this.data = val;
        this.partList = this.sellPartList;
        this.workList = this.sellWorkList;
    }


}