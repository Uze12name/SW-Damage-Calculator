import { createProxyMiddleware } from 'http-proxy-middleware';

export default app => {
    app.use ('/api/v2',
        createProxyMiddleware( {
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