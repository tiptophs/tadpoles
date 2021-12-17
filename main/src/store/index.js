import { initStore } from '@/common/vue-bucket-init/store.js'

// 按需加载部分
import manual from '@/store/manual/index.js'
// 手动添加
const importStore = {
  manual,
}

// 抛出加载收的store对象
export default initStore(importStore)
