import Vue from 'vue'
import Router from 'vue-router'
import Hot from '@/components/Hot'
// import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hot',
      component: Hot,
    },
  ]
})
