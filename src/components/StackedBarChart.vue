<template>
  <div>
    <div class="chart-title">近三個月消費趨勢</div>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const groupLabels = ['金額', '次數'] // Y軸分類
const trendLabels = ['成長', '持平', '衰退']
const trendColors = ['#497FFF', '#B3B3B3', '#FFA728']

const chartOptions = ref({
  chart: {
    type: 'bar',   // 橫向長條
    height: 140,
    spacingTop: 24,
    style: { fontFamily: 'Noto Sans, Arial, sans-serif' }
  },
  title: { text: '' },
  xAxis: {
    categories: groupLabels,
    title: { text: null }
  },
  yAxis: {
    min: 0,
    max: 100,
    title: { text: null },
    labels: {
      formatter() { enabled: false  }
    },
    stackLabels: {
      enabled: false
    }
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    itemStyle: {
      fontWeight: 'bold'
    }
  },
  plotOptions: {
    series: {
      stacking: 'normal',     // 堆疊模式
      borderRadius: 5,
      dataLabels: {
        enabled: true,
        inside: true,
        style: { color: '#fff', textOutline: 'none', fontWeight: 'bold' },
        formatter() {
          return this.y > 0 ? Math.round(this.y) + '%' : null
        }
      }
    }
  },
  series: [
    {
      name: '成長',
      color: trendColors[0],
      data: []
    },
    {
      name: '持平',
      color: trendColors[1],
      data: []
    },
    {
      name: '衰退',
      color: trendColors[2],
      data: []
    }
  ]
})

onMounted(async () => {
  const res = await fetch('./persona_target_guid.json')
  const json = await res.json()
  const raw = json.guid_data.find(item => item['類型'] === '近三個月消費趨勢')
  // 金額和次數陣列都為3個百分比，分別對應 成長/持平/衰退
  const 金額 = raw['金額'].map(x => Math.round(x * 100))
  const 次數 = raw['次數'].map(x => Math.round(x * 100))
  // Highcharts 的橫向條形圖：每個 series 要填 [金額, 次數]，順序跟 categories 一致
chartOptions.value.series[0].data = [金額[0], 次數[0]] // 成長
chartOptions.value.series[1].data = [金額[1], 次數[1]] // 持平
chartOptions.value.series[2].data = [金額[2], 次數[2]] // 衰退
})
</script>

<style scoped>
.chart-title {
  font-size: 18px;
  font-weight: bold;
  color: #888;
  margin-bottom: 6px;
}
</style>
