import Component from 'vue-class-component';
import Vue from 'vue';
import ExportProvider from '../../api/providers/export';

@Component({
    template: require('./export-log.html'),
    components: {

    }
})
export class ExportLog extends Vue {
    tableData: ExportLogItemViewModel[] = [];
    page: number = 1;
    totalPages: number = 0;

    mounted() {
        ExportProvider.getExportList(this.page).then((response) => {
            this.buildTableData(response);
        });
    }

    private buildTableData(response) {
        this.totalPages = response.pageCount;
        response.data.forEach((item) => {
            this.tableData.push(
                new ExportLogItemViewModel(
                    'test',
                    'testExportName',
                    'testCreator',
                    item.email,
                    1)
            );
        });
    }
}

class ExportLogItemViewModel {

    private static STATUS_CREATED = 1;
    private static STATUS_IN_PROGRESS = 2;
    private static STATUS_DONE = 3;
    private static STATUS_FAILED = 4;
    private static STATUS_CANCELLED = 5;
    private static STATUS_SEND_ERROR = 6;

    constructor(date: string, exportName: string, creatorName: string, email: string, statusId: number) {
        this.date = date;
        this.exportName = exportName;
        this.creatorName = creatorName;
        this.email = email;
        switch (statusId) {
            case ExportLogItemViewModel.STATUS_CREATED:
                this.statusName = 'Создан';
                break;
            case ExportLogItemViewModel.STATUS_IN_PROGRESS:
                this.statusName = 'В работе';
                break;
            case ExportLogItemViewModel.STATUS_DONE:
                this.statusName = 'Выполнен';
                break;
            case ExportLogItemViewModel.STATUS_FAILED:
                this.statusName = 'Завешен с ошибкой';
                break;
            case ExportLogItemViewModel.STATUS_CANCELLED:
                this.statusName = 'Отменен';
                break;
            case ExportLogItemViewModel.STATUS_SEND_ERROR:
                this.statusName = 'Ошибка отправки';
                break;
            default:
                this.statusName = '(не определено)';
        }
    }

    public date: string;
    public exportName: string;
    public creatorName: string;
    public email: string;
    public statusName: string;
}