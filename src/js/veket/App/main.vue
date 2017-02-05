<template>
    <div class="app-container">
        <header-component/>
        <div class="app-content-container">
            <router-view></router-view>
        </div>
        <footer-component/>
    </div>
</template>
<style>
.app-container{
   margin: 0 auto;
   background: #fff;
   padding:0;
   height:100%;
}
.app-content-container{
   width:100%;
   min-height: 660px;
   background: #fff;
}
</style>
<script>
    import HeaderComponent from '../Header/main.vue'
    import FooterComponent from '../Footer/main.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'footer-component':FooterComponent,
            'header-component':HeaderComponent,
        }
    }
</script>
