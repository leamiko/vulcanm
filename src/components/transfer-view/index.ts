import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

@Component({
    template: require('./index.html'),
})
export class TransferView extends Vue {

    @Action getViewTransfer;

    @Getter viewTransfer;

    loading: boolean = true;

    @Prop() id: number;

    mounted() {
        this.getViewTransfer(this.id);
    }

    date(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    get view() {
        return new Array(this.viewTransfer);
    }

    currentUser(user) {
        if (user !== undefined) {
            const lastName: string = user['last_name'] !== null ? user['last_name'] : '';
            const firstName: string = user['first_name'] !== null ? user['first_name'] : '';
            return lastName + ' ' + firstName;
        }
    }

    currentName(val) {
        if (val !== undefined) {
            return val.name !== null ? val.name : '';
        }
    }


    @Watch('viewTransfer')
    onLoad() {
        this.$nextTick(() => setTimeout(() => this.loading = false, 200));
    }

}