import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
    template: require('./all.html')
})
export class RepairContent extends Vue {

    @Getter repairActiveColumn;

    @Prop() repair: object[];

    isDate(item) {
        const ts = item * 1000;
        const date = new Date(ts).toLocaleDateString();
        const time = new Date(ts).toLocaleTimeString();
        const newDate = date.substring(0, date.length - 5);
        const newTime = time.substring(0, time.length - 3);
        let formDate = newDate;
        if (newTime.length === 4) {
            formDate += ' 0' + newTime;
        } else {
            formDate += ' ' + newTime;
        }
        return formDate;
    }
}