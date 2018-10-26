import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { RepairContent } from './__all';
import { Action, Getter} from 'vuex-class';

import { setInterval } from 'timers';

@Component({
    template: require('./repair.html'),
    components: {
        'repair-content': RepairContent
    }
})
export class Repair extends Vue {

    @Getter repair;
    @Getter btnloader;
    @Getter pageCountRepair;
    @Getter pageCurrentRepair;

    @Getter repairAllColumn;
    @Getter repairActiveColumn;

    @Action getRepairList;
    @Action getRepairPage;
    @Action addBreadcrumb;
    @Action addRepairActiveColumn;

    content: object[] = [];
    active: number = 0;
    scrollActive: boolean = true;
    dialogSettings: boolean = false;
    activeColumn: object[] = [];
    noActiveColumn: object[] = [];

    beforeMount() {
        this.getRepairList();
        this.activeColumn = this.repairActiveColumn.filter( i => i);
        this.noActiveColumn = this.repairAllColumn.filter( i => i);
    }

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Ремонт', 'link': '/repair' },
            { 'id': 2, 'section': 'Текущие заказы в сервисе', 'link': null }
        ]);

        const listElm = document.querySelector('.el-table__body-wrapper');
        listElm.addEventListener('scroll', e => {
            if ( (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight - 400) && this.scrollActive) {
                const nextPage: number = Number(this.pageCurrentRepair) + 1;
                console.log(nextPage);
                console.log(this.pageCurrentRepair);
                this.getRepairPage(nextPage);
                this.scrollActive = false;
            }
        });
    }

    changeColumn(item) {
        this.addRepairActiveColumn(item);
    }

    sortNum() {
        this.repair.sort();
    }

    onViewPart(val) {
        this.$router.push('/repair/view/' + val.id);
    }

    @Watch('repair')
    onChange() {
        if (this.pageCountRepair !== this.pageCurrentRepair) {
            this.scrollActive = true;            
        } 
    }
}