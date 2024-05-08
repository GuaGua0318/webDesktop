<template>
  <div class="bg">
    <div v-if="props.bgCount === 0" class="img" style="background-color: #333;"></div>
    <img v-else class="img" :src="`@/assets/v${props.bgCount}.jpg`" alt="">
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['bgCount'])

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