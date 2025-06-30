<template>
    <div>
        <div class="chart-title">年齡/性別分布</div>
        <highcharts :options="chartOptions" v-if="chartOptions.series[0].data.length" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 預設年齡區間順序
const ageGroups = ['<=20', '21~30', '31~40', '41~50', '51~60', '>=61', '未填寫']

const chartOptions = ref({
    chart: {
        type: 'column',
        style: {//ㄑ全域設定字體
            fontFamily: 'Noto Sans, Arial, sans-serif',//優先使用 Noto Sans，找不到就用 Arial，都沒有的話再用瀏覽器預設的無襯線字體（sans-serif）
            fontSize: '20px'
        }
    },

    title: {
        text: '',
        align: 'left',
        style: {
            color: 'gray', // 或 '#888888' 也可以
            fontSize: '22px', // 可同時調字體大小
            fontWeight: 'bold' // 其他自訂樣式
        }
    },
    legend: {
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal',
        x: 300,
        y: 0
    },
    xAxis: { categories: ageGroups, title: { text: '年齡級距' } },
    yAxis: { min: 0, title: { text: '人數' } },
    series: [
        {
            name: '男',
            data: [],
            color: '#497FFF' // 藍色
        },
        {
            name: '女',
            data: [],
            color: '#DE495C' // 粉紅/紅色
        },
        {
            name: '未填寫',
            data: [],
            color: '#FFA728' // 橘色
        }
    ]
})

onMounted(async () => {
    const res = await fetch('./persona_target_guid.json')
    const json = await res.json()
    const raw = json.guid_data.find(item => item['類型'] === '性別與年齡')

    // 組裝男女未填寫的資料
    chartOptions.value.series[0].data = ageGroups.map(g => Number(raw['男_' + g] || 0))
    chartOptions.value.series[1].data = ageGroups.map(g => Number(raw['女_' + g] || 0))
    chartOptions.value.series[2].data = ageGroups.map(g => Number(raw['未填寫_' + g] || 0))
})
</script>


<style scoped>
.chart-title {
  font-size: 22px;
  color: #888;         /* 灰色標題 */
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 1px;
}
</style>
