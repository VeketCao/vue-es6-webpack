<template>
    <div>
        <div>this is m1</div>
        <hello-component></hello-component>
        <el-button type="primary">Element按钮</el-button>
    </div>
</template>
<style>
</style>
<script>
    import HelloWorld from '../../components/HelloWorld/main';
    import {Button} from 'element-ui';

    Vue.component(Button.name,Button);

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
