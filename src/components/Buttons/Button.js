import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export class Button extends Component {
  render() {
    return (
        <TouchableOpacity className="bg-black w-full rounded-[24px] px-36 py-[26px]">
        <Text className="text-white text-center font-custom2 font-bold text-[16px]">
          Login
        </Text>
        </TouchableOpacity>
    )
  }
}

export default Button;
