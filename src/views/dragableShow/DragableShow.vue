<template>
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
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="optional-card-item choose-item-shape">
            {{ element.name }}
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
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </el-card>

    <!-- 完成 -->
    <el-card class="complate-card">
      <template #header>
        <div class="card-header">
          <span>完成</span>
        </div>
      </template>
      <draggable
        v-model="complateItem"
        group="people"
        class="choose-item-group"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="complate-card-item choose-item-shape">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import draggable from 'vuedraggable';

export default defineComponent({
  components: { draggable },
  setup() {
    const data = reactive({
      drag: false,
      // 备选项
      optionalItem: [
        { people: 'cn', id: 10, name: '小明' },
        { people: 'cn', id: 20, name: '小红' },
        { people: 'zh', id: 30, name: 'Karen' },
        { people: 'zh', id: 40, name: 'Mary' },
      ],
      // 待办项
      todoItem: [],
      // 完成项
      complateItem: [],
    });
    return { ...toRefs(data) };
  },
});
</script>

<style scoped>
.todolist-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* 选项组样式 */
.choose-item-group {
  display: flex;
  height: 600px;
}

.choose-item-shape {
  border: solid 1px #e6decf;
  width: 60px;
  height: 30px;
  line-height: 30px;
  align-items: center;
  border-radius: 15px;
  margin: 3px;
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
.complate-card {
  height: 640px;
  width: 32%;
}
:deep(.complate-card .el-card__header) {
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
}
.complate-card-item {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>
