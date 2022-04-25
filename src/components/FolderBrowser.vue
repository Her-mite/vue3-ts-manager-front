<template>
  <el-cascader :props="pathProps" @change="chooseFile" placeholder="选择上传路径" />
</template>

<script setup>
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage } from 'element-plus';
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['get-folder']);

const rootPath = './uploads'; // 文档存放根目录
const filePath = ref('');

const pathProps = {
  lazy: true,
  checkStrictly: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async lazyLoad(node, resolve) {
    let { pathValues } = node;
    if (pathValues[0]) {
      if (pathValues[pathValues.length - 1].includes('.')) {
        // 文件
        resolve([]);
        return;
      } else {
        // 文件夹
        pathValues = '/' + pathValues.join('/');
      }
    } else {
      pathValues = '';
    }

    const params = {
      currentPath: rootPath + pathValues,
      queryType: 'folder',
    };
    const response = await axiosRequest.get('/api/file/getCurrentFiles', {
      params,
    });

    if (response.status !== 200) {
      console.log(response);
      ElMessage.error('获取路径失败');
      return;
    }

    const nodes = response.data.map((item) => ({
      value: item,
      label: item,
    }));

    resolve(nodes);
  },
};

// 文件选择
async function chooseFile(pathValue) {
  filePath.value = rootPath + '/' + pathValue.join('/');
  console.log('vv', filePath.value);
  emit('get-folder', filePath.value); //data为传输的数据
}
</script>

<style></style>
