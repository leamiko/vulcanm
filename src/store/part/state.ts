
export const state = {
    parts: [],
    logs: [],
    logsPageCount: null,
    logsPageCurrent: null,
    viewPart: {},
    partPageCurrent: null,
    partPageCount: null,
    partAmountControl: null,
    vatlist: [],
    warrantTypeList: [],
    rewardTypeList: [],
    barcode: '',
    barcodeList: [],
    validPart: {},
    headPart: { 'number': true,
                'name': true,
                'price': [
                    { 'name': 'posting', 'title': 'Закуп', 'active': true },
                    { 'name': 'repair', 'title': 'Ремонт', 'active': true },
                    { 'name': 'shop', 'title': 'Продажа', 'active': true }
                ], 
                'amounts': []
            },
    headNomenkl: {
        'number': true,
        'name': true,
        'price': [ 
            { 'name': 'repair', 'title': 'Ремонт', 'active': true },
            { 'name': 'shop', 'title': 'Продажа', 'active': true }
        ],
        'reward': [ 
            { 'name': 'repair', 'title': 'Ремонт', 'active': true },
            { 'name': 'shop', 'title': 'Продажа', 'active': true }
        ],
        'barcode': true,
        'article': true,
        'vat': true
    },
};