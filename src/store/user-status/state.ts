
export const state = {
    userStatusPageCount: null,
    repairStatus: [
        { 'id': 1, 'label': 'Принято'},
        { 'id': 2, 'label': 'В работе'},
        { 'id': 3, 'label': 'Ожидает'},
        { 'id': 4, 'label': 'Готово'},
        { 'id': 5, 'label': 'Выдано'},
        { 'id': 6, 'label': 'На согласовании'},
    ],

    userStatus: [],
    validStatus: [],

    repairsSetting: {
        'deadline': 5,
        'orderTimeDefault': 5,
        'warrantyDefault': 180,
        'surcharge': null,
        'cartridge': true,
        'autoCreateNomenkl': true,
        'autoCreateService': true,
        'moving': 2
    }

};