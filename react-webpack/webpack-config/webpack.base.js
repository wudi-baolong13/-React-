const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonStyleLoader = [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: ["postcss-preset-env"],
            },
        },
    },
];

module.exports = {
    entry: './src/index.js',
    output:{
        path:path.join(__dirname,"../dist"), //编译到当前目录的外层目录的dist文件
        filename:'[name].[contenthash:8].js' //编译后的文件名字（指定名称+目录）
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    //module中放置各种文件的loader处理规则，如css、scss、less
    module:{
        rules:[
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:commonStyleLoader,
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:[...commonStyleLoader,'sass-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"], //处理js和jsx资源
            },
            //块类型 asset 替代 url-loader，可以自行定义根据图片大小导出资源为 Data URI 内联到 js 文件中，还是生成一个单独的文件，这里定义以资源大小 8kb 为分界线
            {
                test: /\.(jp(e)g|png|gif)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: "img/[name].[contenthash:8].[ext]",
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'style/[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: "body",
            minify: {
                collapseWhitespace: true,
            },
        }),
    ],
}