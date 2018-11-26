import Vue from 'vue'
//引入ElementUI框架
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
//引入VueRouter 
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入iView框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//引入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)



// vue的使用
import Vuex from 'vuex'
Vue.use(Vuex)
// 实例化vuex
const store = new Vuex.Store({
  state: {
    cartdata:JSON.parse(window.localStorage.getItem('hei24'))||{
    
    }
  },
  getters:{
    totalcount(state){
      let num=0
      for (const key in state.cartdata) {
        // 循环累加
        num+=state.cartdata[key]
      
      }
      return num
    }
  },
  mutations: {
  //   increment (state) {
  //     state.count++ 
  //   }
  // }
  add2cart(state,obj){
    // console.log(obj);
    
    if(state.cartdata[obj.goodId]!=undefined){
      state.cartdata[obj.goodId]+=obj.goodNum
    }else{
      Vue.set( state.cartdata, obj.goodId,obj.goodNum )
    }
  }
}
})


import  './assets/css/style.css'
import index from './components/index.vue'
import detail from './components/detail.vue'
import shopcar from './components/shopcar.vue'
Vue.config.productionTip = false
let routes=[{
  // 重定向 表示默认就是首页
  path:'/',
  redirect:'/index'
},{
  path:'/index',
  component:index
},{
  path:'/detail/:artID',
  component:detail
},{
  path:'/shopcar',
  component:shopcar
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
  //快速赋值
  //把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  //通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
  store,

  
  render: function(createElement) {
    return createElement(App);
  },
  // 路由选项
  router
}) .$mount("#app");

window.onbeforeunload=function(){
  window.localStorage.setItem('hei24',JSON.stringify(store.state.cartdata))
}