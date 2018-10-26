import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class PartForm extends Vue {

    @Prop() item: object;
    @Prop() validPart: object;
    @Prop() photo: object;
    @Prop() barcodes: object[];

    @Action getVatList;
    @Action getRewardTypeList;
    @Action getWarrantTypeList;
    @Action getPartCategory;

    @Getter vatlist;
    @Getter warrantTypeList;
    @Getter rewardTypeList;
    @Getter categoryList;

    photoPreview: string = '';
    photoError: string = '';
    newPhoto: string = '';
    barcodeItemId: number = 1;

    categorySelectList() {
        return this.flattery(this.categoryList);
    }

    /**
     * Преобразует массив объектов в плоский набор
     * @param parent Массив объектов категорий
     * @param previousRoute строка предыдущего пути
     */
    private flattery(parent, previousRoute =  '') {
        let result = [];
        parent.forEach(element => {
            const route = (previousRoute !== '') ? previousRoute + ' / ' + element.title : element.title;
            result.push({id: element.key, value: route});
            if (element.children.length > 0) {
                result.push(... this.flattery(element.children, route));
            }
        });
        return result;
    }

    mounted() {
        this.getVatList();
        this.getRewardTypeList();
        this.getWarrantTypeList();
        this.getPartCategory();
    }

    showFileInput() {
        const fileInput = document.getElementById('file-load');
        fileInput.click();
    }

    addImages(value) {
        let photo = null;
        let file = value.target.files[0];
        if (!this.photoTypeCheck(file)) {
            this.photoError = 'Неверный формат изображения';
        } else if (!this.photoSizeCheck(file)) {
            this.photoError = 'Размер изображения не должен превышать 5мб';
        } else {
            let reader = new FileReader();
            reader.onload = function( event ){
                preview(event.target['result']);            
            };
            reader.readAsDataURL(file); 
            let preview = (res) => this.photoPreview = res;
            this.photoError = '';
            this.photo['file'] = file;
        }
    }

    photoSizeCheck(img) {
        return img.size < 5242880 ? true : false;
    }

    photoTypeCheck(img) {
        let type: boolean = false;
        switch (img.type) {
            case 'image/jpeg': 
            case 'image/jpg': 
            case 'image/png': 
                type = true;
                break;
        }
        return type;
    }

    addNewBarcodeItem() {
        const item = { 'id': this.barcodeItemId, 'value': '', 'auto_generated': true };
        this.barcodes.push(item);
        this.barcodeItemId++;
    }

    deleteNewBarcodeItem(index) {
        this.barcodes.splice(index, 1);
    }

    checkControlNumber(index) {
        const value = this.barcodes[index]['value'];
        let even = 0;
        let notEven = 0;
        for (let i = 1; i < value.length - 1; i += 2) {
            even += Number(value[i]);
            notEven += Number(value[i - 1]);
        }
        let sum = even * 3 + notEven;
        let res = Math.ceil(sum / 10) * 10 - sum;
        if (value.length === 13 && res !== Number(value[12])) {
            return 'Неверное контрольное число';
        } else if (value.length && !Number(value)) {
            return 'Штрих-код должен быть числом';
        }
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    validateBarcodes(obj, index) {
        if (Object.keys(obj).some(v => v === 'barcodes')) {
            if (typeof(obj.barcodes[0][index]) !== 'boolean' && obj.barcodes[0][index] !== undefined ) {
                return obj.barcodes[0][index]['value'][0];
            }
        } else {
            return this.checkControlNumber(index);
        }
    }
}