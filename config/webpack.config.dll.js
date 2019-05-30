const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'antd',
      'babel-polyfill',
      'mobx',
      'mobx-react',
      'prop-types',
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  mode:'production',
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    library: '[name]'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true,
          warnings: false,
          output: {
            ascii_only: true,
            quote_keys: true
          },
          compress: {
            drop_console: true,
            properties: false
          }        
        }
      }),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../tmp', 'manifest.json'),
      name: '[name]'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
