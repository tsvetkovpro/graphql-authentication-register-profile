import Vue from 'vue'
import VueRouter from 'vue-router'

import login from './components/auth/login.vue'
import register from './components/auth/register.vue'
import profile from  './components/profile/profile.vue'
import settings from  './components/profile/settings.vue'
import error from  './components/error.vue'

import auth from './auth'
import localStorage from 'localStorage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/id/:id',
        name: 'id',
        meta: {requiresAuth: true, title: 'Profile'},
        component: profile,
    },
    {
        path: '/settings',
        name: 'settings',
        meta: {requiresAuth: true, title: 'Settings'},
        component: settings,
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {title: 'Sign in'},
        component: login
    },
    {
        path: '/register',
        name: 'register',
        meta: {title: 'Sign up'},
        component: register
    },
    {
        path: '*',
        component: error
    },
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        if (!auth.login()) next({name: 'auth'})
        else next({name: 'id', params: {id: localStorage.getItem('id')}})
    } else if (to.meta.requiresAuth === true) {
        if (!auth.login()) next({name: 'auth'})
        else next()
    } else if (to.meta.requiresAuth === undefined) {
        if (!auth.login()) next()
        else next({name: 'id', params: {id: localStorage.getItem('id')}})
    }
    document.title = to.meta.title
    next()
})

export default router
