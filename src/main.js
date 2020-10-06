import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/styles/global.scss";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("loading-overlay", Loading);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
