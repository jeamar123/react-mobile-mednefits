import React, { Component } from 'react';
import { View, Text } from 'react-native'
import * as Config from '../../config'
import * as Common from './index'
import Icons from 'react-native-vector-icons/FontAwesome';

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
            fontColor={"#cccccc"}
          >
            S$
          </Common.Texti>
        ) : (this.props.type == 'search') ? (
          <Icons
            name="search"
            style={{
              color: (this.props.iconColor) ? this.props.iconColor : '#cccccc',
              fontSize: 14,
              paddingLeft: 10,
              paddingRight: 10
            }}
          />
        ) : (
              <View />
            )}
        <Text style={{ color: '#fff' }}>Search</Text>
      </View>
    )
  }
}

const style = {
  inputStyle: {
    paddingBottom: '2%',
    color: '#0392cf',
    fontFamily: Config.FONT_FAMILY_ROMAN,
    width: '80%'
  },
};
