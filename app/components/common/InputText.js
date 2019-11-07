import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native'
import * as Config from '../../config'
import * as Common from './index'
import Icons from 'react-native-vector-icons/FontAwesome';
import RF from "react-native-responsive-fontsize";

export default class InputText extends Component {

  render() {
    return (
      <View
        {...this.props}
        style={[{
          flexDirection: 'row',
          justifyContent: (this.props.justifyContent) ? this.props.justifyContent : 'center',
          alignItems: (this.props.alignItems) ? this.props.alignItems : 'center',
        }, this.props.style]}
      >
        {(this.props.type == 'currency') ? (
          <Common.Texti
            fontColor={"#2c3e50"}
          >
            S$
          </Common.Texti>
        ) : (this.props.type == 'search') ? (
          <Icons
            name="search"
            style={{
              color: (this.props.iconColor) ? this.props.iconColor : '#9e9e9e',
              fontSize: RF(1.75),
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
          placeholderTextColor={(this.props.iconColor) ? '#2C3E50' : "#9e9e9e"}
          placeholderStyle={[{
            fontSize: RF(1.75),
            fontFamily: Config.FONT_FAMILY_REGULAR,
          }, this.props.placeholderStyle]}
          style={[style.inputStyle, { textAlign: (this.props.leftToRight) ? 'right' : 'left' }]}
        />
        {(this.props.isClearSearch) ? (
          <TouchableOpacity
            onPress={() => this.props.isClearSearchChange(true)}
            style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Icons
              name="remove"
              style={{
                color: (this.props.iconColor) ? this.props.iconColor : '#9e9e9e',
                fontSize: RF(1.75),
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
    color: '#2c3e50',
    fontFamily: Config.FONT_FAMILY_MEDIUM
  },
};
