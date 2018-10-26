import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Vddl from 'vddl';
import draggable from 'vuedraggable';
import { Getter, Mutation, Action } from 'vuex-class';

import { Categories } from '../../store/category/types';

import { Child } from './child';

Vue.use(Vddl);

@Component({
    template: require('./category.html'),
    props: ['categoryList'],
    components: {
        'childTree': Child,
        'draggable': draggable
    }
})

export class Category extends Vue {

    dialogAdd: boolean = false;
    dialogEdit: boolean = false;
    dialogDelete: boolean = false;

    itemActive: number = 1;
    paddingItem: number = 10;
    category: object[] = [];
    categories: object[] = [];
    dataQuery: string = '';

    mounted () {
        // this.$root.$on('dialogEditCategory', i => {
        //     this.dialogEdit = true;
        //     this.item['id'] = i['key'];
        //     this.item['title'] = i['title'];
        //     this.item['parent_id'] = i['parent_id'];
        // });
        // this.$root.$on('dialogAddCategory', i => {
        //     this.dialogAdd = true;
        //     this.item['id'] = i['key'];
        //     this.item['title'] = '';
        // });
        // this.$root.$on('dialogDeleteCategory', i => {
        //     this.dialogDelete = true;
        //     this.item['id'] = i['key'];
        //     this.item['title'] = i['title'];
        //     this.item['parent_id'] = i['parent_id'];
        // });
        this.$root.$on('categoryItemActive', i => { 
            this.itemActive === i ? this.itemActive = 1 : this.itemActive = i; 
        });
    }

    searchCategory(value, text) {
        let searchList = [];
        value.forEach( (item, i, value) => {
            if (item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                searchList.push(item);
            } else if (item.children.length) {
                let childItem = this.searchCategory(item.children, text);
                let parentItem = {};
                if (childItem.length) {
                    for (let key in item) {
                        switch (key) {
                            case 'expanded':
                                parentItem[key] = true;
                                break;
                            case 'children':
                                parentItem[key] = childItem;
                                break;                       
                            default:
                                parentItem[key] = item[key];
                                break;
                        }
                    }
                    searchList.push(parentItem);
                }
            }
        });
        return searchList;
    }

    // @Watch('dataQuery') 
    // onSearch(val: string) {
    //     this.categories = this.searchCategory(this.categoryList, val);
    // }

    @Watch('categoryList')
    onChange(val: object[]) {
        this.categories = val;
    }

}