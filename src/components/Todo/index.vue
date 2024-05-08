<template>
  <div class="box">
    <el-card style="background-color: rgba(255, 255, 255, 0.5);">
      <template #header>
        <div class="card-header">
          <span>今日待办事项</span>
          <el-button type="primary" class="addBtn" @click="dialogVisible = true">添加事项</el-button>
        </div>
      </template>
      <div class="item" v-for="item in itemList">
        <span v-if="item.date && item.date === dayjs().format('YYYY-MM-DD')" style="text-decoration-line: line-through;">{{ item.item }}</span>
        <span v-else>{{ item.item }}</span>
        <div class="btns">
          <el-tag type="primary" style="margin-right: 5px;">待办次数：{{ item.duration }}</el-tag>
          <el-tag v-if="(item.date && item.date === dayjs().format('YYYY-MM-DD')) || item.duration < 1" type="info" style="margin-right: 5px;cursor: pointer;" @click="() => itemProhibit()">完成</el-tag> 
          <el-tag v-else type="success" style="margin-right: 5px;cursor: pointer;" @click="() => okItem(item.id)">完成</el-tag>
          <el-popconfirm title="确定要删除吗？" @confirm="() => deleteItem(item.id)">
            <template #reference>
              <el-tag type="danger" style="cursor: pointer;">删除</el-tag>
            </template>
          </el-popconfirm>

        </div>
      </div>
    </el-card>
  </div>

  <el-dialog v-model="dialogVisible" title="添加事项" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="事项：" prop="item">
        <el-input v-model="ruleForm.item" />
      </el-form-item>
      <el-form-item label="优先级：" prop="priority">
        <el-input-number v-model="ruleForm.priority" :min="1" />
      </el-form-item>
      <el-form-item label="完成次数：" prop="duration">
        <el-input-number v-model="ruleForm.duration" :min="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { ElMessage, dayjs } from 'element-plus'

interface RuleForm {
  item: string,
  priority: number,
  duration: number,
}

const open2 = () => {
  ElMessage({
    message: '事项添加成功',
    type: 'success',
  })
}
const openDelete = () => {
  ElMessage({
    message: '事项删除成功',
    type: 'success',
  })
}
const openOk = () => {
  ElMessage({
    message: '今日事项完成',
    type: 'success',
  })
}
const itemProhibit = () => {
  ElMessage.error('待办次数已为0或者今日已完成')
}


const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const itemList = ref(JSON.parse(<string>window.localStorage.getItem('itemList')))
const ruleForm = reactive<RuleForm>({
  item: '',
  priority: 1,
  duration: 1,
})
const rules = reactive<FormRules<RuleForm>>({
  item: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  priority: [
    { required: true, message: '请选择优先级', trigger: 'blur' },
  ],
  duration: [
    { required: true, message: '请选择完成次数', trigger: 'blur' },
  ],
})

const dialogVisible = ref(false)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { item, priority, duration } = ruleForm
      const value = JSON.stringify([{ item, priority, duration, id: new Date().getTime() }])
      if (!window.localStorage.getItem('itemList')) {
        window.localStorage.setItem('itemList', value)
      } else {
        const itemList = JSON.parse(<string>window.localStorage.getItem('itemList'))
        itemList.push({ item, priority, duration, id: new Date().getTime() })
        itemList.sort((a, b) => {
          b.priority - a.priority
        })
        window.localStorage.setItem('itemList', JSON.stringify(itemList))
      }
      itemList.value = JSON.parse(<string>window.localStorage.getItem('itemList'))
      dialogVisible.value = false;
      open2()

    } else {
      console.log('error submit!', fields)
    }
  })
}

//删除item
const deleteItem = (id: number) => {
  const value = JSON.parse(<string>window.localStorage.getItem('itemList')).filter((item) => item.id !== id);
  window.localStorage.removeItem('itemList');
  window.localStorage.setItem('itemList', JSON.stringify(value));
  itemList.value = JSON.parse(<string>window.localStorage.getItem('itemList'))
  openDelete()
}

//完成事项
const okItem = (id: number) => {
  const value = JSON.parse(<string>window.localStorage.getItem('itemList'));
  for (let i = 0; i < value.length; i++) {
    if (value[i].id === id && value[i].duration > 0 && (!value[i].date || value[i].date !== dayjs().format("YYYY-MM-DD"))) {
      value[i].duration--;
      value[i].date = dayjs().format("YYYY-MM-DD")
      openOk()
    }
  }
  window.localStorage.removeItem('itemList');
  window.localStorage.setItem('itemList', JSON.stringify(value));
  itemList.value = JSON.parse(<string>window.localStorage.getItem('itemList'))
}


</script>

<style scoped>
.box {
  .item {
    height: 40px;
    line-height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 0 8px 0 8px;
    margin-bottom: 5px;
    position: relative;

    .btns {
      position: absolute;
      right: 10px;
      top: -2px;
    }
  }

  .card-header {
    position: relative;

    .addBtn {
      position: absolute;
      right: 0px;
    }
  }

}
</style>