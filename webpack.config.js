const path = require('path');

module.exports = {
  entry: __dirname + '/client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'styled-components': path.resolve('./node_modules', 'styled-components'),
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  }
};