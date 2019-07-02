import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Easing,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Navbar from '../components/common/NavbarGrey';
import ZoomImage from 'react-native-zoom-image';
import Modal from "react-native-modal";
import Swipeable from 'react-native-swipeable';
import * as Common from '../components/common';
import * as Core from '../core';

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
          <ZoomImage
            imgStyle={{
              width: '100%',
              height: 500,
            }}
            enableScaling={true}
            easingFunc={Easing.ease}
            duration={200}
            source={{ uri: this.props.preview }}
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
              <ZoomImage
                imgStyle={{
                  width: '100%',
                  height: 230,
                }}
                enableScaling={true}
                easingFunc={Easing.ease}
                duration={200}
                source={{ uri: this.props.preview }}
              />
            </Swipeable>
          </View>
        </View>
      )
    }
  }
}

export default class ReceiptView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImage: false,
      isModalVisible: false,
      changeData: false,
      dataimage: [],
      Data: [],
    };

    this.removeImage = this.removeImage.bind(this)
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item, index }) => (
    <CameraBatchImage
      index={index + 1}
      shootType={this.props.shootType}
      preview={item.file}
      images={this.props.imageFile}
      removeCallback={(index) => this.removeImage(index)}
    />
  );

  removeImage = (index) => {
    arr = this.props.imageFile
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
        data={(this.state.changeData) ? this.state.dataimage : this.props.imageFile}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
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

  customLoader() {
    return (
      <View>
        <Modal
          isVisible={this.state.isLoading}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          onModalHide={this.statusModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
          <Common.Texti
            fontColor="#FFFFFF"
          >Uploading</Common.Texti>
        </Modal>
      </View>
    );
  }


  render() {
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFF4' }}>
        {this.customLoader()}
        <Navbar
          leftNav="back"
          title="Retrieve Receipt"
          subtitle="In-Network"
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
                {" "}Render Receipt
              </Common.Texti>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{ flex: 1 }}>
          {this.renderPreview()}
        </View>
      </View>
    )
  }
}
