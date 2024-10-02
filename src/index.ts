import type { IPluginContext } from '@tarojs/service'
const { writeFile } = require('fs/promises');

/**
 * 编译过程扩展
 */
export default (ctx: IPluginContext) => {

  ctx.onBuildComplete(() => {
    console.log('Taro 构建完成！')
  })

  ctx.modifyBuildAssets(({ assets }) => {
    console.log('修改编译后的结果')
    writeFile('test2.json', JSON.stringify(assets));
    // 示例：修改html产物内容
    const indexHtml = assets['index.html']
    if (indexHtml && indexHtml._value) {
      indexHtml._value = indexHtml._value.replace(/<title>(.*?)<\/title>/,'<title>被插件修改过的标题</title>')
    }
  })

  ctx.onBuildFinish(() => {
    console.log('Webpack 编译结束！')
  })
}
