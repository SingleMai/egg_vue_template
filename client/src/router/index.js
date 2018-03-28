import Vue from 'vue'
import Router from 'vue-router'
// 异步加载组件
const Index = resolve => { import('components/Index').then(module => { resolve(module) }) }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
