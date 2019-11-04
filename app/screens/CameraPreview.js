import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground, Platform, Dimensions, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import RF from "react-native-responsive-fontsize";
import Navbar from '../components/common/NavbarGrey';
import { Text } from '../common';
import * as Common from '../components/common';
import * as Core from '../core';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from "react-native-modal";
import Swipeable from 'react-native-swipeable';

class CameraBatchImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImage: false,
      isModalVisible: false
    };

  }

  removeImagePreview = () => {
    this.props.removeCallback(this.props.index)
  }

  render() {
    const rightButtons = [
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15 }}>
        <TouchableOpacity
          onPress={this.removeImagePreview}
        >
          <ImageBackground
            source={require('../../assets/delete-button.png')}
            style={{
              width: 30,
              height: 30
            }}
          />
        </TouchableOpacity></View>,
    ];

    if (this.props.shootType == 'single') {
      return (
        <View style={{ padding: 15, alignItems: 'center', height: "100%" }}>
          <ImageBackground
            source={{ uri: this.props.preview }}
            style={{
              width: '100%',
              height: 500,
            }}
          />
        </View>
      )
    } else {
      return (
        <View>
          {(this.props.index == 1) ? (<Common.Texti style={{ paddingLeft: 15, paddingTop: 15 }}>
            {this.props.index}
          </Common.Texti>) : (<View><Common.Divider />
            <Common.Texti style={{ paddingLeft: 15 }}>
              {this.props.index}
            </Common.Texti></View>)}
          <View style={{ padding: 15 }}>
            <Swipeable rightButtons={rightButtons}>
              <ImageBackground
                source={{ uri: this.props.preview }}
                style={{
                  width: '100%',
                  height: 230,
                }}
              />
            </Swipeable>
          </View>
        </View>
      )
    }
  }
}

export default class CameraPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImage: false,
      isModalVisible: false,
      changeData: false,
      dataimage: []
    };

    this.removeImage = this.removeImage.bind(this)
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item, index }) => (
    <CameraBatchImage
      index={index + 1}
      shootType={this.props.shootType}
      preview={item.preview}
      images={this.props.claimdata.images}
      removeCallback={(index) => this.removeImage(index)}
    />
  );

  removeImage = (index) => {
    arr = this.props.claimdata.images
    remove = arr.splice(parseInt(index - 1), 1);

    this.setState({
      changeData: true,
      dataimage: arr
    })

    Core.getNotify("", "image removed")

  }

  renderPreview() {
    return (
      <FlatList
        data={(this.state.changeData) ? this.state.dataimage : this.props.claimdata.images}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    )


  }

  renderButton() {
    return (
      <View style={{
        justifyContent: 'flex-end',
      }}>
        <TouchableOpacity
          onPress={() => Actions.DetailEclaim({ claimdata: this.props.claimdata })}
          style={{
            backgroundColor: "#0392CF",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '3%'
          }}
        >
          <Common.Texti
            fontSize={RF(2.4)}
            fontColor={"#ffffff"}
            style={{
              padding: responsiveHeight(1.6)
            }}>
            Next
            </Common.Texti>
        </TouchableOpacity>
      </View>
    )
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isModalVisible: true
      })
    }, 300)

    setTimeout(() => {
      this.setState({
        isModalVisible: false
      })
    }, 2000)
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFF4' }}>
        <Navbar
          leftNav="back"
          title="Receipt Verification"
          subtitle="E-Claim"
        />
        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          hasBackdrop={false}
          backdropColor={"white"}
          backdropOpacity={0.1}
          animationInTiming={1000}
          animationOutTiming={1000}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: "#3C4D5E", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 5 }}>
            <Icon name="check-circle" style={{ color: '#0392CF', fontSize: 24 }} />
            <TouchableOpacity onPress={this.toggleModal} >
              <Common.Texti
                fontColor={"#FFFFFF"}
              >
                {" "}Receipt attached
              </Common.Texti>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{ flex: 1 }}>
          {this.renderPreview()}
          {this.renderButton()}
        </View>
      </View>
    )
  }
}
