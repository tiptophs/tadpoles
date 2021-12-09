// vue inspect > output.js 配置分析
// 采用包分析工具
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
//prerender-spa-plugin基本用法 spa
//const PrerenderSPAPlugin = require('prerender-spa-plugin')
//const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

// 当前路径获取函数
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, '.', dir)
}
// mock文件
const mockServer = process.env.MOCK_SERVER === 'open' ? require(resolve('mock/server')) : () => {}
// 代理环境配置
const proxyTable = require('./src/config/proxy.config.js')

// 当前环境获取
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
  // 部署应用包时的基本 URL。
  publicPath: IS_PROD ? '/project/' : '/project/',
  // 是否开启eslint-loader的验证
  lintOnSave: IS_PROD ? 'default' : 'warning',
  // 输出地址 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',
  // 放置生成的静态资源，相对于outputDir
  assetsDir: '',
  // 指定生成的index.html路径，相对于outputDir
  indexPath: 'index.html',
  // 开发环境不开启sourceMap，生产环境sourceMap
  productionSourceMap: !IS_PROD,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  // 页面设置
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
    },
  },
  // 高阶配置
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias.set('@', resolve('src')).set('@store', resolve('src/store'))

    // 配置devServe
    config.devServer
      .port(8080)
      .clientLogLevel('warning') // 日志等级 默认info
      .hot(true) // 热更新
      .compress(true) // gzip需要后端配合
      .open(true) // 开启浏览器
      .quiet(true) //控制台中不输出打包的信息
      .proxy(proxyTable)
      .before(mockServer)

    // 添加环境变量到index.html
    config.plugin('html-index').tap(args => {
      args[0].isProd = IS_PROD
      return args
    })

    // splitChunks分包切割
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
      },
    })

    // i18n单组件支持，可以写独有的私有翻译
    // example : <i18n> { en: { login: 'Login', name: 'Name', password: 'Password' }}</i18n>
    // 该方式引入的多语言，优先级高于全局文件
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end()

    // 忽略文件打包, 采用cdn(暂不处理)
    // config.externals({
    //   vue: "Vue",
    //   vuex: "Vuex",
    //   "vue-router": "VueRouter",
    //   axios: "axios",
    // });

    // define-plugin定义全局变量
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0], {
        // 线上版本添加后续操作
        // BUILD_TAG: JSON.stringify(process.env.BUILD_TAG || "development"),
      })
      return definitions
    })

    // 包分析工具
    if (process.env.NPM_CONFIG_REPORT) {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    }
  },

  // 向 CSS 相关的 loader 传递选项
  css: {
    // 是否使用css分离插件 ExtractTextPlugin,将js内的css分离出来，单独加载
    extract: IS_PROD,
    // 开启sourceMap
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },

  //警告 webpack 的性能提示
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter(assetFilename) {
        return assetFilename.endsWith('.js')
      },
    },
    // plugins: [
    //   new PrerenderSPAPlugin({
    //     staticDir: path.join(__dirname, 'dist'),
    //     //routes中的内容为预渲染页面的路由path
    //     routes: ['/demo'],
    //     renderer: new Renderer({
    //       inject: {
    //         foo: 'bar',
    //       },
    //       // 监听到自定事件时捕获
    //       renderAfterDocumentEvent: 'render-event',
    //     }),
    //   }),
    // ],
  },
}
