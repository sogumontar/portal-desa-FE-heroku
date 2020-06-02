import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VModal from "vue-js-modal";
import numeral from "numeral";
import numFormat from "vue-filter-number-format";

Vue.filter("numFormat", numFormat(numeral));

Vue.use(VModal);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
