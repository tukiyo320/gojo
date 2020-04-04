import Vue from 'vue'
import App from './App.vue'
import DragDrop from 'vue-drag-drop'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

library.add(fab);

Vue.component('v-fa', FontAwesomeIcon);

Vue.use(DragDrop);
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
}).$mount('#app');
