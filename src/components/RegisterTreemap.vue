<template>
  <div>
    <div class="chart-title">註冊地</div>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


const chartOptions = ref({
  chart: {
    type: 'treemap',
    height: 260,
    backgroundColor: 'transparent'
  },
  title: { text: '' },
  colorAxis: {
    minColor: '#C5E1FA',
    maxColor: '#4F8DFA'
  },
  plotOptions: {
    treemap: {
      layoutAlgorithm: 'squarified',
      dataLabels: {
        enabled: true,
        align: 'center',
        verticalAlign: 'middle',
        useHTML: true,
        allowOverlap: false,
        style: {
          fontWeight: 'bold',
          textOutline: 'none',
        },
        formatter: function () {
          // 取得格子的寬高
          const w = this.point.shapeArgs && this.point.shapeArgs.width
          const h = this.point.shapeArgs && this.point.shapeArgs.height
          if (w && h) {
            // 大格：字超大
            if (w > 110 && h > 60) {
              return `<div style="font-size:26px;">${this.point.name}</div>
                      <div style="font-size:20px;">${Math.round(this.point.value * 100)}%</div>`
            }
            // 中格：字稍小
            if (w > 45 && h > 28) {
              return `<div style="font-size:15px;">${this.point.name}<br>${Math.round(this.point.value * 100)}%</div>`
            }
          }
          // 小格：只顯示城市名
          return `<div style="font-size:10px;">${this.point.name}</div>`
        }
      }
    }
  },
  tooltip: {
    pointFormat: '{point.name}: <b>{point.value:.2%}</b>'
  },
  series: [{
    type: 'treemap',
    layoutAlgorithm: 'squarified',
    data: []
  }]
})

onMounted(async () => {
  const res = await fetch('./persona_target_guid.json')
  const json = await res.json()
  const raw = json.guid_data.find(item => item['類型'] === '註冊地')
  const data = []
  for (const city of Object.keys(raw)) {
    if (city === '類型') continue
    data.push({
      name: city,
      value: Number(raw[city][1])
    })
  }
  chartOptions.value.series[0].data = data
})
</script>

<style scoped>
.chart-title {
  font-size: 20px;
  font-weight: bold;
  color: #888;
  margin-bottom: 10px;
}
</style>
