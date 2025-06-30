<template>
  <highcharts :options="chartOptions" />
</template>

<script setup>
import { ref } from 'vue'
const chartOptions = ref({
  title: { text: 'Vue 3 + Highcharts-Vue Demo' },
  xAxis: { categories: ['一月', '二月', '三月', '四月', '五月'] },
  series: [
    { name: '銷售量', data: [1, 3, 2, 4, 5] },
    { name: '成本', data: [2, 2, 3, 2, 1] }
  ]
})
</script>
