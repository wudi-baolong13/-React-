const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const devConfig = {
    mode: "development",
    devServer: {
        open: true,
        port: 8001,
        compress: true,
        hot: true
    },
};
module.exports = merge(devConfig, baseConfig);