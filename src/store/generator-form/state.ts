
export const state = {
    form: [
        { 'id': 1, 'type': 'text', 'label': 'Серийный номер', 'required': false},
        { 'id': 2, 'type': 'text', 'label': 'IMEI', 'required': false},
        { 'id': 3, 'type': 'checkbox', 'label': 'Срочный', 'required': false},
        { 'id': 4, 'type': 'checkbox', 'label': 'Тех. обслуживание', 'required': false},
        { 'id': 5, 'type': 'text', 'label': 'Ожидаемая стоимость ремонта', 'required': false},
        { 'id': 6, 'type': 'date', 'label': 'Ожидаемая дата готовности', 'required': true},
        { 'id': 7, 'type': 'textarea', 'label': 'Комплектация', 'required': true},
        { 'id': 8, 'type': 'checkbox', 'label': 'Гарантийный', 'required': false},
        { 'id': 9, 'type': 'text', 'label': 'Предоплата', 'required': false},
        { 'id': 10, 'type': 'select', 'label': 'Инженер', 'required': true},
        { 'id': 11, 'type': 'checkbox', 'label': 'Отправить инженеру SMS', 'required': false},
        { 'id': 12, 'type': 'checkbox', 'label': 'Выездной ремонт', 'required': false},
        { 'id': 13, 'type': 'textarea', 'label': 'Заметки при приеме', 'required': false},
        { 'id': 14, 'type': 'textarea', 'label': 'Состояние', 'required': false},
        { 'id': 15, 'type': 'textarea', 'label': 'Состояние1', 'required': false},
        { 'id': 16, 'type': 'textarea', 'label': 'Состояние2', 'required': true},
        { 'id': 1001, 'type': 'date', 'label': 'Дата', 'required': true },
        { 'id': 1002, 'type': 'number', 'label': 'trtydfghy', 'required': true },
        { 'id': 1003, 'type': 'number', 'label': 'dwdwd', 'required': false },
        { 'id': 1004, 'type': 'text', 'label': 'd', 'required': false },
        { 'id': 1005, 'type': 'checkbox', 'label': 'Мгновенный ремонт', 'required': false },
        { 'id': 1006, 'type': 'text', 'label': 'Ggh', 'required': true },
        { 'id': 1007, 'type': 'checkbox', 'label': 'fdfdf', 'required': true },
        { 'id': 1008, 'type': 'checkbox', 'label': 'вавав', 'required': true },
        { 'id': 1009, 'type': 'text', 'label': 'dwd', 'required': true }
    ],

    positionForm: {
        '1': [1, 1001],
        '2': [2],
        '3': [1002, 1003, 1004, 3, 4, 5, 6],
        '4': [1005, 7, 8, 9, 10, 11]
    },

    posFormCart: {
        '1': [1, 1001],
        '2': [2],
        '3': [1002, 1003, 1004, 3, 4, 5, 6],
        '4': [1005, 7, 8, 9, 10, 11]
    },

    newForm: {
        'id': null,
        'label': null,
        'type': null,
        'required': false
    }

};