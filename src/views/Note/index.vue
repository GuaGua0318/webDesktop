<template>
  <el-row>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple" />
      <el-card class="card" style="background-color: rgba(255, 255, 255, 0.5);">
        <template #header>
          <div class="card-header" style="color: #333;">
            <span>小记</span>
            <el-button @click="() => addEdit()" type="primary" class="addBtn"><el-icon>
                <Edit />
              </el-icon>添加</el-button>
          </div>
        </template>
        <div class="cardBody" style="color: #333;">
          <div class="item" v-for="item in noteList" v-html="item.content" style="cursor: pointer;"
            @click="() => getNoteDetail(item.noteId)" @contextmenu.prevent="() => rightMenu()">
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
import { ref, reactive, onMounted } from 'vue';
import { openDB, addData, cursorGetData, getDataByKey } from '../../utils/indexDb';

interface editContent {
  content: string,
  noteId: number
}

const editContent = ref<any>(null)
const noteList = ref<any>(null)

onMounted(async () => {
  const desktop = await openDB('desktop');
  //获取note列表
  const noteArr = await cursorGetData(desktop, 'note')
  noteList.value = noteArr
})

//查询单项note详情
const getNoteDetail = async (id: number) => {
  const desktop = await openDB('desktop');
  const test = <editContent>await getDataByKey(desktop, 'note', id)
  editContent.value = test.content;
}

//点击添加时候在内存中添加一条note，不保存退出即清除
const addEdit = () => {
  editContent.value = '';
  noteList.value.unshift({ content: '无内容或未保存' })
}

//鼠标右击菜单
const rightMenu = (event) => {
  event.preventDefault()
  console.log('testtest-----')
}

//删除一条note
// const deleteNote = () => {

// }


FroalaEditor.DefineIcon('save', { NAME: 'info', SVG_KEY: "help" });
FroalaEditor.RegisterCommand('save', {
  title: '保存',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  //保存小记
  callback: async function () {
    const desktop = await openDB('desktop')
    await addData(desktop, 'note', { content: editContent.value })
    const noteArr = await cursorGetData(desktop, 'note')
    noteList.value = noteArr
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