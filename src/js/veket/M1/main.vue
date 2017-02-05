<template>
    <div>
        <div>this is m1</div>
        <hello-component></hello-component>
    </div>
</template>
<style>
</style>
<script>
    import HelloWorld from '../../components/HelloWorld/main.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'hello-component':HelloWorld
        }
    }
</script>
