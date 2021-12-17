module.exports = {
  //presets: [['@vue/cli-plugin-babel/preset', { debug: true }]],
  presets: ['@vue/cli-plugin-babel/preset'],
  // 按需加载element-ui组件
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
