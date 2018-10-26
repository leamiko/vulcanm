import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  mounted () {
    // Переопределение базового рендер метода с реальными данными.
    this.renderChart(
      this.chartData,
      {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function(tooltipItem) {
              return [tooltipItem.yLabel];
            }
          }
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
      });
  }
}