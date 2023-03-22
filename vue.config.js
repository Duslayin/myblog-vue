module.exports = {
    devServer: {
        port: 8888,
        proxy: { //配置跨域
            '/api': {
              target: 'http://47.101.180.9:8081', 
              ws: true,
              changOrigin: true, //允许跨域
              pathRewrite: {
                '^/api': '/api'   //请求时统一定向到请求/api路径下的地址
              }
            }
          }
    },
    lintOnSave: false
}
