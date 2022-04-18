<template>
  <div class="article-cascader">
    <el-cascader :options="options" :show-all-levels="false" />
    <v-md-preview :text="str"></v-md-preview>
  </div>
</template>

<script lang="ts" setup>
const options = [
  {
    value: 'value1',
    label: 'lable1',
    children: [
      {
        value: 'vulue11',
        label: '11',
      },
      {
        value: 'vulue11',
        label: '12',
      },
    ],
  },
  {
    value: 'value1',
    label: 'lable1',
    children: [
      {
        value: 'vulue11',
        label: '21',
      },
      {
        value: 'vulue11',
        label: '22',
      },
    ],
  },
];
const str = '# biaode ';
</script>

<style scoped>
.article-cascader {
  width: 25%;
  justify-content: flex-start;
}
</style>
