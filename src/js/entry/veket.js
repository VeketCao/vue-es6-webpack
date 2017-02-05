/**
 * Created by Veket on 2017/2/4.
 */
import Vue from 'vue';
import App from '../veket/App/main.vue';
import router from '../veket/Routes/main';

import '../../css/base.css';

//router.start(App,'#app');

new Vue({
    router:router,
    render: h => h(App)
}).$mount('#app');

if (__DEV__) {
    console.info('[当前环境] 开发环境');
    Vue.config.devtools = true;
}

if (__PROD__) {
    console.info('[当前环境] 生产环境');
    Vue.config.devtools = false;
}
