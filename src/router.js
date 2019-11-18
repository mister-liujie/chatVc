import VueRouter from 'vue-router'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    // account  goodslist
    // {
    //   path: '/account',
    //   component: account,
    //   children: [
    //     { path: 'login', component: login },
    //     { path: 'register', component: register }
    //   ]
    // },
    // { path: '/goodslist', component: goodslist }
  ]
})

// 把路由对象暴露出去
export default router