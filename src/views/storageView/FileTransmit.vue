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
    <el-card class="upload-box-card">
      <FolderBrowser @get-folder="getFolder" />
      <el-upload
        class="upload-file"
        drag
        action="upload"
        :headers="headers"
        :limit="1"
        :file-list="fileList"
        :on-change="fileChange"
        :http-request="uploadFile"
        auto-upload
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
import FolderBrowser from '@/components/FolderBrowser.vue';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const rootPath = './uploads'; // 文档存放根目录
const filePath = ref('');
const fileName = ref('');
const uploadFolderPath = ref('');
const fileList = reactive([]);

// 跨域访问请求头
const headers = {
  authorization: 'authorization-text',
  'Access-Control-Allow-Origin': '*',
};

// 上传文件后添加到缓存
const fileChange = (file) => {
  fileList.push(file.raw);
};

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

// 请求到后端接口,上传对应项目代码
const uploadFile = async (val) => {
  if (!uploadFolderPath.value) {
    ElMessage.error('请选择上传路径');
    fileList.length = 0;
    return;
  }
  const form = new FormData();
  form.append('file', val.file);
  form.append('uploadFolderPath', '' + uploadFolderPath.value);
  form.append('uploadFolderPath1', '' + 'temp');
  

  const response = await axiosRequest.post('/api/file/uploadFile', form);
  if (response.status !== 200) {
    console.log(response);
    ElMessage.error('上传失败');
    fileList.length = 0;
    return;
  }
  ElMessage.success('上传成功');
  fileList.length = 0;
};

// 获取子组件传入路由
const getFolder = (value) => {
  uploadFolderPath.value = value;
  console.log('uploadFolderPath.value', uploadFolderPath.value);
};
</script>

<style scoped>
.download-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-card {
  width: 99%;
  margin-bottom: 20px;
}
.download-button {
  margin-top: 15px;
}

:deep(.upload-box-card .el-card__body) {
  /* width: 99%; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
