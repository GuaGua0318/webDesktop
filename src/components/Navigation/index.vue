<template>
  <div class="bg">
    <div class="search">
      <el-input v-model="input1" @input="search" style="width: 240px" size="large" placeholder="Please Input" :suffix-icon="Search" clearable />
    </div>
    <div class="itemBox">
      <div class="item" v-for="item in navListCopy" @click="() => goLink(item.url)">
        <img :src="item.img" alt="">
        <p>{{ item.txt }}</p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { navList } from '../../global';
const input1 = ref('')
var navListCopy = ref(navList)


//跳转
const goLink = (url:string) => {
  window.open(url)
}
//搜索
const search = (val:string) => {
  navListCopy = navList.filter((item) => item.txt.includes(val))
}

</script>

<style scoped>
.bg {
  padding-top: 10px;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.2);
  .search{
    text-align: center;
  }
  .itemBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 10px;
    .item{
      flex: 1;
      border: 1px solid pink;
      margin: 0 5px 5px 0;
      width: calc((100% - 20px) / 5);
      min-width: calc((100% - 20px) / 5);
      max-width: calc((100% - 20px) / 5);
      cursor: pointer;
      color: #fff;
      img{
        width: 100%;
      }
      p{
        text-align: center;
      }
    }
    .item:nth-child(5n){
      margin-right: 0;
    }
  }
}
</style>