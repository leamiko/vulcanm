import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
    template: require('./index.html')
})
export class SmsTemplatesForm extends Vue {

    @Prop() symbol: number;
    @Prop() id: number;
    @Prop() msg: string;
    @Prop() status: number;
    @Prop() reject: string;
    @Prop() keys: string;

    text: string = '';
    startText: string = '';
    endText: string = '';
    cursorStart: number = null;
    cursorEnd: number = null;

    active: boolean = false;

    rename(text) {
        const newText = text.replace(/%ФАМИЛИЯ_КЛ%/g, 'Соловьев')
            .replace(/%ИМЯ_КЛ%/g, 'Антон')
            .replace(/%ОТЧЕСТВО_КЛ%/g, 'Максимович')
            .replace(/%ФИО_КЛ%/g, 'Соловьев А.М.')
            .replace(/%ТЕЛЕФОН_КЛ%/g, '+79876543210')
            .replace(/%АДРЕС_КЛ%/g, 'пр-кт Мира 7-85')
            .replace(/%ИД%/g, 'FIX-93')
            .replace(/%ТИП_УСТР%/g, 'ноутбук')
            .replace(/%ПРОИЗВ_УСТР%/g, 'Apple')
            .replace(/%МОДЕЛЬ_УСТР%/g, 'MacBook Pro 2017')
            .replace(/%НЕИСПРАВНОСТЬ%/g, 'не включается')
            .replace(/%ПРЕДОПЛ%/g, '2000')
            .replace(/%ЗАМЕТКИ%/g, 'звонить после 17:00')
            .replace(/%ОЖИД_СТОИМОСТЬ%/g, '5000')
            .replace(/%ОЖИД_ГОТОВО%/g, '12.02')
            .replace(/%ССЫЛКА%/g, 'vulcanm.ru/xxxxx')
            .replace(/%ОБНАРУЖЕННАЯ_ПРОБЛЕМА%/g, 'сгорел чип')
            .replace(/%ИТОГ%/g, '5500')
            .replace(/%К_ОПЛАТЕ%/g, '3500');
        this.$root.$emit('Sms-Template', { 'id': this.id, 'text': newText, 'template': this.text, 'key': this.keys });
    }

    isText(template) {
        this.text = this.modifText(this.text, template);
        this.rename(this.text);
    }

    modifText(text, template) {
        this.startText = text.substr(0, this.cursorStart);
        this.endText = text.substr(this.cursorEnd, text.length);
        if ( this.cursorStart === this.startText.length ) {
            this.startText += template;
            text = this.startText + ' ' + this.endText;
            this.cursorStart += template.length;
            this.cursorEnd += template.length;
        } else {
            text += ' ' + template;
        }
        return text;
    }

    target(event) {
        let start = event.toElement.selectionStart;
        let end = event.toElement.selectionEnd;
        if (start < end) {
            this.cursorStart = start;
            this.cursorEnd = end;
        } else {
            this.cursorStart = end;
            this.cursorEnd = start;
        }
    }
    
    @Watch('msg')
    onload() {
        this.text = this.msg;
        this.rename(this.text);
    }
}