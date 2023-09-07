const CracoLessPlugin = require('craco-less');
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
        },
        configure: (webpackConfig) => {
            // Add the following lines to configure postcss-pxtorem
            const postcssLoader = webpackConfig.module.rules.find(
                (rule) => rule.oneOf && rule.oneOf.find((r) => r.loader && r.loader.includes('postcss-loader'))
            );

            if (postcssLoader) {
                postcssLoader.use[0].options.plugins.push(
                    require('postcss-pxtorem')({
                        rootValue: 75, // Change this to your desired root value
                        propList: ['*'], // Convert all properties by default
                    })
                );
            }

            return webpackConfig;
        },
    },
    devServer: {
        port: 8888
    }
};