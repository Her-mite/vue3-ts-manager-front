<template>
  <div>
    <!-- 下载 -->
    <div class="download-container">
      <el-card class="box-card">
        <el-scrollbar>
          <el-cascader-panel :props="pathProps" @change="chooseFile" />
        </el-scrollbar>
        <el-button type="primary" class="download-button" @click="downloadFile">
          下载文件
        </el-button>
      </el-card>
    </div>

    <!-- 上传 -->
    <el-card class="box-card">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>

        <div class="el-upload__text">
          <el-button>上传文件</el-button>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </el-card>
  </div>
</template>

<script setup>
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const rootPath = './uploads'; // 文档存放根目录
const filePath = ref('');
const fileName = ref('');

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

    const nodes = response.data.map((item) => ({
      value: item,
      label: item,
    }));

    resolve(nodes);
  },
};
// 文件选择
const chooseFile = async (pathValue) => {
  filePath.value = rootPath + '/' + pathValue.join('/');
  fileName.value = pathValue[pathValue.length - 1];
};

// 文件下载
const downloadFile = async () => {
  if (!fileName.value.includes('.')) {
    ElMessage.error('仅支持下载文件');
    return;
  }
  try {
    const response = await axiosRequest.post('/api/file/downloadFile', {
      fileName: fileName.value,
      localFileName: filePath.value,
      responseType: 'blob',
    });
    let blob = new Blob([response], {
      type: 'application/msword',
    });
    let objectUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName.value;
    a.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    window.URL.revokeObjectURL(blob);
  } catch (error) {
    ElMessage.error('文件下载失败');
    console.log(error);
    return;
  }
};
</script>

<style scoped>
.download-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
.download-button {
  margin-top: 15px;
}
</style>
