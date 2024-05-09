<template>
  <el-row>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple" />
      <el-card class="card" style="background-color: rgba(255, 255, 255, 0.5);">
        <template #header>
          <div class="card-header">
            <span>小记</span>
            <el-button type="primary" class="addBtn"><el-icon>
                <Edit />
              </el-icon>添加</el-button>
          </div>
        </template>
        <div class="cardBody">
          <div class="item">

          </div>
        </div>

      </el-card>
    </el-col>
    <el-col :span="17">
      <froala id="edit" :tag="'textarea'" :config="config" v-model:value="editContent"></froala>
    </el-col>
  </el-row>


</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import { config } from '../../utils/editConfig'
import FroalaEditor from 'froala-editor';
import { ref } from 'vue';
import {openDB,addData} from '../../utils/indexDb';

const editContent = ref<any>(null)



FroalaEditor.DefineIcon('save', {NAME: 'info', SVG_KEY: "help"});
        FroalaEditor.RegisterCommand('save', {
          title: '保存',
          focus: false,
          undo: false,
          refreshAfterCallback: false,
          //保存小记
          callback: async function () {
            const test = await openDB('test')
            console.log('test-----',test)
            await addData(test,'signalChat',{link:'1',sequenceId:'2',messageType:'3'})
          }
        });

</script>

<style scoped>
.item {
  height: 40px;
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 0 8px 0 8px;
  margin-bottom: 5px;
}
</style>