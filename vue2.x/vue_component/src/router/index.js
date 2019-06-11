import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'parent01',
      component: () => System.import('@/pages/parent01')
    },
    {
      path: '/parent02',
      name: 'parent02',
      component: () => System.import('@/pages/parent02')
    },
    {
      path: '/parent031',
      name: 'parent031',
      component: () => System.import('@/pages/parent03-1')
    },
    {
      path: '/parent032',
      name: 'parent032',
      component: () => System.import('@/pages/parent03-2')
    },
    {
      path: '/parent04',
      name: 'parent04',
      component: () => System.import('@/pages/parent04')
    }
  ]
})
