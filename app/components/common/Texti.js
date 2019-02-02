import React, { Component } from 'react';
import { Text as RNText } from 'react-native';

export default class Text extends Component {

  constructor(props){
    super(props)

    this.state = {
      fontSize: 18,
      fontFamily: false,
      fontColor: false
    }
  }

  isHeader(){
    if (this.props.h1) {
      this.setState({
        fontSize: 42
      })
    } else if (this.props.h2) {
      this.setState({
        fontSize: 38
      })
    } else if (this.props.h3) {
      this.setState({
        fontSize: 34
      })
    } else if (this.props.h4) {
      this.setState({
        fontSize: 30
      })
    } else if (this.props.h5) {
      this.setState({
        fontSize: 26
      })
    } else if (this.props.h6) {
      this.setState({
        fontSize: 22
      })
    }
  }

  setFontFamily(){
    this.setState({fontFamily: this.props.fontFamily, fontSize: this.props.fontSize})
  }

  setFontColor(){
    this.setState({fontColor: this.props.color})
  }

  componentWillMount(){
    this.isHeader()
    this.setFontFamily()
    this.setFontColor()
  }

  render() {
    return (
      <RNText
        {...this.props}
        allowFontScaling={false}
        style={[this.props.style, {
          color: (this.props.fontColor) ? this.props.fontColor : "black",
          fontFamily: (this.state.fontFamily) ? this.state.fontFamily : "HelveticaNeue-Medium",
          fontSize: this.state.fontSize,
          marginBottom: 5,
          marginTop: 5
        }]}
        ellipsizeMode={"tail"}
        numberOfLines={(!this.props.numberOfLines) ? 10 : this.props.numberOfLines}
      >
        {this.props.children}
      </RNText>
    );
  }
}
