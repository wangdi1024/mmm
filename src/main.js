import Vue from 'vue'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueRouter from 'vue-router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueRouter)
Vue.use(iView);
import Vuex from 'vuex'
Vue.use(Vuex)
//引入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)
import  './assets/css/style.css'
import index from './components/index.vue'
import detail from './components/detail.vue'
Vue.config.productionTip = false
let routes=[{
  path:'/',
  redirect:'/index'
},{
  path:'/index',
  component:index
},{
  path:'/detail/:artID',
  component:detail
}]

let router = new VueRouter({
  routes
})
//把 axios挂到vue的原型上面 vue所有的组件和路由都可以访问
import axios from 'axios'
Vue.prototype.axios=axios
import moment from 'moment'
Vue.filter("shortTime",value=> {
  // console.log(moment(value).format('YYYY-MM-DD') );
  return moment(value).format('YYYY年-MM月-DD日')
})
new Vue({
  // 指定渲染的内容
  // 把 App.vue 渲染出来了
  // render: h => h(App),
  
  render: function(createElement) {
    return createElement(App);
  },
  // 路由选项
  router
}) .$mount("#app");