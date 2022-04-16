<template>
  <main>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <div class="breadcrumbItem">
            <i class="icon-shuji"></i> {{ websiteName }}
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        class="addButton"
        type="primary"
        size="small"
        @click="addVisible = true"
        >新增一行<el-icon><plus /></el-icon
      ></el-button>
    </div>
    <!-- 网页列表 -->
    <el-scrollbar>
      <el-row justify="space-around">
        <div class="normalTable">
          <normal-table
            :tableData="websiteTableLeft"
            :needRemarks="needRemarks"
            @handleDelete="handleDelete"
          />
        </div>
        <div class="normalTable">
          <normal-table
            :tableData="websiteTableRight"
            :needRemarks="needRemarks"
            @handleDelete="handleDelete"
          />
        </div>
      </el-row>
    </el-scrollbar>

    <!-- 新增弹出框 -->
    <el-dialog title="新增网址" v-model="addVisible" width="30%">
      <el-form
        :model="addWebsiteForm"
        ref="addWebsiteFormRef"
        :rules="rules"
        label-width="70px"
        abel-position="left"
      >
        <el-form-item label="网站名称" prop="WebsiteName">
          <el-input v-model="addWebsiteForm.WebsiteName"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="WebsiteAddress">
          <el-input v-model="addWebsiteForm.WebsiteAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addWebsiteForm.Remarks"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addWebsiteCheck(addWebsiteFormRef)"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import NormalTable from '@/components/NormalTable.vue';
import axiosRequest from '@/utils/axiosRequest';

export default defineComponent({
  props: ['websiteType', 'websiteName', 'needRemarks'],

  components: { NormalTable },
  setup(props) {
    onMounted(() => {
      getWebsiteInfo();
    });

    const websiteTableLeft = reactive([]);
    const websiteTableRight = reactive([]);

    // 表单校验规则
    const validateURL = (
      rule: object,
      value: string,
      callback: (arg1?: Error) => void
    ) => {
      const urlRegex =
        '^((https|http|ftp|rtsp|mms)?://)' +
        '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' + //ftp的user@
        '(([0-9]{1,3}\.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
        '|' + // 允许IP和DOMAIN（域名）
        '([0-9a-z_!~*\'()-]+\.)*?' + // 域名- www.
        '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' + // 二级域名
        '[a-z]{2,6})' + // first level domain- .com or .museum
        '(:[0-9]{1,4})?' + // 端口- :80
        '((/?)|' + // a slash isn't required if there is no file name
        '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)';
      const re = new RegExp(urlRegex);

      // 网址正则表达式
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (!re.test(value)) {
        callback(new Error('url format error'));
      } else {
        callback();
      }
    };
    const rules = {
      WebsiteAddress: [{ validator: validateURL, trigger: 'blur' }],
    };
    // 新增提交表单
    const addWebsiteForm = reactive({
      WebsiteName: '',
      WebsiteAddress: '',
      Remarks: '',
      Type: props.websiteType,
    });
    const addWebsiteFormRef = ref();
    const addVisible = ref(false);

    // 提交新增内容
    const addWebsiteCheck = (addWebsiteFormRef: FormInstance) => {
      addWebsiteFormRef.validate((valid, fields) => {
        if (valid) {
          addWebsiteSubmit(addWebsiteForm);
        } else {
          console.log('error submit!', fields);
        }
      });
    };

    // 获取网站数据
    const getWebsiteInfo = async () => {
      // 查询数据库信息
      const params = {
        tableName: 'WebsiteInfo',
        type: props.websiteType,
      };
      const response = await axiosRequest.get('/api/info/getWebsiteInfo', {
        params: params,
      });

      if (response.data.length > 0) {
        const websiteTable = response.data;
        const websiteTableLeftTemp = websiteTable.filter(
          (item: object, index: number) => index % 2 === 0
        );
        // 数据初始化
        websiteTableLeft.length = websiteTableRight.length = 0;
        websiteTableLeft.push(...websiteTableLeftTemp);

        const websiteTableRightTemp = websiteTable.filter(
          (item: object, index: number) => index % 2 === 1
        );
        websiteTableRight.push(...websiteTableRightTemp);
      }
    };

    // 发送后端交易
    const addWebsiteSubmit = async (addWebsiteForm: object) => {
      const response = await axiosRequest.post('/api/info/insertWebsiteInfo', {
        tableName: 'WebsiteInfo',
        tableValue: addWebsiteForm,
      });
      getWebsiteInfo();
      addVisible.value = false;
      console.log(response.data);
      if (response.status === 200) {
        ElMessage.success('网址新增成功');
      } else {
        ElMessage.error('网址新增失败');
      }
    };

    // 删除数据
    const handleDelete = async (deleteValue: string) => {
      const response = await axiosRequest.post('/api/info/deleteDBSingleRow', {
        tableName: 'WebsiteInfo',
        deleteCol: 'WebsiteName',
        deleteValue,
      });

      if (response.status === 200) {
        getWebsiteInfo();
        ElMessage.success('数据删除成功');
      } else {
        ElMessage.error('数据删除失败');
      }
    };

    return {
      websiteTableLeft,
      websiteTableRight,
      addVisible,
      rules,
      addWebsiteForm,
      addWebsiteFormRef,
      addWebsiteCheck,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.crumbs {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.breadcrumbItem {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.normalTable {
  width: 49%;
}
.addButton {
  margin-right: 20px;
}
</style>
