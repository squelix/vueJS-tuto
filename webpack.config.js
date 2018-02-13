const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: `./src/main.ts`,
    styles: `./src/styles/main.scss`,
  },
  output: {
    path: `/`,
    filename: `[name].[hash].js`
  },
  devtool: '#eval-source-map',
  resolve: {
    extensions: ['.vue', '.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'ts': 'ts-vue-loader!ts-loader',
            'scss': 'vue-style-loader!css-loader!postcss-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!postcss-loader!sass-loader'
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-vue-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production',
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ]
        })
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader?limit=1000'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  stats: {
    children: false
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `[name]${ process.env.NODE_ENV === 'production' ? '.[contenthash]' : ''}.css`
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: process.env.NODE_ENV === 'production'
        }
      },
      canPrint: process.env.NODE_ENV === 'production'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      pace: 'pace'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: process.env.NODE_ENV === 'development',
      parallel: process.env.NODE_ENV === 'production',
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr.js/)
  ]
};
