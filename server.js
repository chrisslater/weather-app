import React from 'react';
import ReactDOM from 'react-dom/server';
import Express from 'express';
import path from 'path';
import { host, port } from './src/config';
import Html from './src/Html';

const devPort = (Number(port) + 1);
const app = new Express();
let bundledPath = 'dist/main.js';

app.use(Express.static(path.join(__dirname, 'static')));


if (process.env.NODE_ENV === 'development') {
  bundledPath = `http://${host}:${devPort}/${bundledPath}`;
}

app.get('*', (req, res) => {
  const markup = (
    `<!DOCTYPE html>
    ${ReactDOM.renderToString(<Html bundledPath={bundledPath} />)}`
  );

  res.send(markup);
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    // console.info('==> 🚧  Webpack development server listening on port %s', port);
    console.info(`==> Server listening on port ${port}`);
  }
});
