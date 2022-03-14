<template>
  <div class="background-img">
    <div class="ms-login">
      <div class="login-title">后台管理系统</div>
      <el-form
        label-position="right"
        label-width="100px"
        :rules="rules"
        :model="loginFormData"
        style="max-width: 460px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginFormData.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFormData.password" type="password" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    // 用户登录表单数据
    const loginFormData = reactive({
      name: "",
      password: "",
    });

    // 密码自定义校验方式
    const validatePassword = (
      rule: object,
      value: string,
      callback: (arg1?: Error) => void
    ) => {
      if (value.length < 6 || value.length > 20) {
        callback(new Error("Length should be 6 to 20"));
      } else {
        callback();
      }
    };
    // 表单校验规则
    const rules = reactive({
      name: [
        {
          required: true, // 必输项
          message: "Please input name",
          trigger: "blur",
        },
        {
          min: 5, // 长度限制
          max: 10,
          message: "Length should be 5 to 10",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input password",
          trigger: "blur",
        },
        // 自定义格式校验
        { validator: validatePassword, trigger: "blur" },
      ],
      // password: [
      //   {
      //     required: true,
      //     message: "Please input password",
      //     trigger: "blur",
      //   },
      //   {
      //     min: 6,
      //     max: 20,
      //     message: "Length should be 6 to 20",
      //     trigger: "blur",
      //   },
      // ],
    });
    return { loginFormData, rules };
  },
});
</script>

<style>
.background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-image: url(@/assets/img/login-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
