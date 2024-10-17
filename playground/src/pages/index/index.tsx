import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import Taro from '@tarojs/taro'

export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='<%= pageName %>'>
        <Text>分包测试</Text>
        <Button type='primary' onClick={()=>{
          Taro.navigateTo({
            url: '/basePackage/pages/index/index'
          })
        }}>跳转basePackage</Button>
        <Text>分包测试111</Text>
        <Button  onClick={()=>{
          Taro.navigateTo({
            url: '/test1Package/pages/index/index'
          })
        }}>跳转test1Package</Button>
      </View>
    )
  }
}
