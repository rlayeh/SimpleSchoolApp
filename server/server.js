require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();

const proxy = httpProxy.createProxyServer({
  target: process.env.DOCKER_BACKEND_API || process.env.BACKEND_API,
  autoRewrite: true,
  secure: false,
  changeOrigin: true,
});

const customHost = process.env.HOST || process.env.OPENSHIFT_NODEJS_IP;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const contextPath = process.env.CONTEXT_PATH || '/';

proxy.on('error', (e) => {
  console.log(e.message);
});

proxy.on('proxyReq', (req) => {
  console.log('Requesting: ', req.path);
});

proxy.on('proxyRes', (proxyRes) => {
  console.log('Response status: ', proxyRes.statusCode);
});

app.set('x-powered-by', false);

app.use(compression());
app.use(contextPath, express.static('./dist', {
  etag: false,
  extensions: ['html'],
}));

app.use('*/api', (req, res) => {
  proxy.web(req, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port, host, () => {
  console.log(`Express started at ${prettyHost}:${port}`);
});
