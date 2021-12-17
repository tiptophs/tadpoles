### 一、命令

运行npm run start:mock

```shell
npm run start:mock
```

### 一、需知

​		用于开发时模拟接口，模拟返回数据。接口数据存放于mock.js文件，启动服务后，会检查是否有mock.js文件，没有的话会自动创建并把demo数据写入。后续只需修改mock.js文件，此文件已被gitignore，不用担心误提交问题。同时支持热更新功能，修改完mock.js保存即可。

### 二、mock.js 文件需知

其内置了对数据的增删改查接口，可根据业务需要自行修改或新建接口。查询操作包括分页、搜索，搜索时根据需要修改对应搜索key值。

```javascript
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
```

url - 模拟接口的url，和axios中定义的一致

type - 请求方法（get | post）

response - 接口逻辑

searchKey - 用于搜索，会根据这个key字段搜索数据，可自行修改

pageNum | pageSize - 分页的参数

### 三、模拟数据生成

用mockjs来生成数据，在mock.js文件里

```javascript
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
```

temp - 数据生成规则，[详情规则点这](http://mockjs.com/0.1/#Mock.Random)

total - 要模拟多少条数据