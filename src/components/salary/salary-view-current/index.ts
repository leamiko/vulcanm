import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import isEqual from 'lodash/isEqual';
import intersectionWith from 'lodash/intersectionWith';

import {SalaryOperationTable} from
        '../salary-operatiorn-table';
import {Numbers} from '../../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        SalaryOperationTable,
        Numbers,
    },
})

export class SalaryViewCurrent extends Vue {
    
    @Getter salaryOperationUnpaidListByUserId;
    @Getter totalSalaryOperationAmount;
    @Getter viewStuff;
    @Getter shortEmployeeName;
    @Getter cashList;
    
    @Action setSalaryOperationUnpaidListByUserId;
    @Action deleteSalaryOperation;
    @Action bonusEmployee;
    @Action penaltyEmployee;
    @Action updateSalaryOperation;
    @Action addSalaryTransfer;
    @Action getCashList;
    
    $refs: any; // for escape of type checking
    
    user_id = '';
    activeTab = 'current';
    loadingSalaryOperation = true;
    isDialogVisible = false;
    whichOperation = '';
    operationToBeUpdated = undefined;
    dialogFormModel = {sum: '', comment: ''};
    dialogFormValidationRules = {
        sum: [
            {required: true, message: 'Укажите сумму', trigger: 'change'},
            {
                type: 'number',
                message: 'Значение должно быть числом',
                trigger: 'change',
            },
            {
                type: 'number',
                min: 0.009,
                max: Infinity,
                message: 'Значение должно быть больше нуля',
                trigger: 'change',
            },
        ],
    };
    selectedOperation = [];
    startDate = null;
    endDate = null;
    selectedCashBoxId = null;
    
    // hooks
    
    created() {
        this.user_id = this.$route.params.user_id;
        this.setSalaryOperationUnpaidListByUserId({
            user_id: this.user_id,
        });
        this.getCashList();
    }
    
    // computed
    
    get dialogTitle() {
        switch (this.whichOperation) {
            case 'bonus':
                return `Премирование сотрудника<br/>${this.shortEmployeeName}`;
            case 'penalty':
                return `Взыскание с сотрудника<br/>${this.shortEmployeeName}`;
            case 'update':
                return 'Изменение начисления ЗП';
            default:
                return this.shortEmployeeName;
        }
    }
    
    get amountToBePayed() {
        return this.selectedOperation.reduce((prev, curr) => prev + curr.sum, 0);
    }
    
    get isSubmitTransferDisabled() {
        return !(this.selectedOperation.length !== 0 &&
            this.selectedCashBoxId !== null);
    }
    
    // event handlers
    
    async onDeleteSalaryOperation(id) {
        let result = confirm('Вы уверены что хотите удалить начисление?');
        if (result) {
            let status = await this.deleteSalaryOperation({id});
            if (status === 0) {
                this.toggleRow(
                    this.salaryOperationUnpaidListByUserId.find(
                        elem => elem.id === id),
                    false);
            }
            this.setSalaryOperationUnpaidListByUserId({
                user_id: this.user_id,
            });
        }
    }
    
    async onUpdateSalaryOperation({id, sum, comment}) {
        this.operationToBeUpdated = id;
        this.dialogFormModel.sum = sum;
        this.dialogFormModel.comment = comment;
        this.openDialog({whichOperation: 'update'});
    }
    
    async submitSalaryOperation() {
        this.$refs['dialogForm'].validate(async (valid) => {
            if (valid) {
                await this.doSalaryOperation();
                await this.setSalaryOperationUnpaidListByUserId({
                    user_id: this.user_id,
                });
                if (this.whichOperation === 'update') {
                    this.toggleRow(
                        this.salaryOperationUnpaidListByUserId.find(
                            e => e.id === this.operationToBeUpdated), false);
                    this.toggleRow(
                        this.salaryOperationUnpaidListByUserId.find(
                            e => e.id === this.operationToBeUpdated), true);
                }
                this.updateDateRange();
                this.$refs['dialogForm'].resetFields();
                this.isDialogVisible = false;
            }
        });
    }
    
    selectOperationsByDateRange() {
        if (!this.startDate || !this.endDate) return;
        
        let endDate = new Date(this.endDate);
        endDate.setDate(endDate.getDate() + 1);
        
        this.clearSelection();
        
        let sortedByDate = this.salaryOperationUnpaidListByUserId.filter(
            elem => {
                return new Date(elem.created_at * 1000) > this.startDate &&
                    new Date(elem.created_at * 1000) < endDate;
            });
        
        sortedByDate.forEach(item => this.toggleRow(item, true));
    }
    
    onBeforeCloseDialog(done) {
        this.$refs['dialogForm'].resetFields();
        done();
    }
    
    openDialog({whichOperation}) {
        this.whichOperation = whichOperation;
        this.isDialogVisible = true;
    }
    
    async submitSalaryTransfer() {
        let form = {
            operation_ids: this.selectedOperation.map(value => value.id),
            cashbox_id: this.selectedCashBoxId,
        };
        
        let status = await this.addSalaryTransfer({form});
        if (status === 0) {
            this.selectedOperation.forEach(
                value => this.toggleRow(value, false));
        }
        this.setSalaryOperationUnpaidListByUserId({
            user_id: this.user_id,
        });
    }
    
    // watchers
    
    @Watch('salaryOperationUnpaidListByUserId')
    onSalaryOperationUnpaidListByUserIdChange() {
        this.$nextTick(() => this.loadingSalaryOperation = false);
    }
    
    @Watch('selectedOperation')
    onSelectedOperationChange(value, oldValue) {
        if (isEqual(value, oldValue)) {
            return;
        }
        this.updateDateRange();
    }
    
    // helpers
    
    updateDateRange() {
        if (this.selectedOperation.length === 0) {
            this.startDate = null;
            this.endDate = null;
            return;
        }
        
        let a = this.salaryOperationUnpaidListByUserId.slice(0)
            .sort((a, b) => b.created_at - a.created_at);
        let b = this.selectedOperation.slice(0)
            .sort((a, b) => b.created_at - a.created_at);
        let c = a.slice(
            a.findIndex(elem => elem.id === b[0].id),
            a.findIndex(elem => elem.id === b[b.length - 1].id) + 1,
        );
        
        if (!isEqual(b, c)) {
            this.startDate = null;
            this.endDate = null;
            return;
        }
        
        let lIndex = a.findIndex(elem => elem.id === b[0].id);
        let rIndex = a.findIndex(elem => elem.id === b[b.length - 1].id);
        
        let lDate = new Date(a[lIndex].created_at * 1000);
        lDate = new Date(
            lDate.getFullYear(),
            lDate.getMonth(),
            lDate.getDate());
        
        let rDate = new Date(a[rIndex].created_at * 1000);
        rDate = new Date(
            rDate.getFullYear(),
            rDate.getMonth(),
            rDate.getDate());
        
        if (lIndex !== 0) {
            let llDate = new Date(a[lIndex - 1].created_at * 1000);
            llDate = new Date(
                llDate.getFullYear(),
                llDate.getMonth(),
                llDate.getDate());
            
            if (llDate.getTime() === lDate.getTime()) {
                this.startDate = null;
                this.endDate = null;
                return;
            }
        }
        
        if (rIndex !== a.length - 1) {
            let rrDate = new Date(a[rIndex + 1].created_at * 1000);
            rrDate = new Date(
                rrDate.getFullYear(),
                rrDate.getMonth(),
                rrDate.getDate());
            
            if (rrDate.getTime() === rDate.getTime()) {
                this.startDate = null;
                this.endDate = null;
                return;
            }
        }
        
        this.startDate = rDate;
        this.endDate = lDate;
        return;
    }
    
    toggleRow(row, selected) {
        this.$refs['salaryOperationTable'].toggleRowSelection(row, selected);
    }
    
    clearSelection() {
        this.$refs['salaryOperationTable'].clearSelection();
    }
    
    async doSalaryOperation() {
        const form = {
            sum: this.dialogFormModel.sum,
            comment: this.dialogFormModel.comment,
            user_id: this.user_id,
        };
        switch (this.whichOperation) {
            case 'bonus':
                return await this.bonusEmployee(form);
            case 'penalty':
                return await this.penaltyEmployee(form);
            case 'update':
                return await this.updateSalaryOperation({
                    form,
                    id: this.operationToBeUpdated,
                });
            default:
                return;
        }
    }
    
    pickerOptionsStart() {
        return {
            disabledDate: (time) => {
                let end = this.endDate ? this.endDate.getTime() : Date.now();
                return time.getTime() > end;
            },
        };
    }
    
    pickerOptionsEnd() {
        return {
            disabledDate: (time) => {
                let start = this.startDate ? this.startDate : new Date(0);
                return time.getTime() > Date.now() || time.getTime() < start;
            },
        };
    }
}

