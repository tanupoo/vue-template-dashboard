import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import About from '@/views/About'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About,
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes: routes,
})

export default router
