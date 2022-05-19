import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ConnectView from '../views/ConnectView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChatRoomView from "../views/ChatRoom.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path:'/login',
    name:"login",
    component: ConnectView
  },
  {
    path:'/register',
    name:"register",
    component: RegisterView
  },
  {
    path:'/chatroom/:id',
    name:"chatroom",
    component: ChatRoomView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
