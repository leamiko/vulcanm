import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';


@Component({
    template: require('./index.html'),
})

export class PartSettingTable extends Vue {

    @Action reloadHeadPart;
    @Action reloadHeadNomenkl;
    
    @Getter headsPart;
    @Getter headNomenkl;

    allReward: boolean = false;    
    allAmounts: boolean = false;    
    allPrice: boolean = false;    
    dialogSettingTable: boolean = false;    
    heads: object = {};

    get isPage() {
        return this.$route.name === 'part';
    }

    reset() {
        const head = this.isPage ? this.headsPart : this.headNomenkl;
        this.heads = JSON.parse(JSON.stringify(head));
    }

    edtItem(props) {
        if (props !== undefined) {
            const active: boolean = props.every(i => i.active);
            props.forEach( (item, i, props) => item.active = active ? false : true );
        }
    }

    midcheck (props, type) {
        if (props !== undefined) {
            const active: boolean = props.every(i => i.active);
            this[type] = active ? true : false;
            return props.some(i => i.active) && !active ? true : false;
        }
    }

    onDialogSettingTable() {
        if (!this.dialogSettingTable) this.reset();
        this.dialogSettingTable = !this.dialogSettingTable;
    }

    cancel() {
        this.reset();
        this.onDialogSettingTable();
    }

    save() {
        this.isPage ? this.reloadHeadPart(this.heads) : this.reloadHeadNomenkl(this.heads);
        this.onDialogSettingTable();
    }

    @Watch('headsPart')
    onloadHeadPart(val: object) {
        if (this.isPage) {
            this.heads = JSON.parse(JSON.stringify(val)); 
        }
    }

    @Watch('headNomenkl')
    onloadHeadNomenkl(val: object) {
        if (!this.isPage) {
            this.heads = JSON.parse(JSON.stringify(val));
        }
    }
}