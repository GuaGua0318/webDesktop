<template>
<Bg :bgCount="bgCount"></Bg>
<div>
  <button @click="toggleBg">切换壁纸</button>
</div>
<el-row :gutter="20">
    <el-col :span="10"> <Navigation></Navigation></el-col>
  </el-row>

</template>

<script setup lang="ts">
import Bg from "../../components/Bg/index.vue";
import Navigation from "../../components/Navigation/index.vue";
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