<template>
  <div class="md-container">
    <div class="article-cascader">
      <el-cascader
        :props="pathProps"
        @change="getFileContent"
        :show-all-levels="false"
        v-model="defaultValue"
      />
      <!-- 切换显示方式 -->
      <el-radio-group
        class="display-button"
        v-model="markdownType"
        size="default"
      >
        <el-radio-button label="preview">预览</el-radio-button>
        <el-radio-button label="editor">编辑</el-radio-button>
      </el-radio-group>
    </div>
    <el-scrollbar height="590px">
      <!-- 预览模式 -->
      <!-- <v-md-preview
        v-show="markdownType === 'preview'"
        :text="file_content"
        class="md-view"
      ></v-md-preview> -->
      <!-- 编辑模式 -->
      <v-md-editor
        class="md-view"
        v-model="file_content"
        :mode="markdownType"
        @save="saveArticle"
      ></v-md-editor>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const rootPath = './uploads/markdownFile'; // 文档存放根目录
let file_content = ref('# 文档查看 ');
let markdownType = ref('preview');
let filePath = ref('');
let defaultValue = ref('notes.md');

onMounted(async () => {
  // 获取后端文件内容
  const response = await axiosRequest.get('/api/file/getFileContent', {
    params: { filePath: rootPath + '/notes.md' },
  });
  if (response.status !== 200) {
    ElMessage.error('文件内容获取失败');
    return;
  }
  file_content.value = response.data;
});

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
    filePath.value = rootPath + '/' + pathValue.join('/');
    // 获取后端文件内容
    const response = await axiosRequest.get('/api/file/getFileContent', {
      params: { filePath: filePath.value },
    });
    if (response.status !== 200) {
      ElMessage.error('文件内容获取失败');
      return;
    }
    // console.log(response);
    file_content.value = response.data;
  }
};

// 保存内容
const saveArticle = async (dataString) => {
  const response = await axiosRequest.post('/api/file/writeFile', {
    dataString,
    filePath: filePath.value || rootPath + '/notes.md',
  });
  if (response.status !== 200) {
    ElMessage.error('数据更新失败');
    return;
  }
  ElMessage.success('数据更新成功');
};
</script>

<style scoped>
.vuepress-markdown-body {
  height: 580px;
}
.article-cascader {
  display: flex;
  /* width: 25%; */
  justify-content: flex-start;
  margin-bottom: 20px;
}
.display-button {
  margin-left: 20px;
}

/* markdown 靠左展示 */
.md-view,
:deep(.github-markdown-body) {
  text-align: left;
}
</style>
