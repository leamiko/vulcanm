import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import { UserStatusAdd } from '../../components/user-status-add';

@Component({
    template: require('./index.html'),
    components: {
        'user-status-add': UserStatusAdd
    }
})
export class UserStatusPage extends Vue {

    @Action getUserStatusList;
    @Action changeUserStatus;
    @Action deleteUserStatus;
    @Action addBreadcrumb;

    @Getter userStatus;
    @Getter userStatusPageCount;
    @Getter repairStatus;
    @Getter validStatus;
    @Getter btnloader;

    loading: boolean = true;
    dialogEdit: boolean = false;
    dialogDelete: boolean = false;
    editItem: object = {};

    mounted() {
        this.getUserStatusList(1);
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Пользовательские статусы', 'link': null }
        ]);
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    loadPage(val) {
        this.getUserStatusList(val);
    }

    onDialogEdit(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogEdit = true;
    }

    onDialogDelete(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogDelete = true;
    }

    @Watch('userStatus')
    onChanged() { 
        this.$nextTick(() => this.loading = false );
    }  

    @Watch('validStatus')
    onChange(val: object) { 
        if (Object.keys(val).length === 0) {
            this.dialogEdit = false;
        }
    }  
}