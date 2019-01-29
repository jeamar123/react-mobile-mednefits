import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native'
import * as Config from '../../config'
import * as Common from './index'
import Icons from 'react-native-vector-icons/FontAwesome';

export default class InputText extends Component {

  render(){
    console.warn(this.props.backgroundColor);
    return(
      <View
        {...this.props}
        style={[{
          flexDirection: 'row',
          justifyContent: (this.props.justifyContent) ? this.props.justifyContent : 'center',
          alignItems: (this.props.alignItems) ? this.props.alignItems : 'center',
        },this.props.style]}
        >
        {(this.props.type == 'currency') ? (
          <Common.Texti
            fontColor={"#0392cf"}
            >
            S$
          </Common.Texti>
        ) : (this.props.type == 'search') ? (
          <Icons
            name="search"
            style={{
              color: '#cccccc',
              fontSize: 14,
              paddingLeft: 10,
              paddingRight: 10
            }}
          />
        ) : (
          <View />
        )}
        <TextInput
          {...this.props}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          placeholder={this.props.placeholder}
          placeholderStyle={[{
            color: '#0392cf',
          },this.props.placeholderStyle]}
          style={style.inputStyle}
        />
        {(this.props.isClearSearch) ? (
          <TouchableOpacity
            onPress={()=>this.props.isClearSearchChange(true)}
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Icons
              name="remove"
              style={{
                color: '#cccccc',
                fontSize: 14,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
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
