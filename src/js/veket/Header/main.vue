<template>
    <div class="g-header">
        <div class="g-wrap clear-fix">
            <ul class="header-nav">
                <li> <router-link :to="{ name: 'home' }">首页</router-link></li>
                <li> <router-link :to="{ name: 'm1' }">m1</router-link></li>
                <li><router-link :to="{ name: 'm2' }">m2</router-link></li>
            </ul>
        </div>
    </div>
</template>
<style >
.g-header .header-nav{
 float:left;
}
.g-header .header-nav li{
    float:left;height: 100%;padding: 0px 10px 8px 10px;
}
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
    }
</script>
