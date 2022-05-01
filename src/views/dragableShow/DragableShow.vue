<template>
  <div>
    <div class="date-picker">
      <el-date-picker
        v-model="listDate"
        type="date"
        :editable="false"
        @change="chooseDate"
        placeholder="Pick a day"
      />

      <div class="append-item">
        <el-input v-model="appendItem" placeholder="Please input">
          <template #append>
            <el-button @click="appendItemFunc">新增事项</el-button>
          </template>
        </el-input>
      </div>

      <el-button
        class="confirm-button"
        type="primary"
        @click="updateDateList(false)"
      >
        提交
      </el-button>
    </div>

    <div class="todolist-wrap">
      <!-- 备选列表 -->
      <el-card class="optional-card">
        <template #header>
          <div class="card-header">
            <span>备选</span>
          </div>
        </template>
        <draggable
          v-model="optionalItem"
          group="people"
          class="choose-item-group"
          @start="dragStart"
          @end="dragEnd"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="optional-card-item choose-item-shape">
              {{ element }}
            </div>
          </template>
        </draggable>
      </el-card>

      <!-- 待办列表 -->
      <el-card class="todo-card">
        <template #header>
          <div class="card-header">
            <span>待办</span>
          </div>
        </template>
        <draggable
          v-model="todoItem"
          group="people"
          class="choose-item-group"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="todo-card-item choose-item-shape">
              {{ element }}
            </div>
          </template>
        </draggable>
      </el-card>

      <!-- 完成 -->
      <el-card class="complete-card">
        <template #header>
          <div class="card-header">
            <span>完成</span>
          </div>
        </template>
        <draggable
          v-model="completeItem"
          group="people"
          class="choose-item-group"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="complete-card-item choose-item-shape">
              {{ element }}
            </div>
          </template>
        </draggable>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import draggable from 'vuedraggable';
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage, ElMessageBox } from 'element-plus';
import { draggableItem } from '@/utils/interface';

export default defineComponent({
  components: { draggable },
  setup() {
    const data = reactive({
      listDate: '', // 日期
      appendItem: '', // 添加项名称
      drag: false,
      // 备选项
      optionalItem: [],
      // 待办项
      todoItem: [],
      // 完成项
      completeItem: [],

      // 查询结果
      dataJson: {},
    });
    const filePath = ref('./uploads/localdata/todolist.json');

    // 选择日期
    const chooseDate = async (date: Date) => {
      // 格式化日期类型
      const year = date.getFullYear();
      let month: unknown = date.getMonth() + 1;
      month = month < 10 ? '0' + month : '' + month;
      let day: unknown = date.getDate();
      day = day < 10 ? '0' + day : day;

      const formatDate = year + (month as string) + (day as string);
      data.listDate = formatDate;
      queryData();
    };

    // 确认要查找的日期，如果不存在将新建
    const queryData = async () => {
      // 获取后端数据
      const response = await axiosRequest.get('/api/file/getFileContent', {
        params: { filePath: filePath.value },
      });

      // 检查交易是否成功
      if (response.status !== 200) {
        ElMessage.error('后端数据获取失败');
        return;
      }
      data.dataJson = JSON.parse(response.data);
      // 获取指定日期数据
      const result = data.dataJson['data'].find((item: draggableItem) => {
        if (item.date === data.listDate) {
          return true;
        } else {
          return false;
        }
      });

      if (!result) {
        ElMessageBox.confirm('未找到日期下数据，是否新建当日事项？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 新建当日事项
          const matterList = {
            date: data.listDate,
            list: {
              optionalList: ['事项1', '事项2'],
              todoList: [] as string[],
              completeList: [] as string[],
            },
          };
          updateDateList(true, matterList);
        });
        return;
      }

      // 清空原有数据
      data.optionalItem.length = 0;
      data.todoItem.length = 0;
      data.completeItem.length = 0;
      // 将获取到的数据赋值
      data.optionalItem.push(...result.list.optionalList);
      data.todoItem.push(...result.list.todoList);
      data.completeItem.push(...result.list.completeList);
    };

    // 修改日期数据事项
    const updateDateList = async (
      isInsert: boolean,
      matterList?: draggableItem
    ) => {
      // 新增数据
      if (isInsert) {
        data.dataJson['data'].push(matterList);
        console.log('dataJosn', data.dataJson);
        const dataString = JSON.stringify(data.dataJson);
        const response = await axiosRequest.post('/api/file/writeFile', {
          dataString,
          filePath: filePath.value,
        });
        if (response.status !== 200) {
          ElMessage.error('数据更新失败');
          return;
        }
        ElMessage.success('数据更新成功');
      } else {
        // 修改指定日期数据数据
        const modifyData = data.dataJson['data'].map((item: draggableItem) => {
          if (item.date === data.listDate) {
            item.list.optionalList = data.optionalItem;
            item.list.todoList = data.todoItem;
            item.list.completeList = data.completeItem;
          }
          return item;
        });
        console.log('modifyData', modifyData);

        data.dataJson['data'] = modifyData;
        console.log('data', data.dataJson);

        const dataString = JSON.stringify(data.dataJson);
        const response = await axiosRequest.post('/api/file/writeFile', {
          dataString,
          filePath: filePath.value,
        });
        if (response.status !== 200) {
          ElMessage.error('数据更新失败');
          return;
        }
        ElMessage.success('数据更新成功');
      }
      queryData();
    };

    // 开始拖拽
    const dragStart = () => {
      data.drag = true;
    };

    // 拖拽结束
    const dragEnd = () => {
      data.drag = false;
    };

    // 新增代办项目
    const appendItemFunc = () => {
      console.log('data', data.appendItem);
      if (data.listDate === '') {
        ElMessage.error('请选择对应日期');
        return;
      } else if (data.appendItem === '') {
        ElMessage.error('请输入内容');
        return;
      }
      data.optionalItem.push(data.appendItem);
      updateDateList(false);
    };
    return {
      ...toRefs(data),
      chooseDate,
      dragStart,
      dragEnd,
      updateDateList,
      appendItemFunc,
    };
  },
});
</script>

<style scoped>
.date-picker {
  margin-bottom: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

.confirm-button {
  margin-left: 10px;
  margin-right: 10px;
}

.append-item {
  margin-left: -150px;
}
.todolist-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* 选项组样式 */
.choose-item-group {
  display: flex;
  min-height: 600px;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
}

.choose-item-shape {
  border: solid 1px #e6decf;
  /* width: 60px; */
  padding-left: 5px;
  padding-right: 5px;
  height: 30px;
  line-height: 30px;
  align-items: center;
  border-radius: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
}
/* 备选列表 */
.optional-card {
  height: 640px;
  width: 32%;
}
:deep(.optional-card .el-card__header) {
  background-image: linear-gradient(
    45deg,
    #ff9a9e 0%,
    #fad0c4 99%,
    #fad0c4 100%
  );
}
.optional-card-item {
  background-image: linear-gradient(
    to right,
    #ffd1ff 0%,
    #fad0c4 1%,
    #fad0c4 100%
  );
}

/* 待办列表 */
.todo-card {
  height: 640px;
  width: 32%;
}
:deep(.todo-card .el-card__header) {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}
.todo-card-item {
  background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
}

/* 已完成列表 */
.complete-card {
  height: 640px;
  width: 32%;
}
:deep(.complete-card .el-card__header) {
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
}
.complete-card-item {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>
