const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use (
        createProxyMiddleware('/api/v2',
        {
            target: 'https://swarfarm.com/',
            changeOrigin: true
        })
    )
}
// module.exports = app => {
//     app.use (
//         createProxyMiddleware('/api/v2', {
//             target: 'https://swarfarm.com/',
//             changeOrigin: true
//         })
//     )
// }