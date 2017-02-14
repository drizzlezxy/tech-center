var webpack = require('webpack');
var path = require('path');
var defaultSettings = require('./defaults');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var filePath = defaultSettings.filePath;
var precss = require('precss');
var autoprefixer = require('autoprefixer');


// Create multiple instances
const extractCSS = new ExtractTextPlugin('[name].[hash].css');
const extractSCSS = new ExtractTextPlugin('[name].[hash].css');

var webpackConfig = {
  entry: {
    common: ['jquery', 'babel-polyfill']
  },
  output: {
    path: filePath.build,
    filename: '[name].[hash].js',
    publicPath: filePath.publicPath
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    alias: {
      'extend': path.join(__dirname, './src/javascript/extend'),
      'page': path.join(__dirname, './src/javascript/page'),
      'scss': path.join(__dirname, './src/scss'),
      'pages': path.join(__dirname, './src/newPages'),
      'images': path.join(__dirname, './res/images'),
      'data': path.join(__dirname, './src/javascript/data'),
      'font': path.join(__dirname, './res/font'),
      'jquery': path.join(__dirname, './node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loaders: ['babel-loader?presets[]=es2015'],
      exclude: /node_modules/
    }, {
      test: /\.scss/,
      loader: extractSCSS.extract('css-loader!postcss-loader!sass-loader?outputStyle=compressed'),
    }, {
      test: /\.css$/,
      loader: extractCSS.extract('css-loader!postcss-loader'),
    }, {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=1&name=res/[name].[hash:8].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    autoprefixer,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "common.[hash].js",
      chunks: defaultSettings.chunks
    }),
    extractCSS,
    extractSCSS,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      output: {
        comments: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080/build/newPages/HomePage'
    })
  ]
};

function injectEntry() {
  defaultSettings.pagesToPath().forEach(function(item) {
    webpackConfig.entry[item.name] = item.entry;
  })
}

function injectHtmlWebpack() {
  defaultSettings.pagesToPath().forEach(function(item) {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: item.ftl,
        template: item.templates,
        chunks: ['common', item.name],
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      })
    );
  });
}

(function() {
  injectEntry();
  injectHtmlWebpack();
})();

module.exports = webpackConfig;