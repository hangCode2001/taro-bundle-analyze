import type { IPluginContext } from '@tarojs/service'
import webpackChain from 'webpack-chain'
import TaroBundleAnalyzePlugin from "./plugin"

/**
 * 编译过程扩展
 */
export default (ctx: IPluginContext) => {
  ctx.modifyWebpackChain(({ chain }: { chain: webpackChain }) => {
    chain.plugin('taro-bundle-analyze').use(TaroBundleAnalyzePlugin)
  })
}
