<template>
<Bg :bgCount="bgCount"></Bg>
<button @click="toggleBg">切换壁纸</button>
</template>

<script setup lang="ts">
import Bg from "../../components/Bg/index.vue";
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