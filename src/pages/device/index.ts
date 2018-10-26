import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { DeviceForm } from '../../components/device-form';
import virtualList from 'vue-virtual-scroll-list';

@Component({
    template: require('./index.html'),
    components: {
        'device-form': DeviceForm,
        'virtual-list': virtualList
    }
})
export class DevicePage extends Vue {

    @Action getDeviceTypeList;
    @Action getDeviceVendorList;
    @Action getDeviceModelList;
    @Action searchDeviceList;
    @Action deleteDeviceType;
    @Action deleteDeviceVendor;
    @Action deleteDeviceModel;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter deviceTypeList;
    @Getter deviceVendorList;
    @Getter deviceModelList;
    @Getter searchTypeList;
    @Getter searchVendorList;
    @Getter searchModelList;

    typeList: object[] = [];
    vendorList: object[] = [];
    modelList: object[] = [];
    scrollVendor: boolean = false;
    scrollModel: boolean = false;
    dialogDelete: boolean = false;
    recursiveDelete: boolean = false;
    loading: boolean = true;
    searchForm: object = {
        'type': '',
        'vendor': '',
        'model': ''
    };
    typeId: number = null;
    vendorId: number = null;
    actionbtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Добавить устройство', 'link': 'onDialog', 'icon': 'fa-plus' }];

    newItem: object = {};
    typeContent: string = '';
    typeDelete: string = '';

    mounted() {
        this.getDeviceTypeList();
        this.addActionBtn(this.actionbtn);
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/reference' },
            { 'id': 2, 'section': 'Справочники', 'link': '/reference' },
            { 'id': 3, 'section': 'Устройства', 'link': null }
        ]);
    }

    get getVendorList() {
        return this.searchForm['vendor'].length || this.searchForm['model'].length ? this.searchVendorList : this.vendorList;
    }

    get getModelList() {
        return this.searchForm['model'].length ? this.searchModelList : this.modelList;
    }

    onDialog(elem, item) {
        this.newItem = item;
        this.typeContent = elem;
        this.$root.$emit('onDialog', 'edit');
    }

    onDialogDelete(type, item) {
        this.newItem = item;
        this.recursiveDelete = false;
        this.typeDelete = type;
        this.dialogDelete = true;
    }

    deleteItem() {
        const item = { 'id': this.newItem['id'], 'recursive': this.recursiveDelete };
        switch (this.typeDelete) {
            case 'type':
                this.deleteDeviceType(item);
                this.vendorList = [];
                this.modelList = [];
                break;
            case 'vendor':
                this.deleteDeviceVendor(item);
                this.modelList = [];
                break;
            case 'model':
                this.deleteDeviceModel(this.newItem['id']);
                break;
        }
        this.dialogDelete = false;
    }

    typeActiveItem(item) {
        // const modelCount: number = this.searchForm['model'].length,
        //       vendorCount: number = this.searchForm['vendor'].length;
        // if (!modelCount && !vendorCount) {
        //     this.typeId = this.typeId === item.id ? null : item.id;
        //     this.vendorList = item.vendors;
        // }
        this.typeId = item.id;
        this.getDeviceVendorList(item.id);
    }

    vendorActiveItem(item) {
        // const modelCount: number = this.searchForm['model'].length;
        // if (!modelCount) {
        //     this.vendorId = this.vendorId === item.id ? null : item.id;
        //     this.modelList = item.devices;
        // }
        this.vendorId = item.id;
        this.getDeviceModelList(item.id);
    }

    query() {
        this.searchDeviceList(this.searchForm);
    }

    heightVendorItem(item) {
        let height: number = this.searchForm['model'].length ? item.devices.length * 38 : 38;
        return height + 'px';
    }

    heightTypeItem(item) {
        const modelCount: number = this.searchForm['model'].length,
              vendorCount: number = this.searchForm['vendor'].length;
        let height: number = 38;
        if (modelCount) {
            height = item.vendors.reduce( (sum, current) => sum += current.devices.length, 0) * 38;
            this.scrollModel = true;
        } else if (vendorCount) {
            height = item.vendors.length * 38;
            this.scrollVendor = true;
        } else {
            this.scrollModel = false;
            this.scrollVendor = false;
        }
        return height + 'px';
    }

    @Watch('searchTypeList')
    onChangeSearchTypeList(val: object[]) {
        this.typeList = this.searchTypeList;
        this.typeId = null;
        this.vendorId = null;
    }

    @Watch('deviceTypeList')
    onChangeDeviceTypeList(val: object[]) {
        this.typeList = val;
        this.$nextTick( () => this.loading = false);
    }

    @Watch('typeId')
    onChangeTypeId(val: number) {
        this.vendorId = null;
        if (val === null) this.vendorList = [];
    }

    @Watch('vendorId')
    onChangeVendorId(val: number) {
        if (val === null) this.modelList = [];
    }
}