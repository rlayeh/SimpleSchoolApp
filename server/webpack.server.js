require('dotenv').config();
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack/webpack.local.config');
const httpProxy = require('http-proxy');

const app = express();
const compiler = webpack(config);

const proxy = httpProxy.createProxyServer({
  target: process.env.BACKEND_API,
  autoRewrite: true,
  secure: false,
  changeOrigin: true,
});

const customHost = process.env.HOST || process.env.OPENSHIFT_NODEJS_IP;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

const middleware = devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'dist',
  stats: { colors: true },
  historyApiFallback: true,
});

proxy.on('error', (e) => {
  console.log(e.message);
});

proxy.on('proxyReq', (req) => {
  console.log('Requesting: ', req.path);
});

proxy.on('proxyRes', (proxyRes) => {
  console.log('Response status: ', proxyRes.statusCode);
});

app.use(middleware);
app.use(hotMiddleware(compiler));

app.use('*/api', (req, res) => {
  proxy.web(req, res);
});
app.use(express.static('./dist', {
  etag: false,
}));

app.get('*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.resolve('dist/index.html')));
  res.end();
});

const listener = app.listen(port, host, () => {
  console.log(`Express started at ${prettyHost}:${port}`, listener.address().port);
});
