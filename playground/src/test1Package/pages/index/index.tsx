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
        <Text>test2</Text>
        <AtButton type='primary'>test2</AtButton>
        <Text>test2</Text>
        <AtButton type='primary' circle={true}>test2</AtButton>
        <Text>test2</Text>
        <AtButton type='secondary' circle={true}>test2</AtButton>
      </View>
    )
  }
}
