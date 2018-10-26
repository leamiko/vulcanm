import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';
import {SalaryViewCurrent} from '../../components/salary/salary-view-current';
import {SalaryViewPrevious} from '../../components/salary/salary-view-previous';

@Component({
    template: require('./index.html'),
    components: {
        SalaryViewCurrent,
        SalaryViewPrevious,
    },
})

export class SalaryViewPage extends Vue {
    
    @Getter viewStuff;
    @Getter fullEmployeeName;
    
    @Action getViewStuff;
    
    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action resetBreadcrumb;
    
    $refs: any; // for escape of type checking
    
    activeTab = 'current';
    breadcrumbText = '';
    
    // hooks
    
    created() {
        this.activeTab = this.$route.params.tab;
        this.getViewStuff(this.$route.params.user_id);
        this.setBreadcrumb();
    }
    
    // event handlers
    
    handleTabClick(tab, event) {
        this.$router.push(`/salary/${tab.name}/${this.$route.params.user_id}`);
    }
    
    // watchers
    
    @Watch('viewStuff')
    updateBreadcrumb() {
        this.breadcrumbText = this.fullEmployeeName;
        this.setBreadcrumb();
    }
    
    @Watch('$route')
    onRouteChange(to, from) {
        this.activeTab = this.$route.params.tab;
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
            {id: 2, section: this.breadcrumbText, link: null}]);
    }
}

