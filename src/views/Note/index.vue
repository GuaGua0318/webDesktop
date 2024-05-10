<template>
  <el-row>
    <el-col :span="6" style="margin-left: 15px;">
      <div class="grid-content ep-bg-purple" />
      <el-card class="card" style="background-color: rgba(255, 255, 255, 0.7);">
        <template #header>
          <div class="card-header" style="color: #333;">
            <span style="font-size: 20px;">小记</span>
            <el-button @click="() => addEdit()" style="margin-left: 125px;" type="primary" class="addBtn"><el-icon>
                <Edit />
              </el-icon>添加</el-button>
          </div>
        </template>
        <div class="cardBody" style="color: #333;">
          <div class="item" v-for="(item, index) in noteList" style="cursor: pointer;"
            @click="() => getNoteDetail(item.noteId, item)" @contextmenu.prevent="(e) => rightMenu(e, item.noteId)">
            <div v-html="item.content" style="height: 40px;overflow: hidden;">

            </div>
            <div class="menu" v-show="item.selected"
              :style="{ left: coordinate.x + 'px', top: coordinate.y + 'px', height: coordinate.height + 'px', overflow: coordinate.overflow }">
              <p>置顶</p>
              <p>标记</p>
              <p @click="() => deleteNote(item.noteId)">删除</p>
            </div>
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
import { useMouseInElement } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { openDB, addData, cursorGetData, getDataByKey, deleteDB, updateDB } from '../../utils/indexDb';

interface editContent {
  content: string,
  noteId: number
}
interface coordinate {
  x: number,
  y: number,
  height: number,
  overflow: string
}

const editContent = ref<any>(null)
const noteList = ref<any>(null)
const target = ref(null)
const { x, y, isOutside } = useMouseInElement(target)
const coordinate = ref<coordinate>({
  x: 0,
  y: 0,
  height: 120,
  overflow: 'visible'
})
const editNote = ref<any>(null)  //保存正在操作的note

onMounted(async () => {
  document.addEventListener('click', function () {
    var menus = document.querySelectorAll('.menu');
    for (let i = 0; i < menus.length; i++) {
      menus[i].style.height = '0px';
      menus[i].style.overflow = 'hidden'
    }
  })
  const desktop = await openDB('desktop');
  //获取note列表
  const noteArr = <[]>await cursorGetData(desktop, 'note')
  for (let i = 0; i < noteArr.length; i++) {
    noteArr[i].selected = false;
  }
  noteList.value = noteArr
})

//查询单项note详情
const getNoteDetail = async (id: number, note: any) => {
  editNote.value = note;
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
const rightMenu = (event, id) => {
  // event.preventDefault()
  const arr = noteList.value;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].noteId === id) {
      arr[i].selected = true;
    } else {
      arr[i].selected = false;
    }
  }
  noteList.value = arr;
  const X = x.value, Y = y.value;
  console.log(X, Y)
  coordinate.value = { x: X - 100, y: 20, height: 120, overflow: 'visible' };
}

//删除一条note
const deleteNote = async (id: number) => {
  const desktop = await openDB('desktop');
  await deleteDB(desktop, 'note', id)
  //获取note列表
  const noteArr = <[]>await cursorGetData(desktop, 'note')
  for (let i = 0; i < noteArr.length; i++) {
    noteArr[i].selected = false;
  }
  noteList.value = noteArr
  editContent.value = '';
  ElMessage.success('删除成功');

}



FroalaEditor.DefineIcon('save', { NAME: 'info', SVG_KEY: "help" });
FroalaEditor.RegisterCommand('save', {
  title: '保存',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  //保存小记
  callback: async function () {
    const desktop = await openDB('desktop')
    if (editNote.value) {
      console.log('----edit1', editNote.value)
      const value = { ...editNote.value, content: editContent.value }
      await updateDB(desktop, 'note', value)
    } else {
      console.log('----edit1=2222', editNote)
      await addData(desktop, 'note', { content: editContent.value })
    }
    const noteArr = await cursorGetData(desktop, 'note')
    noteList.value = noteArr
  }
});

</script>

<style scoped>
.cardBody {
  height: 61vh;

  .item {
    height: 40px;
    line-height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 0 8px 0 8px;
    margin-bottom: 5px;
    position: relative;

    .menu {
      width: 100px;
      max-height: 1000px;
      background-color: #fff;
      border-radius: 10px;
      margin-left: 40px;
      text-align: center;
      position: absolute;
      z-index: 99999;
      box-shadow: 1px -2px 6px #333;
      transition: height .3s;

      p {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }

      p:hover {
        background-color: #40BCFF;
      }
    }
  }
}
</style>