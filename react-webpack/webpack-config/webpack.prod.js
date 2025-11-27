const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const prodConfig = {
    mode: "production",
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin({
                parallel: true,
            }),
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: "[name].bundle.js",
                },
            },
        },
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    plugins: [new CleanWebpackPlugin()], //打包生成dist文件的时候删除原来的
};
module.exports = merge(prodConfig, baseConfig);