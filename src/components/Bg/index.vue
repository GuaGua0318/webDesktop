<template>
  <div class="bg">
    <div v-if="props.bgCount === 0" class="img" style="background-color: #333;"></div>
    <img v-else class="img" :src="imgArr[props.bgCount - 1]"  alt="">
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import img1 from '@/assets/v1.jpg'
import img2 from '@/assets/v2.jpg'

const props = defineProps(['bgCount'])
const imgArr = [img1,img2]

</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -999999;

  .img {
    width: 100%;
    height: 100%;
  }
}
</style>