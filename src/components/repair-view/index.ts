import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { OrderView } from './__order';
import { LogsView } from './__logs';
import { CommentView } from './__comment';
import { InfoView } from './__info';
import { ActionsView } from './__actions';
import { PayView } from './__pay';
import { WorksView } from './__works';
import { TotalPaymentView } from './__total-payment';

@Component({
    template: require('./view.html'),
    components: {
        'order': OrderView,
        'logs': LogsView,
        'comment': CommentView,
        'info': InfoView,
        'actions': ActionsView,
        'pay': PayView,
        'works': WorksView,
        'total': TotalPaymentView
    }
})
export class RepairView extends Vue {

    repair: object[] = [
        {
            'id': 1,
            'number': 'Заказ-112',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 1
        },
        {
            'id': 2,
            'number': 'Заказ-104',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 2
        },
        {
            'id': 3,
            'number': 'Заказ-12',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 3
        },
        {
            'id': 4,
            'number': 'Заказ-110',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 4
        },
        {
            'id': 5,
            'number': 'Заказ-96',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 5
        },
        {
            'id': 6,
            'number': 'Заказ-95',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 6
        },
        {
            'id': 7,
            'number': 'Заказ-112',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 1
        },
        {
            'id': 8,
            'number': 'Заказ-112',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 2
        },
        {
            'id': 9,
            'number': 'Заказ-112',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 3
        },
        {
            'id': 10,
            'number': 'Заказ-112',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 4
        },
        {
            'id': 11,
            'number': 'Заказ-112',
            'date': '05.07',
            'client': 'Сазонов Дмитрий',
            'phone': '+7(923)336-80-53',
            'price': '700.00',
            'condition': 'не включается',
            'device': 'Apple MacBook Air 13',
            'kit': 'Ноутбук',
            'status': 5
        },
    ];

    item: object = {};
    comment: boolean = true;
    contentActive: string = 'info';

    beforeMount () {
        this.item = this.repair.find( item => item['id'] === Number(this.$route.params['id']));
    }
}