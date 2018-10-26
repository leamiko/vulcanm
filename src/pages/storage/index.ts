import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { StorageAdd } from '../../components/storage-add';
import { SettingsStorage } from '../../components/settings-storage';

@Component({
    template: require('./index.html'),
    components: {
        'storage-add': StorageAdd,
        'settings-storage': SettingsStorage
    }
})
export class StoragePage extends Vue {

    @Action getStorageList;
    @Action getPointList;
    @Action changeStorage;
    @Action deleteStorage;
    @Action addBreadcrumb;

    @Getter storages;
    @Getter validStorage;
    @Getter point;
    @Getter btnloader;
    @Getter pageStorCount;

    page: number = 1;
    dialogEdit: boolean = false;
    dialogDelete: boolean = false;
    editItem: object = { 'id': null, 'name': '', 'point_id': null };
    loading: boolean = true;

    mounted() {
        this.getStorageList(1);
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Склады', 'link': null }
        ]);
    }

    loadPage(val) {
        this.getStorageList(val);
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    onDialogEdit(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogEdit = !this.dialogEdit;
    }

    onDialogDelete(item) {
        this.editItem = JSON.parse(JSON.stringify(item));
        this.dialogDelete = !this.dialogDelete;
    }

    @Watch('storages')
    onChanged() { 
        this.$nextTick(() => this.loading = false );
    }
    
    @Watch('validStorage')
    onChange(val: object) {
        if (Object.keys(val).length === 0) {
            this.dialogEdit = false;
        }
    }
}