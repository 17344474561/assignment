import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Updata from '../components/Updata'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '/HelloWorld',
    component: HelloWorld
  },
  {
      path: '/Updata',
      name: 'Updata',
      component: Updata
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
