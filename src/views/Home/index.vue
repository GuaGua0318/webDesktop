<template>
<Bg :bgCount="bgCount"></Bg>
<div style="margin:0 auto;width: 600px;padding-top:50px;margin-bottom:20px">
  <el-space>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="切换壁纸"
        placement="top-start"
      >
      <el-icon size="30" color="#fff" style="cursor: pointer;"><Refresh @click="() => toggleBg()"/></el-icon>
      </el-tooltip>
    
  </el-space>
  <el-space>
    <el-switch style="margin-left:10px;margin-right: 10px;" v-model="value1" inline-prompt active-text="开灯"
    inactive-text="关灯" @change="() => toggleDark()"/>
    <!-- <button @click="toggleDark()">受到充分的水分</button> -->
  </el-space>
  <el-space>
    <Searchs></Searchs>
  </el-space>
</div>

<el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="User" name="first">
      <el-row>
    <el-col :span="10" :offset="1"> <Navigation></Navigation></el-col>
    <el-col :span="10" :offset="2"> <Todo></Todo></el-col>
  </el-row>
    </el-tab-pane>
    <el-tab-pane label="小记" name="second">
      <Note></Note>
    </el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>


</template>

<script setup lang="ts">
import Bg from "../../components/Bg/index.vue";
import Navigation from "../../components/Navigation/index.vue";
import Todo from "../../components/Todo/index.vue";
import Searchs from "../../components/Search/index.vue";
import Note from "../Note/index.vue";
import { ref } from "vue";
import { Search,Refresh } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
import { ElMessage } from 'element-plus'


const bgCount = ref(1)
const value1 = ref(true)

const open4 = () => {
  ElMessage.error('关灯模式下不能切换壁纸')
}

const isDark = useDark();
const toggleDark = () => {
  useToggle(isDark);
  if(value1.value){
    // valu1.value = true;
    bgCount.value = 1;
  }else{
    // value1.value = false;
    bgCount.value = 0;
  }

};
 
const toggleBg = () => {
  if(!value1.value){
    open4();
    return false;
  }
  if(bgCount.value === 2){
    bgCount.value = 1;
  }else {
    bgCount.value++;
  }
}

</script>

<style lang="scss" scoped>

</style>