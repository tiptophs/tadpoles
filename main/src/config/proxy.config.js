// 设置proxy的配置
const proxyContext = []

// 输出当前环境和设置代理的url地址
const proxyTarget = 'https://example.com/'
if (process.env.NODE_ENV === 'development') {
  console.log('当前代理:', proxyTarget)
}

// 循环数据添加的proxyTable
const proxyTable = {}
proxyContext.forEach(item => {
  proxyTable[item] = {
    target: proxyTarget,
    onProxyRes(proxyRes) {
      let cookies = proxyRes.headers['set-cookie']
      if (Array.isArray(cookies)) {
        cookies = cookies.map(cookieItem =>
          cookieItem
            .replace(/(Domain=.*?;)|(Secure)|(SameSite=None)/g, '')
            .trim()
            .replace(/;$/, ''),
        )
      }
      // eslint-disable-next-line no-param-reassign
      proxyRes.headers['set-cookie'] = Array.from(new Set(cookies))
    },
    changeOrigin: true,
  }
})

// 抛出代理对象
module.exports = proxyTable
