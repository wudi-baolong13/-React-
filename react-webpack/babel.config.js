//使用 @babel/preset-react 处理 react 资源
//通过 @babel/preset-env 处理 js 资源
//添加 corejs 的配置增加 js 兼容处理 polyfills

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: 3,
            },
        ],
        "@babel/preset-react",
    ],
};