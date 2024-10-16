export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  subPackages:[
    {
      root: 'basePackage',
      pages:[
        'pages/index/index',
        'pages/index2/index'
      ]
    },
    {
      root: 'test1Package',
      pages:[
        'pages/index/index',
        'pages/index2/index'
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
