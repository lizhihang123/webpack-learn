const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        // 1. html资源 让他生成到根目录下面
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        // 2. 将env属性转化为全局变量
        new webpack.DefinePlugin({ // webpack自带该插件，无需单独安装
            'process.env' : {
                NODE_DEBUG: process.env.NODE_DEBUG // 将属性转化为全局变量，让代码中可以正常访问
            }
        })
    ],
    module: {
        rules: [
            // 1. css处理
            // use里面的loader读取顺序：从右 -> 左
            // css-loader - 先成功编译css代码
            // style-loader - 再把css代码放到index.html上去
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },

            // 2. less处理
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // 3. scss处理
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
           // 4. file-loader图片的处理
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                    // 限制大小 表示字节
                    limit: 8192,
                    // 名字 表示 【原始的名字】-hash值【防止重复用的】.【原本的扩展至】
                    name: '[name]-[hash:4].[ext]',
                    // 输出文件到指定的文件夹
                    outputPath: 'imgs',
                    },
                },
                ],
                // 必须加这个新的type属性 限制 webpack5的 [assets loader]
                type: 'javascript/auto',
            },
            // 5. 字体图标的处理
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/i,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: 8192,
                    name: '[name]-[hash:4].[ext]',
                    outputPath: 'fonts',
                    },
                },
                ],
                type: 'javascript/auto',
            },
        ],
    },
    resolve: {
        fallback: {
            "console": require.resolve("console-browserify"),
            "assert": require.resolve("assert/")
        }
    }
    
}