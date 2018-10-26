import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Mutation, Action } from 'vuex-class';

import { Category } from '../__category';
import { AddPosting } from '../../components/posting-update/add';
import { Numbers } from '../forms/numbers';

@Component({
    template: require('./modal.html'),
    components: {
        'category-tree': Category,
        'part-add': AddPosting,
        'numbers': Numbers
    },
})

export class ModalAddPart extends Vue {

    @Action loadWork;
    @Action getWorkCategory;
    @Action getPartAmount;
    @Action getWorkList;
    @Action getPartCategory;

    @Getter parts;
    @Getter work;
    @Getter categoryList;
    @Getter partPageCount;
    @Getter workPageCount;
    @Getter storages;

    @Prop({'default': () => [] }) newFormParts: object[];
    @Prop({'default': () => [] }) newFormWorks: object[];
    @Prop({'default': () => '' }) titleAdd: string;
    @Prop({'default': () => '' }) titleDel: string;
    @Prop({'default': () => '' }) type: string; 
    @Prop() openDefault: boolean; 

    dialogCatalog: boolean = false;
    dialogPartAdd: boolean = false;
    loadingTable: boolean = true;
    loadingCateg: boolean = true;
    query: string = '';
    tabPosition: string = 'parts';
    data: object[] = [];
    pageCount: number = 1;
    oldStorage: number = 1;

    content: object = {
        'page': 1,
        'query': '',
        'storage_id': 1,
        'category': 1,
        'only_positive': 1,
        'per-page' : 20
    };


    mounted() {
        this.getPartCategory();
        this.changeCategory();
        this.getPartAmount(this.content);
        this.dialogCatalog = this.openDefault;
    }

    addInNewList(val) {
        if (this.tabPosition === 'parts') { 
            this.$root.$emit('addInNewPartList', val);
        } else {
            this.$root.$emit('addInNewWorkList', val);
        }
    }

    delInNewList(val) {
        if (this.tabPosition === 'parts') { 
            this.$root.$emit('delInNewPartList', val);
        } else {
            this.$root.$emit('delInNewWorkList', val);
        }
    }

    search() {
        this.loadingTable = true;
        if (this.tabPosition === 'parts') { 
            this.getPartAmount(this.content);
        } else {
            this.getWorkList(this.content);
        }
    }

    changeCategory() {
        this.$root.$on('categoryItemActive', i => { 
            const val = this.content['category'] === i ? 1 : i;
            this.content['category'] = val;
            this.search();
        });
    }

    changeStorage(val) {
        this.content['storage_id'] = this.oldStorage = val;
        this.search();
    }

    changePage(val) {
        this.content['page'] = val;
        this.search();
    }
    
    changePerPage(val) {        
        this.content['per-page'] = val;
        this.search();
    }
    
    typePerPage(count) {
        return count === this.content['per-page'] ? 'primary' : '';
    }

    checkItemList(item) {
        if (this.tabPosition === 'parts') {
            return this.newFormParts.findIndex( i => i['part_id'] === item['part_id'] && i['storage_id'] === item['storage_id']);
        } else {
            return this.newFormWorks.findIndex( i => i['work_id'] === item['work_id']);
        }
    }

    indexItem(val) {
        const key: string =  val['part_id'] !== undefined ? 'part_id' : 'work_id';
        const index: number = this.data.findIndex(i => i[key] === val[key]) + 1;
        const page: number = this.content['page'] - 1;
        const position: number = page * this.content['per-page'];
        return position + index;
    }

    transformDataPart(data) {
        return data.map( i => {
            const index = this.checkItemList(i);
            if (index >= 0 && i['part'].id === this.newFormParts[index]['part_id']) {
                return this.newFormParts[index];
            } else {
                return { 
                    'part_id': i['part'].id, 
                    'storage_id': this.content['storage_id'], 
                    'name': i['part'].name, 
                    'amount': 1, 
                    'remain': i['amount'],
                    'price': this.type === 'shop' ? i['part']['sell_price'] : i['part']['posting_price']
                };           
            }
        });
    }

    transformDataWork(data) {
        return data.map( i => {
            const index = this.checkItemList(i);
            if (index >= 0 && i.id === this.newFormWorks[index]['id']) {
                return this.newFormWorks[index];
            } else {
                return { 
                    'work_id': i.id, 
                    'name': i.name, 
                    'amount': 1, 
                    'remain': 1,
                    'price': i.sell_price
                };           
            }
        });
    }

    // postingPart() {
    //     return this.parts.map( i => {
    //         const index = this.checkItemList(i);
    //         if (index >= 0 && i['part'].id === this.newForm[index]['part_id']) {
    //             return this.newForm[index];
    //         } else {           
    //             return { 'part_id': i['part'].id, 
    //                      'name': i['part'].name, 
    //                      'remain': i['amount'],
    //                      'amount': 1, 
    //                      'price': i['part'].posting_price === null ? 0 : i['part'].posting_price 
    //                 };
    //         }
    //     });
    // }

    @Watch('content.storage_id')
    onChangeStorage(val: number) {
        // if (this.newFormParts.length > 0 && val !== this.oldStorage) {        
        //     this.$msgbox({
        //         title: '',
        //         message: 'При смене склада будут удалены все товары из ' + this.titleDel + '. Сменить склад?',
        //         confirmButtonText: 'Да',
        //         cancelButtonText: 'Нет',
        //         showCancelButton: true,
        //         type: 'warning',
        //         center: true
        //     }).then(() => {
        //         this.$root.$emit('ClearNewList', val);
        //         this.changeStorage(val);
        //     }).catch(() => {
        //         this.content['storage_id'] = this.oldStorage;
        //     });
        // } else if (val !== this.oldStorage) {
        //     this.$root.$emit('ClearNewList', val);
             this.changeStorage(val);
        // }
    }

    @Watch('query')
    onChangeSearch(val: string) {
        this.content['query'] = val;
        this.search();
    }

    @Watch('parts')
    onLoadPart(val: object[]) {
        this.data = this.transformDataPart(val);
        this.pageCount = this.partPageCount;
        this.$nextTick(() => this.loadingTable = false);
    }

    @Watch('work')
    onLoadWork(val: object[]) {
        this.data = this.transformDataWork(val);
        this.pageCount = this.workPageCount;
        this.$nextTick(() => this.loadingTable = false);
    }

    @Watch('categoryList')
    onLoadCat() {
        this.$nextTick(() => this.loadingCateg = false);
    }

    @Watch('tabPosition')
    onChangeCat(val: string) {
        this.query = '';
        this.loadingCateg = true;
        this.loadingTable = true;
        this.content['page'] = 1;
        this.content['query'] = '';
        this.content['category'] = 1;
        if (val === 'parts') { 
            this.getPartCategory()
            this.getPartAmount(this.content);
        } else {
            this.getWorkCategory();
            this.getWorkList(this.content);
        }
    }



    @Watch('openDefault')
    onChangeActive(val: boolean) {
        this.dialogCatalog = val;
    }
}