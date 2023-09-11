import QueryString from "qs"
import { Suspense } from "react"
import { Routes, useLocation, useNavigate, useParams, Route, useSearchParams } from "react-router-dom"
import routers from "./routers"
import { Mask, DotLoading, Toast } from 'antd-mobile'
import store from "../store"
import action from "../store/action"



//这边可以进行路由验证的的判断和一些其他的操作
const Element = function (props) {
    //传入各种方法
    const { component: Component, meta, path } = props
    const { title = "知乎日报App" } = meta || {}
    const params = useParams()
    const location = useLocation()
    const query = QueryString.parse(location.search.substring(1))
    const navigate = useNavigate()
    let [usp] = useSearchParams()
    const obj = { query, params, location, navigate, usp }
    document.title = title
    // (async () => {
    //     const PathList = ['/store', '/update', '/person']

    //     //获取 info
    //     const { Base: { info } } = store.getState()
    //     let ActionInfo = await action.Base.queryUserInfoAsync()
    //     //对info和 PathList  进行相互校验

    //     if (!info && PathList.includes(path)) {

    //         //获取info
    //         info = ActionInfo.info
    //         //对info 进行判断 如果发送请求了还没有获取到信息 是 token 过期 要跳转到 login 页面 进行重新登录
    //         //进行提示
    //         Toast.show({
    //             icon: 'fail',
    //             content: "重新登录"
    //         })
    //         navigate({
    //             pathname: '/login',
    //             //记录之前要登录的路由
    //             search: `?to=${path}`
    //         }, { replace: 'true' })
    //         return

    //     }

    //     //如果 info存在,还想跳转的login 进行阻止
    //     if (/.*\/login.*/.test(path)) {
    //         navigate('/')
    //     }
    //     store.dispatch(ActionInfo)
    // })()

    return <Component {...obj} />


}

const RouterMatch = function () {
    return <>
        {
            routers.map((item, index) => {
                let { path, children, name } = item
                console.log(name);
                return <Route path={path} element={<Element {...item} />} key={index}>
                    {Array.isArray(children) ? RouterMatch(children) : null}
                </Route>
            })
        }
    </>
}
//创建路由容器
export const RouterContent = function () {
    return <Suspense fallback={
        <Mask visible={true}>
            <DotLoading color="white" />
        </Mask>
    }>
        <Routes>
            {
                RouterMatch()
            }
        </Routes>

    </Suspense>
}



//创建WithRouter
export const WithRouter = function (Component) {
    return function HOC(props) {
        const params = useParams()
        const location = useLocation()
        const query = QueryString.parse(location.search.substring(1))
        const obj = { query, params }
        return <Component {...props} {...obj} />
    }
}
