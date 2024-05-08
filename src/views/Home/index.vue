<template>
<Bg :bgCount="bgCount"></Bg>
<div>
  <button @click="toggleBg">切换壁纸</button>
</div>
<el-row>
    <el-col :span="10" :offset="1"> <Navigation></Navigation></el-col>
    <el-col :span="10" :offset="2"> <Todo></Todo></el-col>
  </el-row>

</template>

<script setup lang="ts">
import Bg from "../../components/Bg/index.vue";
import Navigation from "../../components/Navigation/index.vue";
import Todo from "../../components/Todo/index.vue";
import { ref } from "vue";

const bgCount = ref(1)
 
const toggleBg = () => {
  if(bgCount.value === 2){
    bgCount.value = 1;
  }else {
    bgCount.value++;
  }
}

</script>

<style lang="scss" scoped>

</style>