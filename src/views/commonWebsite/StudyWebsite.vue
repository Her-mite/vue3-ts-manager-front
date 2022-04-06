<template>
  <main>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <div class="breadcrumbItem"><i class="icon-shuji"></i> 学习网站</div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 网页列表 -->
    <el-scrollbar>
      <el-row justify="space-around">
        <div class="normalTable">
          <normal-table :tableData="websiteTableLeft" />
        </div>
        <div class="normalTable">
          <normal-table :tableData="websiteTableRight" />
        </div>
      </el-row>
      <el-button
        class="addButton"
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="addWebsiteFrom"
        >新增一行</el-button
      >
    </el-scrollbar>

    <!-- 新增弹出框 -->
    <el-dialog title="编辑" v-model="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="网站名称">
          <el-input v-model="form.website_name"></el-input>
        </el-form-item>
        <el-form-item label="网站地址">
          <el-input v-model="form.website_address"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addWebsiteCheck">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import NormalTable from '@/components/NormalTable.vue';

export default defineComponent({
  components: { NormalTable },
  setup() {
    const websiteTable = [
      {
        websiteName: '百度1',
        websiteAddress: 'http://www.baidu.com',
        remarks: '备注内容',
      },
      {
        websiteName: '百度2',
        websiteAddress: 'http://www.baidu.com',
        remarks: '备注内容',
      },
      {
        websiteName: '百度3',
        websiteAddress: 'http://www.baidu.com',
        remarks: '备注内容',
      },
    ];
    const websiteTableLeft = websiteTable.filter(
      (item, index) => index % 2 === 0
    );
    const websiteTableRight = websiteTable.filter(
      (item, index) => index % 2 === 1
    );

    return { websiteTableLeft, websiteTableRight };
  },
});
</script>

<style scoped>
.crumbs {
  margin-bottom: 10px;
}
.breadcrumbItem {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.normalTable {
  width: 49%;
}
</style>
