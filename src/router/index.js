import QueryString from "qs"
import { Suspense, useEffect, useState } from "react"
import { Routes, useLocation, useNavigate, useParams, Route, useSearchParams } from "react-router-dom"
import routers from "./routers"
import { Mask, DotLoading, Toast } from 'antd-mobile'
import store from "../store"
import action from "../store/action"

//判断函数s
function check(path) {
    const PathList = ['/store', '/update', '/person']
    const { base: { info } } = store.getState()
    // console.log(store.getState());
    // console.log(!info && PathList.includes(path));
    //info不存在且符合 PathList中的路由 
    //console.log(info);
    return !info && PathList.includes(path)
}

//这边可以进行路由验证的的判断和一些其他的操作
const Element = function (props) {
    //传入各种方法
    const { component: Component, meta, path } = props
    //定义值更新组件
    let [_, setRandom] = useState(() => { return Math.random() })
    //设定初始值
    let IsShow = !check(path)


    useEffect(() => {
        if (IsShow) {
            // console.log(path);
            // if (/.*\/login.*/.test(path)) {
            //     navigate({
            //         pathname: '/home'
            //     })
            // }
            return;
        }
        (async function () {
            //在这里发送请求
            const ActionInfo = await action.Base.queryUserInfoAsync()

            //在这里获取到 info 
            const { info } = ActionInfo
            //对info判断 如何 info还没有 获取到那么就得跳转的login 重新登录
            if (!info) {
                Toast.show({
                    icon: 'fail',
                    content: '请先登录'
                });
                navigate({ pathname: "/login", search: `?to=${path}` }, { replace: true })
                return;
            }
            //有info了登录入口进不去

            store.dispatch(ActionInfo)
            setRandom(_ * Math.random());
        })()
    })



    const { title = "知乎日报App" } = meta || {}
    const params = useParams()
    const location = useLocation()
    const query = QueryString.parse(location.search.substring(1))
    const navigate = useNavigate()
    let [usp] = useSearchParams()
    const obj = { query, params, location, navigate, usp }
    document.title = title


    return <>{
        IsShow ? <Component {...obj} /> : <Mask visible={true}>
            <DotLoading color="white" />
        </Mask>
    }</>


}

const RouterMatch = function () {
    return <>
        {
            routers.map((item, index) => {
                let { path, children, name } = item

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
