const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./server/config/environment');

console.log(config.isProd, path.join(config.root, config.isProd? 'dist/public' : 'public'));

module.exports = {
  entry: path.join(config.root, 'client/index.js'),
  output: {
    path: path.join(config.root, config.isProd? 'dist/public' : 'public'),
    filename: 'bundle.js'
  },
  devtool : config.isDev? 'source-map' : undefined,
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
      loader: 'file?name=./assets/fonts/[name].[ext]'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=./assets/fonts/[name].[ext]'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loaders: [
        'file?name=./assets/images/[name].[ext]'
      ]
    }],
  },
  plugins : [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
    new HtmlWebpackPlugin({
      title: 'Pick \'n\' Go',
      filename: 'index.html',
      template: path.resolve('client', 'templates', config.env + '.jade')
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ].concat(config.isProd? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ] : []),
  resolve: {
    alias: {
      assets : path.resolve('client', 'assets'),
      modal : path.resolve('client', 'components', 'modal')
    },
    extensions: ['', '.js', '.json','.css', '.styl', '.jade']
  },
  watch: config.isDev
};
