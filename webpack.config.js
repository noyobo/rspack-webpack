const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: {
    'home': path.join(__dirname, 'app', 'home')
  },
  watch: false,
  output: {
    path: path.join(__dirname, 'dist-webpack'),
    publicPath: '/',
    filename: '[name].js',
    // chunkFilename: '[name].js',
  },
  plugins: [new webpack.ProgressPlugin(), new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]_[hash:base64:5]',
            },
            url:{
              filter: (url, resourcePath) => {
                if (url.startsWith('/')) {
                  return false
                }
                return true;
              },
            }
          }
        }]
      }
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
};
