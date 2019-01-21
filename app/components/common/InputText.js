import React, { Component } from 'react';
import { View, TextInput } from 'react-native'
import * as Config from '../../config'
import * as Common from './index'

export default class InputText extends Component {

  render(){
    return(
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
        {(this.props.type == 'currency') ? (
          <Common.Texti
            fontColor={"#0392cf"}
            >
            S$
          </Common.Texti>
        ) : (
          <View />
        )}
        <TextInput
          {...this.props}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          placeholder={this.props.placeholder}
          placeholderStyle={{
            color: '#0392cf',
          }}
          style={style.inputStyle}
        />
      </View>
    )
  }
}

const style = {
  inputStyle: {
    color: '#0392cf',
    paddingBottom: 5,
  },
};
