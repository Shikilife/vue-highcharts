<template>
    <div>
        <div class="chart-title">消費傾向與習慣</div>
        <div class="donut-row">
            <!-- 自製 legend 區塊 -->
            <div class="custom-legend">
                <div class="legend-item">
                    <span class="legend-color legend-blue"></span>Y
                </div>
                <div class="legend-item">
                    <span class="legend-color legend-gray"></span>N
                </div>
            </div>
            <!-- 甜甜圈圖表 -->
            <div v-for="(item, i) in chartList" :key="i" class="donut-card">
                <highcharts :options="item.options" />
                <div class="donut-center">{{ item.label }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const habits = [
    '歲末酬賓必來',
    '母親節必來',
    '年中慶必來',
    '周年慶必來',
    '價格敏感客群'
]
const colors = ['#7DC7FA', '#B3B3B3'] // Y:藍色，N:灰色
const chartList = ref([]) // 存每個圓環圖的 options

onMounted(async () => {
    const res = await fetch('./persona_target_guid.json')
    const json = await res.json()
    const raw = json.guid_data.find(item => item['類型'] === '消費傾向與習慣')

    // 為每個習慣產生一組 pie chart options
    chartList.value = habits.map((label) => {
        const yes = raw[label]['1']?.percentage ?? 0
        const no = raw[label]['0']?.percentage ?? 0
        return {
            label,
            options: {
                chart: {
                    type: 'pie',
                    height: 180,
                    backgroundColor: 'transparent'
                },
                title: { text: '' },
                plotOptions: {
                    pie: {
                        innerSize: '50%', // 圓環
                        size: '120%',
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.0f}%',
                            style: {
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }
                        }
                    }
                },
                tooltip: { enabled: false },
                legend: { enabled: false },
                colors,
                series: [{
                    name: label,
                    data: [
                        { name: 'Y', y: yes },
                        { name: 'N', y: no }
                    ]
                }]
            }
        }
    })
})
</script>

<style scoped>
.chart-title {
    font-size: 20px;
    font-weight: bold;
    color: #888;
    margin-bottom: 10px;
}

.donut-row {
    display: flex;
    gap: 14px;        /* 原本28，縮小一半 */
    align-items: center;
    justify-content: flex-start;
}

.donut-card {
    background: #fafbfc;
    border-radius: 12px;
    width: 290px;
    height: 190px;
    position: relative;
    box-shadow: 0 2px 12px #eef1f6;
    display: flex;
    align-items: center;
    justify-content: center;
}

.donut-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: 14px;
    /* 再大一點更顯眼 */
    color: #555;
    font-weight: bold;
    pointer-events: none;
    white-space: pre-line;
    line-height: 1.2;
}

.custom-legend {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-right: 16px;
    min-width: 36px;
}

.legend-item {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    margin-bottom: 6px;
}

.legend-color {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    margin-right: 6px;
    vertical-align: middle;
}

.legend-blue {
    background: #7DC7FA;
}

.legend-gray {
    background: #B3B3B3;
}
</style>
