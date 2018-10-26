import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
    template: require('./buy-sms.html'),
})
export class BuySms extends Vue {

    smsCheck: number = 500;
    bankCheck: string = 'all';

}