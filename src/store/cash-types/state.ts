import { StateCashTypes } from './types';

export const state = {
    cashTypeUser: [],
    cashTypeDefault: [
        { 'id': 1, 'name': 'Внесение', 'increase': true },
        { 'id': 2, 'name': 'Перевод из другой кассы', 'increase': true },
        { 'id': 3,  'name': 'Оплата заказа', 'increase': true },
        { 'id': 4,  'name': 'Продажа', 'increase': true },
        { 'id': 5,  'name': 'Предоплата по заказу', 'increase': true },
        { 'id': 6,  'name': 'Пополнение баланса клиента', 'increase': true },
        { 'id': 7,  'name': 'Изъятие', 'increase': false },
        { 'id': 8,  'name': 'Перевод в другую кассу', 'increase': false },
        { 'id': 9,  'name': 'Возврат продажи', 'increase': false },
        { 'id': 10,  'name': 'Оплата поставщику', 'increase': false },
        { 'id': 11,  'name': 'Возврат клиенту', 'increase': false },
        { 'id': 12,  'name': 'Выплата ЗП', 'increase': false },
        { 'id': 13,  'name': 'Возврат в заказе', 'increase': false }
    ],
    cashTypeValid: {},
    cashTypePageCount: null,
    cashTypePageCurrent: null
};