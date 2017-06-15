const path = require('path');

module.exports = {
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  entry: './client/public/index.jsx',
  output: {
    filename: 'public/bundle.js',
    path: path.resolve(__dirname, 'client')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.jpg$/, use: ['file-loader', 'url-loader'] },

    ],

  },


};
