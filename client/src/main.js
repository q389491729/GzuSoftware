import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/iview.js'
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

Vue.use(OrgTree)



// axios.defaults.baseURL = 'http://47.100.247.85:3000';
axios.defaults.baseURL = 'http://localhost:3000';

Vue.prototype.$axios = axios;

//公共组件
import DevHeader from './components/DevHeader'
Vue.component('DevHeader',DevHeader);

//插件
// axios.interceptors.request.use(config => {
//   const token = localStorage.getItem('token') || {}
//   config.headers.common['Authorization'] = 'Bearer ' + token
//   return config
// });

router.beforeEach((to,from,next)=>{
  const requiresAuth = to.meta.requiresAuth;
  if( requiresAuth ){
    if(window.localStorage.getItem('admin')){
      next();
    }else{
      next({
        path:'/admin/login'
      });
    }
  }else{
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })


