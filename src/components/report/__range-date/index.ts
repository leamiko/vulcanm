import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    template: require('./range.html'),
})
export class ReportRangeDate extends Vue {

    @Prop() title: string;
    @Prop() range: string[];

    datesRange: string[] = [];

    mounted() {
        this.datesRange = this.range;
    }


    pickerOptions = {
        firstDayOfWeek: 1,
        shortcuts: [
            {
                text: 'За вчера',
                onClick(picker) {
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    start.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, start]);
                }
            }, {
                text: 'За неделю',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За месяц',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За 3 месяца',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За 6 месяцев',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    picker.$emit('pick', [start, end]);
                }
            }
        ]
    };

}