module.exports = {
  // extends为继承的一套规则, 优先级为底部的优先级最高, stylelint-config-standard为一套规则合集
  // stylelint-config-recess-order 是stylelint-order的一个扩展插件，用于处理style样式的顺序
  // stylelint-config-prettier 是用于兼容prettier规范的一个插件，他会关闭一些我们不常用的和一些和eslint
  // 规则相互冲突的eslint规范
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    // 值为null的时候为禁用该规则
    'no-descending-specificity': null,
    'no-empty-source':null
  },
}
