<template>
  <div>
    <!-- 选择桶信息 -->
    <div class="bucket-name">
      <el-select
        v-model="bucketName"
        class="bucket-select"
        placeholder="Select"
        size="small"
        @change="changeBucket"
      >
        <el-option
          v-for="item in bucketNameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <!-- 展示桶信息 -->
    <div class="bucket-list">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{}" @click="chooseFile(bucketName, true)">{{
            bucketName
          }}</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in prefixArray"
            :key="index"
            :to="{}"
            @click="chooseFile(item, true)"
            >{{ item }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <!-- 上传组件 -->
      <el-button
        class="addButton"
        type="default"
        size="small"
        @click="addVisible = true"
        >创建文件夹</el-button
      >
      <el-upload
        class="upload-object"
        action="upload"
        :limit="1"
        :http-request="uploadServiceFile"
        :on-change="fileChange"
        :headers="headers"
        :file-list="fileList"
      >
        <el-button class="addButton" type="primary" size="small"
          >上传文件<el-icon><upload-filled /></el-icon
        ></el-button>
      </el-upload>
    </div>

    <!-- 对象存储数据表格 -->
    <div>
      <el-table
        :data="tableData"
        height="550"
        style="width: 100%"
        class="data-table"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="name" label="文件名" min-width="40%">
          <template v-slot="scope">
            <div class="file-name-item">
              <i
                :class="
                  scope.row.name.charAt(scope.row.name.length - 1) == '/'
                    ? 'icon-liebiao-1'
                    : 'icon-wenjian'
                "
              ></i>
              <a class="hover-point" @click="chooseFile(scope.row.name)">{{
                scope.row.name
              }}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastModified" label="修改时间" min-width="20%" />
        <el-table-column prop="size" label="文件大小" min-width="20%" />
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <div
              v-show="scope.row.name.charAt(scope.row.name.length - 1) !== '/'"
            >
              <el-popconfirm
                title="are you sure?"
                @confirm="chooseFile(scope.row.name)"
              >
                <template #reference>
                  <el-button size="default">下载</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                title="你确认要删除么？"
                @confirm="removeObject(scope.row.name)"
                confirmButtonType="primary"
                cancelButtonType="default"
              >
                <template #reference>
                  <el-button size="default" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增文件夹" v-model="addVisible" width="30%">
      <el-input v-model="folderName" placeholder="请输入文件夹名" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="createFolder()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axiosRequest from '@/utils/axiosRequest';
import { ElMessage } from 'element-plus';
import { defineComponent, onMounted, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const bucketName = ref('software');
    const folderName = ref('');
    const addVisible = ref(false);

    const prefixArray = reactive([]);
    const bucketNameOptions = reactive([]);
    const tableData = reactive([]);
    const fileList = reactive([]);
    // 跨域访问请求头
    const headers = {
      authorization: 'authorization-text',
      'Access-Control-Allow-Origin': '*',
    };

    onMounted(() => {
      getBucketName();
      getObjectList();
    });

    const tableRowClassName = ({ row }) => {
      if (row.name.indexOf('/') === -1) {
        return '';
      }
      return 'success-row';
    };

    // 修改请求桶信息
    const changeBucket = async (value) => {
      // 数据清空
      tableData.length = 0;
      prefixArray.length = 0;
      bucketName.value = value;
      getObjectList();
    };

    // 获取桶名列表
    const getBucketName = async () => {
      const response = await axiosRequest.get('/api/minio/getBucketName');
      response.data.map((item) => {
        bucketNameOptions.push({ label: item, value: item });
      });
    };

    // 获取当前路径下所有数据信息
    const getObjectList = async () => {
      const params = {
        bucketName: bucketName.value,
        prefix: prefixArray.join('/') + '/',
      };
      const response = await axiosRequest.get('/api/minio/getObjectList', {
        params,
      });
      tableData.length = 0;
      tableData.push(...response.data);
    };

    // 选择文件或文件夹
    const chooseFile = async (filePath, breadcrumb = false) => {
      // 导航栏点击跳转逻辑
      if (breadcrumb) {
        prefixArray.length = prefixArray.indexOf(filePath) + 1;
        getObjectList();
      } else if (filePath.charAt(filePath.length - 1) == '/') {
        // 选中的是文件夹 进入子文件夹
        prefixArray.push(filePath.slice(0, filePath.length - 1)); // 将选择文件路径加入路由 去掉/
        getObjectList();
      } else {
        // 下载文件
        try {
          const response = await axiosRequest.post(
            '/api/minio/downloadObject',
            {
              bucketName: bucketName.value,
              romoteFileName: prefixArray.join('/') + '/' + filePath,
              localFileName: './uploads/' + filePath,
              responseType: 'blob',
            }
          );
          let blob = new Blob([response], {
            type: 'application/msword',
          });
          let objectUrl = URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = objectUrl;
          a.download = filePath;
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
      }
    };

    // 上传文件后添加到缓存
    const fileChange = (file) => {
      fileList.push(file.raw);
    };

    // 请求到后端接口,上传对应项目代码
    const uploadServiceFile = async (val) => {
      const form = new FormData();
      const newFilePath = prefixArray.join('/') + '/';

      form.append('file', val.file);
      form.append('bucketName', bucketName.value);
      form.append('uploadFileName', newFilePath + val.file.name);
      form.append('localFileName', './uploads/' + val.file.name);

      const response = await axiosRequest.post('/api/minio/uploadObject', form);
      if (response.status !== 200) {
        console.log(response);
        ElMessage.error('上传失败');
        fileList.length = 0;
        return;
      }
      ElMessage.success('上传成功');
      fileList.length = 0;
      getObjectList();
    };

    // 创建文件夹
    const createFolder = async () => {
      const newFilePath = prefixArray.join('/') + '/' + folderName.value + '/';

      const response = await axiosRequest.post('/api/minio/uploadObject', {
        fileName: newFilePath,
      });
      if (response.status !== 200) {
        console.log(response);
        ElMessage.error('文件夹创建失败');
        return;
      }
      ElMessage.success('文件夹创建成功');
      getObjectList();
    };

    // 删除对象
    const removeObject = async (fileName) => {
      console.log('fileName', fileName);
      const response = await axiosRequest.post('/api/minio/removeObject', {
        bucketName: bucketName.value,
        remoteFileName: prefixArray.join('/') + '/' + fileName,
      });
      console.log(response);
      if (response.status !== 200) {
        console.log(response);
        ElMessage.error('删除对象失败');
        return;
      }
      ElMessage.success('删除对象成功');
      getObjectList();
    };

    return {
      bucketNameOptions,
      bucketName,
      folderName,
      prefixArray,
      tableData,
      headers,
      fileList,
      addVisible,

      changeBucket,
      getObjectList,
      chooseFile,
      fileChange,
      uploadServiceFile,
      createFolder,
      removeObject,
      tableRowClassName,
    };
  },
});
</script>

<style scoped>
.bucket-name {
  display: flex;
  justify-content: flex-start;
}
.bucket-select {
  width: 100px;
}
.el-select-dropdown__item {
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  padding-left: 10px;
}

.bucket-list {
  display: flex;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
}
.breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
}
.addButton {
  margin-right: 20px;
}

.data-table {
  margin-top: 15px;
}

.file-name-item {
  display: flex;
  justify-content: flex-start;
  align-content: center;
}
.hover-point {
  cursor: pointer;
  margin-left: 10px;
  color: black;
}
:deep .el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
:deep .el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
