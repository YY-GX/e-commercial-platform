import axios from 'axios';
import index from '../router';

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'https://39.106.57.246:4396';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = null;
    if (localStorage.token && !(localStorage.token === "undefined")) { //判断token是否存在
      console.log(typeof localStorage.token);
      if (localStorage.token === 'wallet') {
        config.headers.Authorization = null;
        return config;
      }
      config.headers.Authorization = "Bearer " + localStorage.token;  //将token设置成请求头
      console.log(config.headers.Authorization );
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      index.replace('/');
      console.log("token过期");
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;
