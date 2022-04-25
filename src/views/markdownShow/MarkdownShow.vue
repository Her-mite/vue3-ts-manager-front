<template>
  <div class="md-container">
    <div class="article-cascader">
      <el-cascader
        :props="pathProps"
        @change="getFileContent"
        :show-all-levels="false"
      />
    </div>
    <el-scrollbar height="590px">
      <v-md-preview :text="file_content" class="md-view"></v-md-preview>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const rootPath = './uploads'; // 文档存放根目录
let file_content = ref('# 文档查看 ');

const pathProps = {
  lazy: true,
  checkStrictly: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async lazyLoad(node: any, resolve: any) {
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
      queryType: 'files',
    };
    const response = await axiosRequest.get('/api/file/getCurrentFiles', {
      params,
    });

    if (response.status !== 200) {
      console.log(response);
      ElMessage.error('获取路径失败');
      return;
    }

    const nodes = response.data.map((item: string) => ({
      value: item,
      label: item,
    }));

    resolve(nodes);
  },
};
const getFileContent = async (pathValue: string[]) => {
  const fileName = pathValue[pathValue.length - 1];
  if (fileName.includes('.')) {
    // 获取文本内容
    const filePath = rootPath + '/' + pathValue.join('/');
    // console.log('getasda', filePath);
    // 获取后端文件内容
    const response = await axiosRequest.get('/api/file/getFileContent', {
      params: { filePath },
    });
    if (response.status !== 200) {
      ElMessage.error('文件内容获取失败');
      return;
    }
    // console.log(response);
    file_content.value = response.data;
  }
};
</script>

<style scoped>
.vuepress-markdown-body {
  height: 580px;
}
.article-cascader {
  width: 25%;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.md-view {
  text-align: left;
}
</style>
