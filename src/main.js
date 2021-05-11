import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, ProgressPlugin} from 'bootstrap-vue'
import './style/app.scss'

Vue.use(BootstrapVue)
Vue.use(ProgressPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
