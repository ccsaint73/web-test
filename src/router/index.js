import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/ext',
        name: 'ext',
        component: () => import(/* webpackChunkName: "about" */ '../views/AI/Extend')
    },
    {
        path: '/txt2pic',
        name: 'txt2pic',
        component: () => import(/* webpackChunkName: "about" */ '../views/AI/Text2Pic')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
