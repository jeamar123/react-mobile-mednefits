import React, { Component } from 'react';
import {
  View
} from 'react-native'

export default class Body extends Component{
  render(){
    return(
      <View
        style={[this.props.style,{marginLeft: 15, marginRight: 15}]}>
        {this.props.children}
      </View>
    )
  }
}
