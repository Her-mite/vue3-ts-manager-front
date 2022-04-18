// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';


const axiosRequest = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000 // request timeout
});

// 请求拦截器
axiosRequest.interceptors.request.use(
  config => {
    const token = 'token';
    // 如果当前存有token,就加在请求头上
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosRequest.interceptors.response.use(
  response => {
    // console.log('响应拦截器', response)
    if (response.status === 200 ) {      
      return response.data;
    } else if (response.data.message){
      ElMessage.error('请求失败:', response.data.message);
    } 
    else {
      // 抛出错误
      console.log(response);
      
      ElMessage.error('请求失败');
    }
  },
  error => {
    console.log('testorr', error);
    ElMessage.error('请求失败');

    // do something with request error
    // console.log(error) // for debug
    // token 失效
    // if (error.response && error.response.data && error.response.data.code === 10002) {
    //   store.dispatch('user/userLayout'); //清空信息
    //   // router.push('/login') // 返回login页面，补充回调地址
    //   router.push('/login?return_url=' + encodeURIComponent(router.currentRoute.fullPath));
    // }

    // return Promise.reject(error);
  }
);

export default axiosRequest; // 导出axios实例