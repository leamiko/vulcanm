import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class PointForm extends Vue {

    @Getter btnloader;
    @Getter validPoint;
    @Getter typePoint;
    @Getter point;

    @Action sendPoint;
    @Action changePoint;

    @Prop() item: object;
    @Prop() color: string;
    @Prop() form: string;

    newItem: object =  { 'id': '', 'prefix': '', 'color': '', 'name': '', 'type': '', 'address': '', 'phone': ''};

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    sendColor(val) {
        if (val !== 'transparent') {
            this.newItem['color'] = '#' + this.rgbToFlex(val);
        }
    }

    rgbToFlex(val) {
        let color = val.replace(/\s/g, '');
        const aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);      
        if (aRGB) {
          color = '';
          for (let i = 1;  i <= 3; i++) {
            let round: number = (aRGB[i][aRGB[i].length - 1] === '%' ? 2.55 : 1) * parseInt(aRGB[i]);  
            color += Math.round(round).toString(16).replace(/^(.)$/, '0$1');
            }
        } else {
            color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
        }        
        return color;
    }

    @Watch('item')
    onChange() {
        if (this.item) {
            this.newItem = this.item;
        }
    }

    @Watch('validPoint')
    onChanged(val: object) {
        if (Object.keys(val).length === 0 && this.form === 'add') {
            this.$router.push('/settings/point');
        }
    }
}