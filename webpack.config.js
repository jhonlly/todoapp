const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtrectPlugin = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin =  require("copy-webpack-plugin")

const  path = require("path")

module.exports = {

    mode: 'development',
    optimization:{
        minimizer: [new OptimizeCssAssetsWebpackPlugin]
    },
    entry: './src/index.js',
    output:{
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
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
                options: { attributes: false, minimize:false }
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
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        })
    ]

}

/*
Y ahora se recomienda:

    new CopyPlugin({
        patterns: [
        { from: 'src/assets', to: 'assets/' },
    ],

Como ven, se agregó un nivel adicional de patterns, y ahí se añade lo mismo que veremos en la próxima clase.
*/