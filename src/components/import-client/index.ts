import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import XLSX from 'xlsx';

@Component({
    template: require('./import-client.html')
})
export class ImportClient extends Vue {


    @Action addClient;

    import: object[];
    dialogImport: boolean = false;
    open: boolean = false;
    loaderActive: boolean = false;
    visibly: boolean = false;
    file;
    image = '';
    clear: string = '';
    logs = [];
    config = {
        header: [
            [ 'id', 'last_name', 'first_name', 'middle_name', 'phone', 'address', 'status', 'source'],
            [ 'id' , 'name' , 'contact_phone' , 'contact_name' , 'inn' , 'manager_name' , 'manager_post', 'contact_email', 'status', 'source' ]
        ],
        required: [
            ['last_name', 'first_name', 'phone'],
            ['name', 'phone']
        ],
        key: [ 'phys', 'legal' ]
    };


    isAddImport() {
        for (let i = 0; i < 3; i++) { 
            this.addClient(this.import['phys'][i]);
        }
    }

    mounted() {
        this.$root.$on('dialogImport', () => this.dialogImport = true);
    }

    get isLogs() {
        return this.logs.length;
    }

    onClear() {
        this.clear = '';
    }

    onFileChange(e) {
        this.logs = [];
        this.visibly = false;
        let file = e.target.files[0];        
        let key = this.config.key;
        let header = this.config.header;
        let sheet_names = [];
        let countList: number;
        let importJson = new Object();
        let reader = new FileReader();

        reader.onloadstart = () => {
            this.loaderActive = true;
        };
        reader.onload = ((file) => function (e) {
                let data = e.target;
                let workbook = XLSX.read(data.result, {type: 'binary'});
                countList = workbook.SheetNames.length;
                for (let i = 0; i < countList; i++) {
                    sheet_names[i] = workbook.SheetNames[i];
                    let sheet_rows = workbook.Sheets[sheet_names[i]];
                    importJson[key[i]] = XLSX.utils.sheet_to_json(sheet_rows, { 
                        header: header[i], 
                        defval: null
                    });
                    importJson[key[i]].splice(0, 1);
                }          
            }
        )(file);
        reader.readAsBinaryString(file);
        
        reader.onloadend = () => {
            this.checkRequired(importJson, sheet_names, countList);
        };

    }

    checkRequired(importJson, sheet_names, countList) {
        let required = this.config.required;
        let key = this.config.key;
        for (let i = 0; i < countList; i++) {
            for (let j = 0; j < importJson[key[i]].length; j++) {           
                for (let c = 0; c < required[i].length; c++) {
                    if (importJson[key[i]][j][required[i][c]] === null) {
                        let log = sheet_names[i] + ' (' + (j + 2) + ') : Отсутствует поле: ' + required[i][c];
                        this.logs.push(log);
                    }
                }
            }
        }

        this.import = importJson;

        setTimeout( () => {
            this.loaderActive = false;
            this.visibly = true;
        }, 1000);
    }
}

