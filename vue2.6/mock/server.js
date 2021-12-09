const fs = require('fs')
const chokidar = require('chokidar')
const path = require('path')
const mockPath = path.resolve(__dirname, 'mock.js')

const getMockRoutes = () => {
  try {
    fs.accessSync(path.resolve(__dirname, 'mock.js'))
  } catch (err) {
    const data = fs.readFileSync(path.resolve(__dirname, 'demo.js'), 'utf-8')
    fs.writeFileSync(mockPath, data.toString(), 'utf-8')
    return require(mockPath)
  }
  return require(mockPath)
}
const registerRoutes = app => {
  const mocks = getMockRoutes()
  mocks.forEach(mock => {
    app[mock.type](mock.url, mock.response)
  })
  const appRoutesLength = app._router.stack.length
  const mockRoutesLength = mocks.length
  return {
    mockRoutesLength,
    mockStartIndex: appRoutesLength - mockRoutesLength,
  }
}

const unregisterRoutes = () => {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockPath)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = app => {
  let { mockRoutesLength: mockLength, mockStartIndex: mockStar } = registerRoutes(app)
  chokidar
    .watch(mockPath, {
      // 不监听新增文件
      ignoreInitial: true,
    })
    .on('all', event => {
      if (event === 'change') {
        try {
          // 清除express中mock的路由
          app._router.stack.splice(mockLength, mockStar)
          // 清除require缓存
          unregisterRoutes()

          const { mockRoutesLength, mockStartIndex } = registerRoutes(app)
          mockLength = mockRoutesLength
          mockStar = mockStartIndex

          console.log('\n > Mock Server hot reload success!')
        } catch (error) {
          console.log(error)
        }
      }
    })
}
