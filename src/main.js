import Vue from 'vue'
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)

//配置全局变量
import globalVariable from './global_variable.js'
Vue.prototype.GLOBAL = globalVariable
// Vue.config.productionTip = false;


import define from './defined.js'
Vue.prototype.define = define


import axios from 'axios'
axios.defaults.baseURL = 'http://154.8.209.13:9001/api/';
// axios.defaults.baseURL = 'http://192.168.3.194:9001/api/';
// http://154.8.209.13:23335/fqa.html
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';


// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
   console.log(config.baseURL+config.url+' 请求参数 ', config.data)
   return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  var result = response.data
  console.log(response.config.url +' 请求返回数据')
  console.log(response.data)
  // if(response.status === 200 && result.code =='S00000'){
    return response;
  // }
  // console.log('---请求数据失败--')

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



// 导入 app 组件
import app from './App.vue'

// 导入 自定义路由模块
// import router from './router.js'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { parse } from 'querystring'

var vm = new Vue({
  el: '#app',
  render: c => c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以 不要 把 路由的 router-view 和 router-link 直接写到 el 所控制的元素中
  // router // 4. 将路由对象挂载到 vm 上

})

// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中；
// Account 和 GoodsList 组件， 是通过 路由匹配监听到的，所以， 这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去；