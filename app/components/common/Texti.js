import React, { Component } from 'react';
import { Text as RNText } from 'react-native';
import * as Config from '../../config/';

export default class Text extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fontSize: 18,
      fontFamily: false
    }
  }

  isHeader() {
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

  setFontFamily() {
    this.setState({ fontFamily: this.props.fontFamily, fontSize: this.props.fontSize })

  }

  componentWillMount() {
    this.isHeader()
    this.setFontFamily()
  }

  render() {
    return (
      <RNText
        {...this.props}
        allowFontScaling={false}
        style={[this.props.style, {
          fontFamily: (this.state.fontFamily) ? this.state.fontFamily : Config.FONT_FAMILY_BOLD,
          fontSize: this.state.fontSize,
          marginBottom: (!this.props.marginBottom) ? 0 : 5,
          marginTop: (!this.props.marginTop) ? 0 : 5,
        }]}
      >
        {this.props.children}
      </RNText>
    );
  }
}
