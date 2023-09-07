import { lazy } from "react"


const routers = [{
    path: '/home',
    name: 'Home',
    component: lazy(() => { return import('../views/Home') }),
    meta: {
        title: '首页'
    }
}, {
    path: '/detail',
    name: 'Detail',
    component: lazy(() => { return import('../views/Detail') }),
    meta: {
        title: '详情页'
    }
}, {
    path: '/login',
    name: 'Login',
    component: lazy(() => { return import('../views/Login') }),
    meta: {
        title: '登录页'
    }
}, {
    path: '/notfound',
    name: 'NotFound',
    component: lazy(() => { return import('../views/Page404') }),
    meta: {
        title: '404页'
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
    path: '/update',
    name: 'Update',
    component: lazy(() => { return import('../views/Update') }),
    meta: {
        title: '更新页'
    }
}, {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/Page404')),
    meta: {
        title: '404页面-知乎日报'
    }
}]
export default routers