import { lazy } from "react"
import { Navigate } from "react-router-dom"


const routers = [{
    path: '/',
    name: 'Redirect',
    component: () => <Navigate to='/home' />
}, {
    path: '/home',
    name: 'Home',
    component: lazy(() => { return import('../views/Home/Home') }),
    meta: {
        title: '首页'
    }
}, {
    path: '/detail/:id',
    name: 'Detail',
    component: lazy(() => { return import('../views/Detail/Detail') }),
    meta: {
        title: '详情页'
    }
}, {
    path: '/login',
    name: 'Login',
    component: lazy(() => { return import('../views/Login/Login') }),
    meta: {
        title: '登录页'
    }
}, {

    path: '/person',
    name: 'Person',
    component: lazy(() => { return import('../views/Person') }),
    meta: {
        title: '个人信息页'
    }
}, {
    path: '/store',
    name: 'Store',
    component: lazy(() => { return import('../views/Store') }),
    meta: {
        title: '收藏页'
    }
}, {
    path: '/notfound',
    name: 'Page404',
    component: lazy(() => { return import('../views/Page404') }),
    meta: {
        title: '收藏页'
    }
}, {
    path: '/update',
    name: 'Update',
    component: lazy(() => { return import('../views/Update') }),
    meta: {
        title: '更新页'
    }
}, {
    path: '*',
    name: '404',
    component: () => <Navigate to='/notfound' />
}]
export default routers