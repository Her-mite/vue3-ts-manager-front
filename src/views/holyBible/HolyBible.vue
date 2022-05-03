<template>
  <el-cascader-panel
    :props="pathProps"
    @change="chooseFile"
    placeholder="选择上传路径"
  />

  <!-- 内容组件 -->
  <div v-html="article_content"></div>

  <!-- 音频组件 -->
  <audio class="myaudio" v-if="audio_path" :src="audio_path" controls></audio>
</template>

<script setup>
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const rootPath = '/home/hujq/wyy_front/data'; // 文档存放根目录
// const rootPath = '/Users/hujq/Documents/code'; // 文档存放根目录
const audio_path = ref('');
const article_content = ref('');

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
      queryType: 'mp3',
    };
    const response = await axiosRequest.get('/api/file/getCurrentFiles', {
      params,
    });

    if (response.status !== 200) {
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
  const pathPrefix = pathValue.join('/').split('.')[0];
  audio_path.value = `http://1.117.188.206/${pathPrefix}.mp3`;
  // 获取后端数据
  const response = await axiosRequest.get('/api/file/getFileContent', {
    params: { filePath: `/home/hujq/wyy_front/data/${pathPrefix}.html` },
  });
  // 检查交易是否成功
  if (response.status !== 200) {
    ElMessage.error('后端数据获取失败');
    return;
  }
  article_content.value = response.data;
}
</script>

<style scoped>
.myaudio {
  width: 100%;
  padding: 0;
  position: absolute;
  bottom: 0;
  left: 0;
}
.content {
  width: 100%;
  min-height: 100%;
  border: 0;
}
</style>
