import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    template: require('./transfers.html')
})
export class RepairTransfers extends Vue {

    transfers: [
        {}
    ];

    filterStatus: object[] = [
        { 'id': '1', 'name': 'dsg' }
    ];

    page = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    status = [
        { 'id': 1, 'name': 'Создано'},
        { 'id': 2, 'name': 'Отправленно'},
        { 'id': 3, 'name': 'Получено'},
        { 'id': 4, 'name': 'Отменено'},
    ];

    sotrudnik = [
        { 'id': 1, 'name': 'Гарбарчук А.С.'}
    ];

    sklad = [
        { 'id': 1, 'name': 'Первый сервис'}
    ];
}