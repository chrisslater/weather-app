import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import { port } from './src/config';
import webpackConfig from './webpack.dev.config';
import Html from './src/Html';

const devPort = (Number(port) + 1);
const compiler = webpack(webpackConfig);
const serverOptions = {
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

app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
  const markup = (
    `<!DOCTYPE html>
    ${ReactDOM.renderToString(<Html />)}`
  );

  res.send(markup);
});

app.listen(devPort, err => {
  if (err) {
    console.error(err);
  } else {
    // console.info('==> 🚧  Webpack development server listening on port %s', port);
    console.info(`==> 🚧  Webpack development server listening on port ${devPort}`);
  }
});
