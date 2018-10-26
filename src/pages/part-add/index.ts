import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { PartForm } from '../../components/part-form';

@Component({
    template: require('./index.html'),
    components: {
        'part-form': PartForm
    }
})
export class PartAddPage extends Vue {

    @Action addBreadcrumb;
    @Action sendPart;
    @Action sendPartImage;

    @Getter btnloader;

    breadcrumb: object[] = [ { 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Добавление запчасти (товара)', 'link': null }];
    newItem: object = { 
        'cat_id': 1,
        'vat': 1,
        'sell_reward_type' : 1,
        'repair_reward_type' : 1,
        'warrant_type' : 1,
        'barcodes': []
    };
    validation: object = {};
    pic: object = {};
    barcodes: object[] = [];

    mounted() {
        this.addBreadcrumb(this.breadcrumb);
    }

    add() {     
        this.sendPart(this.newItem)
            .then( res => {
                let image = {};
                image['part_id'] = res.data.id;
                image['file'] = this.pic['file'];
                this.sendPartImage(image);
                this.$router.push('/part');
            })
            .catch( err => this.validation = err.response.data);
    }
}