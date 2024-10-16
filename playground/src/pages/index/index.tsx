import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='<%= pageName %>'>
        <Text>分包测试111</Text>
        <AtButton type='primary'>I need Taro UI</AtButton>
        <Text>分包测试111</Text>
        <AtButton type='primary' circle={true}>支持</AtButton>
        <Text>分包测试111</Text>
        <AtButton type='secondary' circle={true}>来</AtButton>
      </View>
    )
  }
}
