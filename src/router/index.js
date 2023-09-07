import QueryString from "qs"
import { Suspense } from "react"
import { Routes, useLocation, useNavigate, useParams, Route } from "react-router-dom"
import routers from "./routers"
import { Mask, DotLoading } from 'antd-mobile'
//这边可以进行路由验证的的判断和一些其他的操作
const Element = function (props) {
    //传入各种方法
    const { component: Component, meta } = props
    const { title = "知乎日报App" } = meta || {}
    const params = useParams()
    const location = useLocation()
    const query = QueryString.parse(location.search.substring(1))
    const navigate = useNavigate()
    const obj = { query, params, location, navigate }
    document.title = title

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
