const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/messages', {
      target: 'ws://localhost:8080',
      ws: true,
    })
  );
};
