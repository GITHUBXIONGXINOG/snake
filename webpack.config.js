//引入一个包
//方便拼接路径
const path = require('path')
//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//webpack中的所有配置信息都应该写在module.exports中
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",

    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname,'dist'),
        //打包后文件的文件
        filename: "bundle.js",
        //告诉webpack不使用箭头
        environment: {
            arrowFunction: false
        }
    },

    //指定webpack打包时要使用模块
    module: {
        //指定要加载的规则
        rules:[
            {
                //test指定是规则生效的文件,以ts结尾的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options:{
                            //设置预置的环境
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //指定浏览器的版本
                                        targets: {
                                            "chrome": "88",
                                            "ie":"11"
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude: /node-modules/
            },
            //设置less文件的处理
            {
                //以less结尾的文件使用规则
                test: /\.less$/,
                //指定哪些loader
                //loader执行顺序是从下向上
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss加浏览器前缀,
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //兼容两个最新版本的浏览器
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //设置mode模式
    mode: "development",

    //配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            //template 网页模板
            template: "./src/index.html"
        }),
    ],

    //用来引用模块
    resolve: {
        //扩展名 告诉ts和js结尾的文件都可以作为模块使用
        extensions: ['.ts','.js']
    }

}
