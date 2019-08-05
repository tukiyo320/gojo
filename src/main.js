import Vue from 'vue'
import App from './App.vue'
import DragDrop from 'vue-drag-drop'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(DragDrop);
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
