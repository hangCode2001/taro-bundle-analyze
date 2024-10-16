import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import dayjs from 'dayjs'

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
        <Text>test1Package</Text>
        <AtButton type='primary'>{dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</AtButton>
        <Text>test1</Text>
        <AtButton type='primary' circle={true}>test1</AtButton>
        <Text>test1</Text>
        <AtButton type='secondary' circle={true}>test1</AtButton>
      </View>
    )
  }
}
