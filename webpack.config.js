var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,
        inline: true,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                use: [{
                    loader: "babel-loader",
                }, {
                    loader: "ts-loader",
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    // {
                    //     loader: "style-loader",
                    // }, {
                    MiniCssExtractPlugin.loader, // 使用这个插件时无需 style-loader
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]__[local]"
                        }
                    }, {
                        loader: "postcss-loader",
                    }, {
                        loader: "sass-loader"
                    }]
            },
            {
                test: /\.(jpg|png)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1000000,
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['src', 'node_modules'],
    }, // 这个是什么鬼啊 ！！！！
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "_index.html",
        }),
        new CleanWebpackPlugin(["build/*.*"], { dry: false }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name]-[contenthash:12].css",
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vender",
                    chunks: "initial",
                }
            }
        }
    }
};