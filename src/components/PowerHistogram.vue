<template>
    <div>
        <div class="chart-title">消費力直方圖</div>
        <highcharts :options="chartOptions" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const moneyGroups = [
    '0~1K', '1K~2K', '2K~5K', '5K~10K', '10K~50K',
    '50K~100K', '100K~1M', '1000K~100M+'
]
const moneyLabels = ['1K', '2K', '5K', '10K', '50K', '100K', '1M', '100M+']

// 建立百分比陣列，跟 data 欄位做一一對應
const percentArray = ref([])

const chartOptions = ref({
    chart: {
        type: 'column',
        height: 280,
        spacingTop: 34,
        style: { fontFamily: 'Noto Sans, Arial, sans-serif' }
    },
    title: { text: '' },
    xAxis: {
        categories: moneyLabels,
        title: { text: '消費金額' }
    },
    yAxis: {
        min: 0,
        max: 600,
        tickInterval: 200,
        title: {
            text: '人數 (K)',
            align: 'high',
            rotation: 0,
            y: -10,
            x: 0,
            offset: 0
        },
        labels: {
            formatter() { return this.value }
        }
    },
    series: [
        {
            name: '人數',
            data: [],
            color: '#7DC7FA'
        }
    ],
    legend: { enabled: false },
    plotOptions: {

        column: {
            pointWidth: 40, // 數字越大，柱子越寬（單位: px）
            dataLabels: {
                enabled: true,
                formatter() {
                    // 這裡直接從 percentArray 取對應百分比顯示
                    const idx = this.point.index
                    // 若你希望沒有數據時顯示 0%，可以加判斷
                    return (percentArray.value?.[idx] ?? 0) + '%'
                }
            }
        }
    }
})

onMounted(async () => {
    const res = await fetch('./persona_target_guid.json')
    const json = await res.json()
    const raw = json.guid_data.find(item => item['類型'] === '消費力直方圖')
    // 1. 資料高度用人數
    chartOptions.value.series[0].data = moneyGroups.map(
        key => Number(raw?.[key]?.[1] || 0)
    )
    // 2. 百分比欄位做成陣列存給 dataLabels 顯示
    percentArray.value = moneyGroups.map(
        key => Math.round(Number(raw?.[key]?.[2] || 0) * 100)
    )
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
