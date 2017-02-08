/**
 * Created by Veket on 2017/2/4.
 * 路由配置
 */
import VueRouter from 'vue-router';
import M1 from '../M1/main.vue';
import M2 from '../M2/main.vue';
import Home from '../Home/main.vue';

Vue.use(VueRouter);

/**路由表**/
const routesMap = [
    { path: '/', redirect: '/home' },
    {path:'/home',name:'home',component:Home},
    {path:'/m1',name:'m1',component:M1},
    {path:'/m2',name:'m2',component:M2}
];


/**路由配置**/
const router = new VueRouter({
    mode:'hash',
    base:__dirname,
    routes:routesMap
});

export default router;