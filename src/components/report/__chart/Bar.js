import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData,
        {
          responsive: false,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: true
              }
            }],
            yAxes: [{
              gridLines: {
                display: true
              }
            }]
          },
          tooltips: {
            displayColors: false,
          }
        });
  }
}