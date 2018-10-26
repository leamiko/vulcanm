import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    template: require('./index.html'),
    props: ['type', 'value']
})

export class Numbers extends Vue {

    getNumber(region, value) {
        const res = new Intl.NumberFormat(region, {
            maximumFractionDigits : 2,
        });
        return res.format(Number(value));
    }

    getMoney(region, currency, value) {
        const res = new Intl.NumberFormat(region, {
            maximumFractionDigits : 2,
            minimumFractionDigits : 2,
            style: 'currency',
            currency: currency
        });
        return res.format(Number(value));
    }
}