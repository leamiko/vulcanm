import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';
import Pie  from '../__chart/Pie';
import ReportProvider from '../../../api/providers/report';

import { ReportRangeDate } from '../__range-date';
import {Numbers} from '../../forms/numbers';
import {ElTable} from '../../../../node_modules/element-ui/types/table';

@Component({
    template: require('./cash.html'),
    components: {
        'chart-pie': Pie,
        'range-date': ReportRangeDate,
        'number': Numbers
    }
})
export class ReportCash extends Vue {

    public $refs: {
        incomesTable: ElTable
        outcomesTable: ElTable
    };

    @Getter cashTypeDefault;
    @Action addBreadcrumb;
    @Action getCashList;
    @Getter cashList;

    dateStart = '';
    dateEnd = '';
    selectedCashboxes: number[] = null;

    incomesData: any[] = [{}];
    outcomesData: any[] = [{}];

    get incomesChartData() {
        return {
            labels: this.incomesData
                .filter((value: any) => { return value.selected === true; })
                .map((item: any) => { return item.name; }),
            datasets: [
                {
                    data: this.incomesData
                        .filter((value: any) => { return value.selected === true; })
                        .map((item: any) => { return item.sum; })
                }
            ]
        };
    }
    get outcomesChartData() {
        return {
            labels: this.outcomesData
                .filter((value: any) => { return value.selected; })
                .map((item: any) => { return item.name; }),
            datasets: [
                {
                    data: this.outcomesData
                        .filter((value: any) => { return value.selected; })
                        .map((item: any) => { return item.sum * -1; })
                }
            ]
        };
    }
    defaultTypes = [];

    mounted() {
        this.getCashList();
        this.defaultTypes = this.cashTypeDefault;
        this.loadData();
    }

    onCashboxChanged() {
        this.loadData();
    }

    onDatesChanged(datesRange) {
        if (datesRange.length === 2) {
            this.dateStart = datesRange[0];
            this.dateEnd = datesRange[1];
        }
        this.loadData();
    }

    onIncomeSelect(selection) {
        for (let i = 0; i < this.incomesData.length; i++) {
            let selected = false;
            for (let j = 0; j < selection.length; j++) {
                if (this.incomesData[i].id === selection[j].id) {
                    selected = true;
                }
            }
            this.incomesData[i].selected = selected;
        }
    }

    onOutcomeSelect(selection) {
        for (let i = 0; i < this.outcomesData.length; i++) {
            let selected = false;
            for (let j = 0; j < selection.length; j++) {
                if (this.outcomesData[i].id === selection[j].id) {
                    selected = true;
                }
            }
            this.outcomesData[i].selected = selected;
        }
    }

    summaryIncomes() {
        let sum = 0;
        this.incomesData.filter((value: any) => { return value.selected; }).forEach((value: any) => { sum += value.sum; });
        return [
            null,
            null,
            (new Numbers).getMoney('ru-RU', 'RUB', sum)
        ];
    }

    summaryOutcomes() {
        let sum = 0;
        this.outcomesData.filter((value: any) => { return value.selected; }).forEach((value: any) => { sum += value.sum; });
        return [
            null,
            null,
            (new Numbers).getMoney('ru-RU', 'RUB', sum)
        ];
    }

    private async loadData() {
        await this.loadReportData();
        for (let i = 0; i < this.incomesData.length; i++) {
            this.$refs.incomesTable.toggleRowSelection(this.incomesData[i], true);
        }
        for (let i = 0; i < this.outcomesData.length; i++) {
            this.$refs.outcomesTable.toggleRowSelection(this.outcomesData[i], true);
        }
    }

    private async loadReportData() {
        const responseData = await ReportProvider.getEconomy(this.dateStart, this.dateEnd, this.selectedCashboxes);
        let incomesResult = [];
        let outcomesResult = [];
        if (responseData.data.items.length > 0) {
            for (let i = 0; i < responseData.data.items.length; i++) {
                let item: any = {};
                item.id = i;
                item.selected = true;
                for (let t = 0; t < this.defaultTypes.length; t++) {
                    if (responseData.data.items[i].type_id === this.defaultTypes[t].id) {
                        item.name = this.defaultTypes[t].name;
                    }
                }
                item.sum = responseData.data.items[i].sum;
                if (item.sum > 0) {
                    incomesResult.push(item);
                } else if (item.sum < 0) {
                    outcomesResult.push(item);
                }
            }
        }
        this.incomesData = incomesResult;
        this.outcomesData = outcomesResult;
    }

}