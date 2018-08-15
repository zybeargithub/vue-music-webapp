import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick' // fastclick：处理移动端click事件300毫秒延迟
import VueLazyload from 'vue-lazyload' // 资源懒加载，移步github

// 关闭生产模式下的提示
Vue.config.productionTip = false

// 懒加载 default.png 图片
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
