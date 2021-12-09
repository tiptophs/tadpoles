const Mock = require('mockjs')
// mock数据生成规则
const temp = {
  id: '@increment',
  name: '@first',
  email: '@email',
  img: '@image("100x100")',
  ctime: '@datetime',
  description: '@paragraph(1)',
  'isFrozen|1': true,
  'status|1': ['published', 'draft'],
}
// 生成数据条数
const total = 20

const { snap: mockData } = Mock.mock({
  [`snap|${total}`]: [temp],
})

const jsonParser = req => {
  let data = ''
  return new Promise(resolve => {
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      try {
        data = data ? JSON.parse(data) : ''
      } catch (err) {
        err.toString().includes('JSON') ? console.log('参数应为JSON格式') : console.log(err)
      }
      resolve(data)
    })
  })
}
/**
 * 获取数据
 * @param pageNum 第几页，默认1
 * @param pageSize 每页多少条数据，默认20
 * @param searchKey 搜索查询字端，可自行修改
 */
const getData = {
  url: '/demo/getData',
  type: 'get',
  response: (req, res) => {
    const searchKey = 'name'
    const { pageNum = 1, pageSize = 20, [searchKey]: search } = req.query
    let data = []
    // filter search
    data = search ? mockData.filter(item => item[searchKey].includes(search)) : mockData
    const total = data.length

    data = data.filter((_, index) => {
      return index < pageNum * pageSize && index >= pageSize * (pageNum - 1)
    })
    res.json({ code: 1, data, total })
  },
}
/**
 * 删除数据
 * @param deleteKey 根据key值删除数据
 */
const deleteData = {
  url: '/demo/deleteData',
  type: 'post',
  response: async (req, res) => {
    const deleteKey = 'id'
    const { [deleteKey]: deleteValue } = await jsonParser(req)
    const index = mockData.findIndex(item => item[deleteKey] == deleteValue)
    if (index === -1) {
      res.json({ code: 2, message: '未找到数据' })
      return
    }
    mockData.splice(index, 1)
    res.json({ code: 1, message: '删除成功' })
  },
}
/**
 * 增加数据
 */
const addData = {
  url: '/demo/addData',
  type: 'post',
  response: async (req, res) => {
    const data = await jsonParser(req)
    if ({}.toString.call(data) === '[object Object]') {
      mockData.push(data)
      res.json({ code: 1, message: '增加数据成功', data })
    } else {
      res.json({ code: 2, message: '请输入正确参数' })
    }
  },
}
/**
 * 编辑数据
 * @param editKey 根据key值编辑数据
 */
const editData = {
  url: '/demo/editData',
  type: 'post',
  response: async (req, res) => {
    const editKey = 'id'
    const data = await jsonParser(req)
    const { [editKey]: editValue } = data
    const index = mockData.findIndex(item => item[editKey] === editValue)
    if (index === -1) {
      res.json({ code: 2, message: '未找到数据' })
      return
    }
    Object.assign(mockData[index], data)
    res.json({ code: 1, message: '编辑成功', data: mockData[index] })
  },
}

const mocks = [getData, deleteData, addData, editData]

module.exports = mocks
