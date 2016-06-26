import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import { host, port } from './src/config';
import webpackConfig from './webpack.dev.config';
import Html from './src/Html';

const compiler = webpack(webpackConfig);
const serverOptions = {
// contentBase: `http://${host}:${port}`,
  // quiet: true,
  // noInfo: true,
  hot: true,
  // inline: true,
  // lazy: false,
  reload: true,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
};
const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
// app.use(require('webpack-hot-middleware')(compiler));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
  const markup = (
    `<!DOCTYPE html>
    ${ReactDOM.renderToString(<Html />)}`
  );

  res.send(markup);
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    // console.info('==> 🚧  Webpack development server listening on port %s', port);
    console.info(`==> 🚧  Webpack development server listening on port ${port}`);
  }
});
