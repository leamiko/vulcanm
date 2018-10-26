import {Vue} from 'vue-property-decorator';
import Component from 'vue-class-component';
import ExportProvider from '../../api/providers/export';

@Component({
    template: require('./index.html'),
})

export default class ExportForm extends Vue {

    constructor() {
        super();
        this.model.email = 'test@email.com';
    }

    mounted() {

    }

    public exportList: ExportType[] =  [
        new ExportType(ExportType.EXPORT_REPAIR, 'Заказы'),
        new ExportType(ExportType.EXPORT_PARTS_NOMENKLATURE, 'Номенклатура товаров'),
        new ExportType(ExportType.EXPORT_PARTS_AMOUNT, 'Остатки товаров'),
        new ExportType(ExportType.EXPORT_WORKS, 'Услуги'),
        new ExportType(ExportType.EXPORT_CLIENTS, 'Клиенты'),
        new ExportType(ExportType.EXPORT_CASH, 'Кассовые операции'),
    ];

    model: ExportFormViewModel = new ExportFormViewModel();


    public onSaveExportClick() {
        console.log('Selected export', this.model.exportTypeId, 'to email', this.model.email);
        switch (this.model.exportTypeId) {
            case ExportType.EXPORT_REPAIR:
                ExportProvider.requestRepairExport(this.model.email).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.error(err);
                });
        }
    }
}

class ExportType {
    public static EXPORT_REPAIR = 1;
    public static EXPORT_PARTS_NOMENKLATURE = 2;
    public static EXPORT_PARTS_AMOUNT = 3;
    public static EXPORT_WORKS = 4;
    public static EXPORT_CLIENTS = 5;
    public static EXPORT_CASH = 6;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    id: number;
    name: string;
}

class ExportFormViewModel {
    exportTypeId: number = 1;
    email: string;
}