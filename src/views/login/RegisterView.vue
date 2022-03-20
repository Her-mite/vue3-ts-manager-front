<template>
  <div class="background-img">
    <!-- 注册表单 -->
    <div class="ms-login">
      <div class="login-title">欢迎注册</div>
      <el-form
        ref="formRef"
        label-position="right"
        label-width="100px"
        :rules="rules"
        :model="loginFormData"
        style="max-width: 460px"
        hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input v-model="loginFormData.username" placeholder="请输入用户名">
            <template #prepend>
              <el-icon><avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginFormData.password"
            type="password"
            placeholder="请输入密码"
          >
            <template #prepend>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="check_password">
          <el-input
            v-model="loginFormData.check_password"
            type="password"
            placeholder="确认密码"
            @keyup.enter="registerUser(formRef)"
          >
            <template #prepend>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <div class="button-item">
            <el-button type="primary" @click="registerUser(formRef)"
              >立即注册</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册成功提示 -->
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      center
    >
      <span>注册成功</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="router.push('/login');">去登录</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { register_user } from '@/utils/index';
import { signResult } from '@/utils/interface';
import { FILE_ERROR } from '@/constants/message';

const formRef = ref<FormInstance>();
const router = useRouter();let dialogVisible = ref<boolean>(false);
// 注册表单数据
const loginFormData = reactive({
  username: '',
  password: '',
  check_password: '',
});

// 密码自定义校验方式
const validatePassword = (
  rule: object,
  value: string,
  callback: (arg1?: Error) => void
) => {
  if (value.length < 6 || value.length > 20) {
    callback(new Error('Length should be 6 to 20'));
  } else {
    callback();
  }
};

// 两次密码需要一致
const checkPassword = (
  rule: object,
  value: string,
  callback: (arg1?: Error) => void
) => {
  if (value !== loginFormData.password) {
    callback(new Error('两次密码不一致'));
  } else {
    callback();
  }
};

// 表单校验规则
const rules = reactive({
  username: [
    {
      required: true, // 必输项
      message: 'Please input name',
      trigger: 'blur',
    },
    {
      min: 4, // 长度限制
      max: 10,
      message: 'Length should be 4 to 10',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
    // 自定义格式校验
    { validator: validatePassword, trigger: 'blur' },
  ],
  check_password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
    // 自定义格式校验
    { validator: checkPassword, trigger: 'blur' },
  ],
});

// 用户注册
const registerUser = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 表单校验通过
      const registerResult: signResult = register_user(
        loginFormData.username,
        loginFormData.password
      );
      if (registerResult.isSuccess) {
        ElMessage.success('注册成功');
        dialogVisible.value = true;
      } else {
        // 注册失败提示，
        ElMessage.error(FILE_ERROR.FILE_WRITE_ERROR);
        formEl.resetFields();
        return;
      }
    }
  });
};
</script>

<style scoped>
.background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-image: url(@/assets/img/register-img.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
/* 登录框 */
.ms-login {
  background: #00000088;
  position: absolute;
  width: 350px;
  margin: -150px 0 0 -175px;
  left: 50%;
  top: 50%;
  border-radius: 15px;
}
/* 标题 */
.login-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  border-bottom: 1.5px solid #ddd;
}
/* 表单 */
.el-form--label-right {
  padding: 30px 40px 0 0;
}

.el-form-item__content {
  margin-left: 50px !important;
}

/* 表单项 */
.el-form-item {
  margin-bottom: 30px !important;
}

/* 表单 标签 */
/* .el-form-item__label {
  color: white !important;
} */
/* 表单前缀图标样式 */
.el-input-group__prepend {
  padding: 0 15px !important;
  background-color: #ffffff00 !important;
}
/* 输入框 */
.el-input__inner {
  background: #00000080;
  border: none;
}
/* 注册按钮 */
.register-button {
  margin-left: 45px !important;
}
.button-item {
  width: 300px;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  margin-bottom: -10px;
}
.el-button--primary {
  --el-button-bg-color: #00000080 !important;
  --el-button-border-color: #2d2928 !important;
  --el-button-hover-bg-color: #2c3e50 !important;
  --el-button-hover-border-color: #6e453a !important;
}
</style>
