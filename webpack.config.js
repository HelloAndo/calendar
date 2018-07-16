/**   
 * todo 
 * 1. js files imported automatically
 * 2. excute multi index pages with hotReplacement
 */


const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin.js");
const md5 = require('webpack-md5-hash')
const fs = require('fs')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  },
  entry: {
    vendor: ['jquery', 'bootstrap'],
    // vendor: ' ',
    // app: ['webpack-hot-middleware/client?reload=true', './app/js/main.js'],
    app: './app/js/index.js',
    // app2: './app/js/main2.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].[chunkhash].js',
    // chunkFilename: "chunkfile.[name].[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          minimize: true
        }
        // loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader'
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // 不加上exclude容易报错
        exclude: /node_modules/,
        // query: {
        //   presets: ['es2015', 'stage-0', 'stage-3', 'stage-2'],
        //   plugins: ['transform-runtime']
        // }
      }
    ]
  },
  plugins: [
    // html文件生成插件
    new HtmlWebpackPlugin({
      title: 'date-picker',
      filename: 'index.html',
      template: './index.html',
      // hash: true,
      inject: 'body'
    }),
    // 抽离公用模块
    // new CommonsChunkPlugin('init.js'),
    // 抽离公用模块。非仅限第三方模块。第三方模块的name值(这里为vendor)必须在entry里有设置同名key。这里chunk为其他所有入口文件中抽离出的公共引用部分,会动态插入入到.html中)
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor',
      name: ['chunk', 'vendor'],        // chunk公共模块
      // filename: 'vendor.bundle.[hash].js',
      // minChunks: function (module, count) {
      //   return module.resource 
      //     && /node_modules/.test(module.resource)
      //     && count > 1
      // }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'chunk'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: "manifest.bundle.[hash].js"
    }),
    // 全部模块自动引用别名
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new md5(),
    // new webpack.optimize.UglifyJsPlugin(),
    // 热替换
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#source-map'
}