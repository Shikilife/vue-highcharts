import { createApp } from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import TreemapModule from 'highcharts/modules/treemap'

const app = createApp(App)
app.use(HighchartsVue)
app.mount('#app')
