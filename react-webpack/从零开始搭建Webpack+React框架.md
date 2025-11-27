## 从零开始搭建Webpack+React框架

#### 1.初始化

​	首先新建一个空文件夹作为项目根目录，用编辑器或者命令框打开该文件夹，然后执行 `npm init`,

​	然后会被依次询问以下问题:

​	![image-20251125113320447](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20251125113320447.png)

​	按回车键取默认值，也可以执行`npm init -y`快速初始化,初始化生成package.json和package-lock.json	文件。

​	创建 src 文件夹，项目的业务代码都放在这里，再创建 index.js，这是项目的入口文件，待会使用 webpack 	来打包项目，就从 index.js 文件开始

​	大家都知道，webpack 在开发和生产时部分配置是不同的，比如在开发时，我们希望代码能够即改即生效，	能够立马在页面中看到效果，需要 **devServer** 来帮助我们实现，而在开发中，我们希望能对 node_modules 	资源进行分包，需要借助 **splitChunks** 属性，而还有一些属性是开发和生产共用的，比如 js 、css 资源的处	理。

​	创建 webpack-config 文件夹，里面包含 webpack.dev.js，webpack.prod.js，webpack.base.js，分别定义 	webpack 的开发环境、生产环境、公共的配置。

#### 2.公共配置

开发和生产的配置都需要依赖公共配置，所以我们首先来定义 webpack.base.js。

##### 1.项目的入口/出口

执行 `npm install webpack webpack-cli` 安装 webpack 基础依赖，再定义 webpack 配置文件的基础框	架，**entry** 定义项目入口文件，**output** 定义编译后的出口，我们把编译后文件放在项目根目录的 dist 文件夹	下。

```
    const path = require("path");
    module.exports = {
      entry: "./src/index.js",
      output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].[contenthash:8].js",
      },
      module: {},
      plugins: [],
    };
```

##### 2.样式资源

module 中放置各种文件的 loader 处理规则，首先处理样式资源，我们项目中通常使用 scss 来作为项目的预	处理器，所以这里指定 css 及 scss 处理方式（less 或其他预处理器同理）。

执行`npm install sass sass-loader postcss postcss-loader postcss-preset-env css-loader mini-css-extract-plugin --save` 指令，安装所需要的 loader 和 plugin。

css 和 scss 文件的区别仅在于 scss 需要先通过 **sass-loader** 处理为 css 资源，其他的配置是一致的，这里提	取到 commonStyleLoader。

```
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: commonStyleLoader,
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [...commonStyleLoader, "sass-loader"],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "style/[name].[contenthash:8].css",
        }),
      ],
    };
```

再来看处理 sass 和 css 资源的公共 loader，首先使用 **postcss-loader** 进行兼容性处理，然后通过 css-loader解析 css 语法，最后通过 **mini-css-extract-plugin** 的将 css 从 js 中分离出来并生成新的 css 文件，也就是下面代码的 **MiniCssExtractPlugin.loader** 和上面代码的 **new MiniCssExtractPlugin** 操作 。

```
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
```

另外，**postcss-loader** 在进行兼容性处理的时候，需要配置 **browserslist** 来告知兼容的要求，可以直接定义在 `package.json` 中，开发环境兼容要求为近一个版本的chrome/safari/firefox浏览器，生产环境兼容市场份额大于 0.2% 且活跃的浏览器。

```
"browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 safari version",
      "last 1 firefox version"
    ],
    "production": [
      ">0.2%",
      "not dead"
    ]
  }
```

##### 3.js/jsx

js 和 react 需要使用的 jsx 资源的处理方式相同，都使用 **babel-loader**，所以可以一起来定义 loader 匹配规则。

执行 `npm install babel @babel/core babel-loader @babel/preset-env core-js@3 @babel/preset-react --save` 指令来安装相关资源。

```
module.exports = {
  module: {
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
```

extensions 中配置上常用文件后缀名，这样引入jsx文件时，就可省略后缀。

**babel-loader** 使用 babel 工具 来处理资源，需要配置处理规则，babel 中有很多 **plugins** 和 **presets**，presets 包括很多 plugins，所以直接配置 presets 会方便很多。

新增 **babel.config.js** 文件，使用 **@babel/preset-react** 处理 react 资源，通过 **@babel/preset-env** 处理 js 资源，再添加 corejs 的配置增加 js 兼容处理 **polyfills**。

```
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
```

##### 4.图片

在 webpack5 之前，处理字体图片等资源需要通过 **url-loader** 和 **file-loader**，webpack5 新增 **asset module type**，通过4种新的模块类型替代以前的loader。

```
module.exports = {
  module: {
    rules: [
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
    ],
  },
};
```

其中模块类型 asset 替代 url-loader，可以自行定义根据图片大小导出资源为 Data URI 内联到 js 文件中，还是生成一个单独的文件，这里定义以资源大小 8kb 为分界线。

##### 5.html

html 文件处理非常的简单，通过 **html-webpack-plugin** 生成 HTML 文件并注入 webpack 输出的 javaScript 文件和 css 文件即可。执行`npm install --save-dev html-webpack-plugin mini-css-extract-plugin`安装所需依赖

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};
```

可以在 plugin 中配置模板、引入 webpack 输出 js 资源的地址、压缩方式。

##### 6.运行测试

以上就完成了公共配置部分，现在我们来测试一下配置是否生效。

在 public 目录下创建 index.html 文件，初始化之后在 body 标签中增加 react 需要的挂载容器。

```
<div id="container"></div>
```

再执行 `npm install react react-dom --save` 指令，在 src/index.js 文件中定义渲染逻辑，

> [!NOTE]
>
> 注意，此时的下载的react是最新版本19，如果想正确执行下方代码建议降级到18或者17，因为18以上版本的react已经把`ReactDOM.render(...)`淘汰



```
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
ReactDom.render(<App/>, document.getElementById('container'))
```

> [!TIP]
>
> 如果是最新版react，代码换成
>
> ```
> import { createRoot } from 'react-dom/client';
> const root = createRoot(document.getElementById('root'));
> root.render(<App />);
> ```

然后在 src 目录下新建 App.js，里面随意编写 jsx 代码。可使用快捷构建类式组件（rcc）

再通过命令行工具执行 `npx webpack -c webpack-config/webpack.base.js`，运行结果没有报错就代表配置正确啦~ 有 warning ⚠ The 'mode' option has not been set 是没关系的，后续结合开发环境和生产环境的配置一起执行时，mode 属性会被配置上。

#### 3.开发环境配置

开发环境的配置很简单，只要使用 **webpack-dev-server** 开启本地服务就行。

执行 `npm install webpack-dev-server webpack-merge -D` 指令安装依赖，在 config.dev.js 中定义开发时所需要的配置。

使用 **webpack-merge** 工具来合并 webpack.base.js 中的公共配置，将 dev 配置和公共配置合并导出。

```
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
```

运行命令 `npx webpack serve -c ./webpack-config/webpack.dev.js`，如果能在浏览器自动打开 **[http://localhost:8001](https://link.segmentfault.com/?enc=T0Nd1aw%2F3NBcmWEVPp4tug%3D%3D.xWnN9UwZo%2BCl32UfNvxdIeCOPsF1HsPpcAepC40QxWs%3D)** 页面就表示开发环境配置成功。

我们通常会把指令配置到 package.json 文件的 script 属性中，执行起来更为方便。

```
"scripts": {
    "dev": "webpack serve -c ./webpack-config/webpack.dev.js"
}
```

这样，在命令行工具中，我们只需要执行 `npm run dev` 即可。

#### 4.生产环境配置

生产环境配置的框架和开发环境类似，都是使用 **webpack-merge** 合并公共配置

```
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",
};
module.exports = merge(prodConfig, baseConfig);
```

当 mode 定义为 production 时，webpack 会自动给我们做一些代码压缩和 tree shaking 等操作，我们可以自己再对编译出来的 js 和 css 文件进行压缩。

##### 1.js/css压缩

执行 `npm install css-minimizer-webpack-plugin terser-webpack-plugin clean-webpack-plugin --save` 指令安装依赖。

使用 **css-minimizer-webpack-plugin** 压缩 css 资源，通过 **terser-webpack-plugin** 开启多进程并发运行以提高构建速度。

```
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const prodConfig = {
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        parallel: true,
      }),
    ],
  },
};
```

##### 2.splitChunks

目前除了异步加载引入的模块，其他的内容都打包在了一个入口文件中，其中包含 node_modules 中使用到的依赖，如 React、RecatDom 等，这些依赖通常是不会变化的，打包到一个公共的文件中，可以利用浏览器的缓存策略，不需要每次都重新拉取资源。

```
const prodConfig = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: '[name].bundle.js'
        },
      },
    },
  },
};
```

这样 node_modules中使用到的资源文件会被打包成一个以 bundle.js 结尾的文件

##### 3.clean-webpack-plugin

当我们执行 `npm run build` 后，编译后文件会放到 dist 文件夹下，为了避免 dist 文件夹内容越来越来多不便查看，每次我们都要手动删除文件夹，非常不方便。**clean-webpack-plugin** 可以帮助我们解决这个问题。

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prodConfig = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```

##### 4.externals

有些资源，我们会使用稳定可靠的 cdn 资源，提升页面加载速度，减少打包出来的 bundle 体积，这时候就要配合 **externals** 使用。

如在 index.html 页面引入 react、react-dom

```
<script src="https://cdn.bootcdn.net/ajax/libs/react/18.0.0/umd/react.production.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/react-dom/18.0.0/umd/react-dom.production.min.js"></script>
```

在 webpack.prod.js 中定义 externals，告诉 webpack 当遇到 react、react-dom 时，不要将其打包，期望在全局环境中找到 React、ReactDOM 的配置。

```
const prodConfig = {
  externals: {
     react: "React",
     "react-dom": "ReactDOM",
   },
};
```

同样，将生产环境的编译指令配置到 package.json 文件的 script 属性中。

```
"scripts": {
    "build": "webpack -c ./webpack-config/webpack.prod.js"
}
```

#### 5.总结

在真实的开发场景，还有生产模式使用 **CopyWebpackPlugin** 在构建过程复制文件到输出目录，不经过 webpack 打包的情况，也有根据项目部署域名来定义 publicPath 的情况。这些都比较定制化，不同项目使用的配置也不相同。

另外还有前端工程化的配置大家也可以加上，如 eslint、prettier、stylelint、git hooks，[为react项目添加开发/提交规范](https://segmentfault.com/a/1190000044085567)中有详细的讲述，可点击查看。

附上完整配置代码。

##### **webpack.base.js 文件**

```
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
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[contenthash:8].js",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: commonStyleLoader,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [...commonStyleLoader, "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      }
    }),
  ],
};
```

##### **webpack.dev.js 文件**

```
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
```

##### **webpack.prod.js 文件**

```
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
  plugins: [new CleanWebpackPlugin()],
};
module.exports = merge(prodConfig, baseConfig);
```

