import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {SalaryTable} from '../../components/salary-table';
import {SalaryTransferViewTable} from '../../components/salary-transfer-view-table';

@Component({
    template: require('./index.html'),
    components: {
        SalaryTransferViewTable,
        SalaryTable,
    },
})

export class SalaryTransferViewPage extends Vue {
    @Action setSalaryOperationListByTransferId;
    @Action deleteSalaryTransfer;
    
    @Getter salaryOperationListByTransferId;
    @Getter viewStuff;
    @Getter fullEmployeeName;
    
    @Action getViewStuff;
    
    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action resetBreadcrumb;
    
    breadcrumbTextTransferId = '';
    breadcrumbTextEmployeeName = '';
    
    created() {
        this.getViewStuff(this.$route.params.employee_id);
        this.setSalaryOperationListByTransferId({
            transfer_id: this.$route.params.transfer_id,
        });
        this.setBreadcrumb();
    }
    
    async onDeleteSalaryTransfer() {
        let status = await this.deleteSalaryTransfer({
            id: this.$route.params.transfer_id,
        });
        if (status === 0) {
            this.$router.back();
        }
    }
    
    @Watch('viewStuff')
    updateBreadcrumb() {
        this.breadcrumbTextEmployeeName = this.fullEmployeeName;
        this.breadcrumbTextTransferId =
            `Информация о выплате №${this.$route.params.transfer_id}`;
        this.setBreadcrumb();
    }
    
    // helpers
    
    setBreadcrumb() {
        this.addActionBtn([]);
        this.addBreadcrumb([
            {
                id: 1,
                section: 'Финансы',
                link: '/salary',
                textContent: 'Информация о заработной плате',
            },
            {id: 2, section: this.breadcrumbTextEmployeeName, link: null},
            {id: 3, section: this.breadcrumbTextTransferId, link: null}]);
    }
}