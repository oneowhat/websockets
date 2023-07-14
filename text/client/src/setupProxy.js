const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(

    '/messages',
    createProxyMiddleware({
      target: 'ws://localhost:8080',
      ws: true,

      changeOrigin: true,
    })
  );
};