<!-- 普通表格组件， 适配列表复用 -->
<template>
  <div>
    <!-- 网站列表 -->
    <el-card>
      <el-table
        :data="tableData"
        row-key="id"
        default-expand-all
        stripe
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
        border
        style="width: 100%"
      >
        <el-table-column prop="WebsiteName" label="网站名称" min-width="28%" />
        <el-table-column prop="WebsiteAddress" label="网站地址">
          <template v-slot="scope">
            <a :href="scope.row.WebsiteAddress" target="_blank">{{
              scope.row.WebsiteAddress
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="Remarks"
          label="备注"
          min-width="35%"
          show-overflow-tooltip
        />
        <el-table-column label="操作" min-width="24%">
          <template #default="scope">
            <el-popconfirm 
              title="Are you sure to delete this?"
              @confirm="notifyFather(scope.row)">
              <template #reference>
                <el-button
                  size="small"
                  type="danger"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['tableData'],
  setup(props, context) {
    const notifyFather = (row) => {
      console.log(row.WebsiteName);
      context.emit('handleDelete', row.WebsiteName);
    };
    return {
      notifyFather,
    };
  },
});
</script>

<style scoped></style>
