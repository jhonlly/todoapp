const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtrectPlugin = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin =  require("copy-webpack-plugin")
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const  path = require("path")

module.exports = {

    mode: 'production',
    optimization:{
        minimizer: [new OptimizeCssAssetsWebpackPlugin]
    },
    entry: './src/index.js',
    output:{
        path: path.join(__dirname, 'docs'),
        filename: 'main.[contenthash].js'
    },
    module:{
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
              test: /\.css$/,
              exclude: /style\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
            },
            {
                test: /style\.css$/,
                use: [
                    MiniCssExtrectPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: { attributes: false, minimize:true }
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtrectPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),
        new CleanWebpackPlugin(),
        new MinifyPlugin(),

    ]

}