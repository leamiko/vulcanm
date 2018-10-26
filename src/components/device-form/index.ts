import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class DeviceForm extends Vue {

    @Action sendDeviceType;
    @Action sendDeviceVendor;
    @Action sendDeviceModel;    
    @Action changeDeviceType;
    @Action changeDeviceVendor;
    @Action changeDeviceModel;
    
    @Getter deviceTypeList;
    @Getter deviceVendorList;
    @Getter deviceValid;    
    @Getter deviceType;
    @Getter deviceVendor;
    @Getter deviceModel;
    @Getter btnloader;
    

    @Prop({ 'default': () => {} }) item: object;
    @Prop({ 'default': () => 'add' }) typeContent: string;


    dialogAdd: boolean = false;
    popoverType: boolean = false;
    popoverVendor: boolean = false;
    newItem: object = {};
    typeName: string = '';
    vendorName: string = '';
    type: string = 'add';
    elem: string = 'model';

    vendorList: object[] = [];

    mounted() {
        this.$root.$on('onDialog', i => { 
            this.type = i;
            if (i === 'add') { 
                this.elem = 'model';
                this.newItem = {};
                this.typeName = '';
                this.vendorName = '';
            }
            this.dialogAdd = true;
        });
    }

    get inputName() {
        let name: string = '';
        switch (this.elem) {
            case 'type': name = 'Тип'; break;
            case 'vendor': name = 'Производитель'; break;
            case 'model': name = 'Модель'; break;
        }
        return name;
    }

    searchType(queryString, cb) {
        const items = this.deviceTypeList;
        const results = queryString ? items.filter(this.createFilter(queryString)) : items;
        this.popoverType = !results.length && queryString.length ? true : false;
        cb(results);
    }

    searchVendor(queryString, cb) {
        if (queryString.length && this.type === 'edit') {
            this.vendorList = this.deviceTypeList.filter( i => i.id === this.newItem['type_id'])[0]['vendors'];
        }
        let items = this.vendorList;
        const results = queryString ? items.filter(this.createFilter(queryString)) : items;
        this.popoverVendor = !results.length && queryString.length ? true : false;
        cb(results);
    }

    typeSelect(item) {
        this.typeName = item.name;
        this.newItem['type_id'] = item.id;
        this.vendorList = item.vendors;
    }

    vendorSelect(item) {
        this.vendorName = item.name;
        this.newItem['vendor_id'] = item.id;
    }

    createFilter(queryString) {
        return (link) => {
            return (link.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    }

    blurType() {
        const items = this.deviceTypeList,
              query = this.typeName, 
              results = items.filter(i => i.name === query);
        this.popoverType = !results.length && query.length ? true : false;
    }

    add(type) {
        let item: object = {};
        switch (type) {
            case 'type':
                item = { name: this.typeName };
                this.sendDeviceType(item);
                break;
            case 'vendor':
                item = { type_id: this.newItem['type_id'], name: this.vendorName };
                this.sendDeviceVendor(item);
                break;
            case 'model':
                item = { vendor_id: this.newItem['vendor_id'], name: this.newItem['name'] };
                this.sendDeviceModel(item);
                break;
        }
        this.popoverType = false;
        this.popoverVendor = false;
    }

    edit(type) {
        let item: object = {};
        switch (type) {
            case 'type':
                this.changeDeviceType(this.newItem);
                break;
            case 'vendor':
                this.changeDeviceVendor(this.newItem);
                break;
            case 'model':
                this.changeDeviceModel(this.newItem);
                break;
        }
        this.popoverType = false;
        this.popoverVendor = false;
    }

    @Watch('item')
    onChange(val: object) {
        const typelist = JSON.parse(JSON.stringify(this.deviceTypeList));
        this.newItem = {};
        if (val['vendor_id']) {
            const list = typelist.filter( i => {
                    return i['vendors'] = i['vendors'].filter( vendor => vendor.id === val['vendor_id'] );
                }).filter( vendor => vendor['vendors'].length);
            this.newItem['vendor_id'] = val['vendor_id'];
            this.newItem['type_id'] = list[0]['id'];
            this.vendorList = list[0]['vendors'];
            this.vendorName = list[0]['vendors'][0]['name'];
            this.typeName = list[0]['name'];
        } else if (val['type_id']) {
            const list = typelist.filter(i => i.id === val['type_id']);
            this.newItem['type_id'] = val['type_id'];
            this.typeName = list[0]['name'];            
        }
        this.newItem['id'] = val['id'];
        this.newItem['name'] = val['name'];
    }

    @Watch('deviceType')
    onChangeDeviceType(val: object) {
        this.typeSelect(val);
    }

    @Watch('deviceVendor')
    onChangeDeviceVendor(val: object) {
        this.vendorSelect(val);
    }

    @Watch('typeContent')
    onChangeTypeContent(val: string) {
        this.elem = val;
    }

    @Watch('deviceValid')
    onChangeDeviceValid(val: object) {
        this.dialogAdd = false;
    }

}
