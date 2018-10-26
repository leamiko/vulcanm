import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import VueBarcode from 'vue-barcode';
import { PartForm } from '../../components/part-form';
import { PartLog } from '../../components/part-log';

@Component({
    template: require('./index.html'),
    components: {
        'part-form': PartForm,
        'part-log': PartLog,
        'barcode': VueBarcode
    }
})
export class PartEditPage extends Vue {

    @Action addBreadcrumb;
    @Action getViewPart;
    @Action changePart;
    @Action sendPartImage;
    @Action deleteBarcode;
    @Action getBarcode;
    @Action sendBarcode;

    @Getter viewPart;
    @Getter btnloader;

    breadcrumb: object[] = [ { 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Изменение товара', 'link': null }];
    validation: object = {};
    pic: object = {};
    loading: boolean = true;
    dialog: boolean = false;
    barcode: object = {};
    barcodes: object[] = [];
    activeName: string = 'form';

    mounted() {
        this.getViewPart(this.$route.params.id);
        this.addBreadcrumb(this.breadcrumb);
    }

    get newItem() {
        return this.viewPart;
    }

    edit() {     
        this.changePart(this.newItem)
            .then( res => {
                if (Object.keys(this.pic).length) {               
                    let image = {};
                    image['part_id'] = res.data.id;
                    image['file'] = this.pic['file'];
                    this.sendPartImage(image);
                }
                if (this.barcodes.length) {
                    
                        this.checkBarcode();
                    
                } else {
                    this.$router.push('/part');
                }
            })
            .catch( err => this.validation = err.response.data);
    }
    
    async checkBarcode() {
        let i = 0;
        while (i < this.barcodes.length) {
            const item = this.barcodes[i];
            if (item['auto_generated']) {
                console.log('1');
                let res = await this.getBarcode();
                console.log('2');
                await this.addBarcode(res.data);
                i++;
            } else {
                await this.addBarcode(i['value']);
                i++;
            }
            
        }
    }

    async addBarcode(value) {
        console.log('3');
        const newItem: object = { 'part_id': this.viewPart['id'], 'value': value };
        await this.sendBarcode(newItem);
    }

    onDialogDelete(item) {
        this.barcode = item;
        this.dialog = true;
    }

    @Watch('viewPart')
    onLoad(val: object) {
        this.$nextTick( () => this.loading = false );
    }
}