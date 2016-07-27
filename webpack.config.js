const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function (keepalive) {
  return {
    entry: './client/index.js',
    output: {
      path: './public',
      filename: 'bundle.js'
    },
    devtool : '#inline-source-map',
    noInfo : true,
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate?map=false','babel']
      }, {
        test: /\.jade$/,
        loader: 'jade'
      }, {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      }, { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=/assets/fonts/[name].[ext]'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=/assets/fonts/[name].[ext]'
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loaders: [
          'file?name=/assets/images/[name].[ext]'
        ]
      }],
    },
    plugins : [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
      new HtmlWebpackPlugin({
        title: 'Pick \'n\' Go',
        filename: 'index.html',
        template: path.resolve('client', 'templates', 'development.jade')
      }),
      new ExtractTextPlugin('style.css', {
        allChunks: true
      })
    ],
    resolve: {
      alias: {
        assets : path.resolve('client', 'assets'),
        modal : path.resolve('client', 'components', 'modal')
      },
      extensions: ['', '.js', '.json','.css', '.styl', '.jade']
    },
    // grunt-webpack
    stats: {
      colors: false,
      modules: false,
      reasons: false
    },
    failOnError : false,
    keepalive,
    progress: true,
    watch: true
  }
};
