import QueryString from "qs"
import { Suspense } from "react"
import { Router, Routes, useLocation, useParams } from "react-router-dom"
import routers from "./routers"
//这边可以进行路由验证的的判断和一些其他的操作
const Element = function (props) {
    const { Component } = props
    const params = useParams()
    const location = useLocation()
    const query = QueryString.parse(location.search.substring(1))
    const obj = { query, params }
    return <Component {...obj} />
}

const RouterMatch = function (routers) {
    return <>
        {
            routers.map((item, index) => {
                let { path, children } = item
                return <Router path={path} element={<Element {...item} />}>
                    {Array.isArray(children) ? RouterMatch(children) : null}
                </Router>
            })
        }
    </>
}
//创建路由容器
export const RouterContent = function () {
    return <Suspense fallback={<> 正在处理,请稍好</>}>
        {RouterMatch(routers)}

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
