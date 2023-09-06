import { CracoLessPlugin } from 'craco-less'
let path = require('path')
const resolve = function (dir) {
    return path.resolve(__dirname, dir)
}
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    webpack: {
        alias: {
            "@": resolve('src')
        }
    }
};