import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: "http://127.0.0.1:9000",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "/api": "" }
    }))
}