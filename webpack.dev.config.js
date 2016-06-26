import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import { host, port } from './src/config';
const assetsPath = path.resolve(__dirname, './static/dist');
const babelrc = fs.readFileSync('.babelrc');
const babelLoaderQuery = JSON.parse(babelrc);
// const devPort = (Number(port) + 1);

export default {
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  entry: {
    main: [
      './src/client.js',
      // `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr'`,
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/dist/`,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        loaders: [
          `babel?${JSON.stringify(babelLoaderQuery)}`,
          'eslint-loader',
        ],
      },
    ],
  },

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
