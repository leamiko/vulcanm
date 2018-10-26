import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { SmsTemplatesForm } from '../../components/sms-templates-form';
import { Iphone } from '../../components/iphone';

@Component({
    template: require('./index.html'),
    components: {
        'sms-form': SmsTemplatesForm,
        'iphone': Iphone,
    }
})
export class SmsTemplatesPage extends Vue {

    @Getter smsTemplate;
    @Getter btnloader;

    @Action getSmsTemplateList;
    @Action changeSmsTemplate;
    @Action addBreadcrumb;

    sms1: string = '';
    sms2: string = '';
    sms3: string = '';
    sms4: string = '';
    sender: string = 'SERV-CENR';
    sms: object = [];
    loading: boolean = true;

    beforeMount () {
        this.getSmsTemplateList();
    }

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Шаблоны смс', 'link': null }
        ]);
        this.$root.$on('Sms-Template', value => {
            this.sms[value.key + '_template'] = value.template;
            this['sms' + value['id']] = value['text'];
        });
    }

    @Watch('smsTemplate')
    onLoad(val: object) {
        this.sms = val;
        this.$nextTick(() => this.loading = false );
    }


}