import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import { host, port } from './src/config';
const assetsPath = path.resolve(__dirname, './static/dist');
const babelrc = fs.readFileSync('.babelrc');
const babelLoaderQuery = JSON.parse(babelrc);
const devPort = (Number(port) + 1);

export default {
  devtool: 'source-map',
  entry: {
    main: [
      './src/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${devPort}/dist/`,
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
    new webpack.NoErrorsPlugin(),
  ],
};
