import {Pie, mixins} from 'vue-chartjs'

export default {
    mixins: [mixins.reactiveProp],
    extends: Pie,
    mounted() {
        // Переопределение базового рендер метода с реальными данными.
        this.renderChart(
            {
                labels: this.label,
                datasets: [
                    {
                        backgroundColor: ['#64ffda', '#03a9f4', '#ff7043', '#ff9800', '#64dd17', '#cddc39', '#7e57c2', '#e040fb', '#ef5350'],
                        borderColor: 'transparent',
                        data: this.data
                    },
                ]
            },
            {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                },
                tooltips: {
                    displayColors: false,
                }
            }
        );
    }
}