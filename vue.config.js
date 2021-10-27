module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': { //代理api(起拦截作用以/api开头的接口地址,拦截之后就会向target指的地址发送请求)
        target: 'http://1.15.237.24:8081/', // 代理接口(注意只要域名就够了)
        changeOrigin: true, //设置跨域
        pathRewrite: { //重写路径
          '^/api': '' //代理路径
        }
      }
    }
  }
}