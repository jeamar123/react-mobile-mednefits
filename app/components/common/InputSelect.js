import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import Modal from 'react-native-modal';
import ResponsiveImage from 'react-native-responsive-image';
import * as Common from './index';
const { height, width } = Dimensions.get('window');

export default class InputSelect extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }

    this.changeValue = this.changeValue.bind(this)
    this.renderChildComponent = this.renderChildComponent.bind(this)
  }

  changeValue(value) {

    this.setState({
      isVisible: false
    })

    this.props.onValueChange(value)

  }

  renderChildComponent() {
    return (
      this.props.data.map((value, index) =>
        <TouchableOpacity
          onPress={() => this.changeValue(value.value)}
          style={{
            justifyContent: 'space-evenly',
            marginTop: 15,
            marginBottom: 15,
            alignItems: 'center'
          }}
        >
          <Common.Texti>
            {value.label}
          </Common.Texti>
        </TouchableOpacity>
      )
    )
  }

  setTitle() {
    if (this.props.value) {
      this.props.data.filter((value, index) => {
        if (value.value == this.props.value) {
          label = value.label
        }
      });
    } else if (this.props.titleValue) {
      label = this.props.titleValue
    } else {
      label = this.props.placeholder
    }

    return label
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          deviceWidth={width}
          deviceHeight={height}
          animationIn="zoomIn"
          animationOut="zoomOut"
          useNativeDriver={true}
        >
          <View style={{ backgroundColor: "white", borderRadius: 5, padding: 15 }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.renderChildComponent()}
            </ScrollView>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => this.setState({ isVisible: true })}
          style={{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Common.Text
            style={{
              color: (this.props.value) ? "#2c3e50" : "#9e9e9e"
            }}
          >
            {this.setTitle()}
          </Common.Text>

          <View
            style={{
              alignItems: 'flex-end',
              marginLeft: 10
            }}
          >
            <ResponsiveImage
              source={require('../../../assets/apps/arrow.png')}
              style={{ resizeMode: 'center' }}
              initWidth="15" initHeight="15"
            />
          </View>

          {/* <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={{
              color: "#9e9e9e",
              marginLeft: 10,
              fontSize: 18
            }}
          /> */}
        </TouchableOpacity>

      </View>
    )
  }
}
