<template>
  <div class="dashboard">
    <div class="dashboard-block" style="grid-column: span 2;">
      <GenderAgeBar />
    </div>
    <div class="dashboard-block">
      <PowerHistogram />
    </div>
    <div class="dashboard-block">
      <StackedBarChart />
    </div>
    <div class="dashboard-block">
      <RegisterTreemap />
    </div>
    <div class="dashboard-block" style="grid-column: span 3;">
      <ConsumptionHabits />
    </div>

  </div>
</template>

<script setup>
import GenderAgeBar from './components/GenderAgeBar.vue'
import PowerHistogram from './components/PowerHistogram.vue'
import StackedBarChart from './components/StackedBarChart.vue'
import ConsumptionHabits from './components/ConsumptionHabits.vue'
import RegisterTreemap from './components/RegisterTreemap.vue'
</script>

<style>
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 三欄 */
  gap: 32px;
  padding: 32px;
  background: #f5f8fb;
  min-height: 100vh;
}

/* 圖表區塊統一樣式 */
.dashboard-block {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px #dde1e7;
  padding: 24px 28px 34px 28px;
  height: fit-content;
  min-width: 0;
  /* 防止overflow */
  min-height: 330px;
  /* 建議可統一最小高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

/* RWD：螢幕窄時自動兩欄、一欄 */
@media (max-width: 1200px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .dashboard {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 8px;
  }

  .dashboard-block {
    padding: 12px 4px 16px 4px;
    min-height: 210px;
  }
}
</style>
