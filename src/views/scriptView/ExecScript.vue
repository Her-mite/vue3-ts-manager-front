<template>
  <div style="padding:20px">
    <!-- 脚本的选择和确认执行 -->
    <div class="select-container">
      <span style="margin-right: 10px">选择脚本</span>
      <el-select v-model="scriptName" placeholder="Select" size="default">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="confirm-button" type="primary" @click="confirmExec">
        确定
      </el-button>
    </div>
    <!-- 输入内容 -->
    <div v-show="scriptName === 'translate'" class="input-title">
      <h3>输入内容</h3>
      <!-- 源语言 -->
      <el-select
        v-model="transData.sourceLanguage"
        placeholder="Select"
        size="default"
      >
        <el-option
          v-for="item in transData.languageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 目标语言 -->
      <el-select
        style="margin-left: 10px"
        v-model="transData.targetLanguage"
        placeholder="Select"
        size="default"
      >
        <el-option
          v-for="item in transData.languageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 输入待翻译内容 -->
      <el-input
        style="margin-top: 10px"
        v-model="transData.textarea"
        :autosize="{ minRows: 3, maxRows: 10 }"
        type="textarea"
        placeholder="请输入需要翻译的内容"
      />
    </div>

    <!-- 执行结果 -->
    <div class="exec-result">
      <h3>执行结果</h3>
      <el-card class="box-card">
        <span v-if="execResult">{{ execResult }}</span>
        <el-empty v-else description="there is no result" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import axiosRequest from '@/utils/axiosRequest';
// 脚本名称
const scriptName = ref('translate');
// 执行结果
const execResult = ref('');

// 翻译脚本相关数据
const transData = reactive({
  textarea: '', // 待翻译内容
  sourceLanguage: 'en', // 源语言
  targetLanguage: 'zh', // 目标语言
  languageOptions: [
    // 语言选项 en-英语 kor-韩文 jp-日语 it-意大利 zh 中文
    {
      value: 'zh',
      label: '中文',
    },
    {
      value: 'en',
      label: '英语',
    },
    {
      value: 'it',
      label: '意大利语',
    },
    {
      value: 'jp',
      label: '日语',
    },
    {
      value: 'kor',
      label: '韩语',
    },
  ],
});

const options = [
  {
    value: 'translate',
    label: '翻译',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];

// 确定执行脚本
const confirmExec = async () => {
  console.log(
    'feq',
    transData.textarea,
    transData.sourceLanguage,
    transData.targetLanguage
  );
  if (!scriptName.value) {
    ElMessage.error('请选择执行脚本');
    return;
  }
  // 执行翻译脚本
  if (scriptName.value === 'translate') {
    const response = await axiosRequest.post('/api/file/execPython', {
      pythonPath: './script/translate.py',
      resultPath: './script/translate_result.txt',
      args: [
        transData.sourceLanguage,
        transData.targetLanguage,
        transData.textarea,
      ],
    });
    if (response.status === 200) {
      execResult.value = response.data;
    }else{
      ElMessage.error('脚本执行失败');
    }
  }
};
</script>

<style scoped>
.select-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.confirm-button {
  margin-left: 20px;
}

.input-title {
  text-align: left;
}

.exec-result {
  margin-top: 10px;
  text-align: left;
}
.box-card {
  margin-top: 10px;
  min-height: 300px;
}
</style>
