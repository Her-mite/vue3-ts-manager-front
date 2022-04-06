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
            >
                <el-table-column prop="websiteName" label="网站名称" />
                <el-table-column prop="websiteAddress" label="网站地址">
                    <template v-slot="scope">
                        <a :href="scope.row.websiteAddress" target="_blank">{{
                            scope.row.websiteAddress
                        }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注" />
            </el-table>
        </el-card>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['tableData'],
});
</script>

<style>
</style>