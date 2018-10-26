import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator';
import Bar from '../report/__chart/Bar';
import Line from '../report/__chart/Line';
import PartProvider from '../../api/providers/part';
import { ViewDate } from '../forms/date';

@Component({
    name: 'log',
    template: require('./index.html'),
    components: {
        'chart-bar': Bar,
        'chart-line': Line,
        'view-date': ViewDate
    }
})

export class PartLogTable extends Vue {
    
    @Prop() storageId: number;

    tableData;
    totalPages: number;
    
    data() {
        return {
            tableData: this.tableData,
            totalPages: this.totalPages
        };
    }

    lineChartId() {
        return 'line-chart-' + this.storageId;
    }
    barChartId() {
        return 'bar-chart-' + this.storageId;
    }

    mapLineChartData() {
        let grouppedData = [];
        if (this.tableData === undefined || this.tableData.length === 0) {
            return null;
        }
        let data = this.tableData.map(x => x).reverse();
        data.forEach(element => {
            let updated: boolean = false;
            const date = new Date(element.datetime * 1000);
            grouppedData.forEach((group) => {
                if (!updated && group.name === date.toLocaleDateString()) {
                    group.total = element.total;
                    updated = true;
                }
            });
            if (!updated) {
                grouppedData.push({
                    name: date.toLocaleDateString(),
                    total: element.total
                });
            }
        });

        let days = grouppedData.map((item) => item.name);
        let total = grouppedData.map((item) => item.total);
        

        return {
            labels: days,
            datasets: [
              {
                borderColor: 'green',
                pointBackgroundColor: 'white',
                borderWidth: 2,
                radius: 5,
                pointBorderColor: 'green',
                pointBorderWidth: 1,
                backgroundColor: 'green',
                data: total
              }
            ]
        };
    }

    mapBarChartData() {
        let grouppedData = [];
        if (this.tableData === undefined || this.tableData.length === 0) {
            return null;
        }
        this.tableData.map(x => x).reverse().forEach(element => {
            const date = new Date(element.datetime * 1000);
            let updated: boolean = false;
            grouppedData.forEach((group) => {
                if (!updated && group.name === date.toLocaleDateString()) {
                    group.change += element.change;
                    updated = true;
                }
            });
            if (!updated) {
                grouppedData.push({
                    name: date.toLocaleDateString(),
                    change: element.change
                });
            }
        });

        let days = grouppedData.map((item) => item.name);
        let changes = grouppedData.map((item) => item.change);
        let backgroundColors = grouppedData.map((item) => item.change > 0 ? 'green' : 'red');
        return {
            labels: days,
            datasets: [
              {
                backgroundColor: backgroundColors,
                data: changes
              }
            ]
        };
    }

    mounted() {
        this.loadPage(1);
    }

    async loadPage(val) {
        const item: object = { part: this.$route.params.id, storage: this.storageId, page: val };
        try {
            let logData = await PartProvider.getPartLogList(item);
            this.tableData = logData.data.sort((a, b) => b.datetime - a.datetime);
            this.totalPages = logData.pageCount;
        }catch (err) {
            throw err;
        }
    }

}