import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers,faClock, faCloudSunRain,faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'  

import "@/assets/scss/global.scss";
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
library.add(faUsers,faClock,faCloudSunRain,faMapMarkedAlt);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
 
