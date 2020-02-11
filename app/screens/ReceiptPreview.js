import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import Swipeable from 'react-native-swipeable';
import FastImage from 'react-native-fast-image';
import Navbar from '../components/common/NavbarGrey';
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
          {/* <FastImage
            style={{
              width: '100%',
              height: 500,
            }}
            source={{
              uri: this.props.preview,
              priority: FastImage.priority.medium,
              cache: FastImage.cacheControl.immutable
            }}
            resizeMode={FastImage.resizeMode.contain}
          // onError={(err) => console.warn(err.message)}
          /> */}
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
              {/* <FastImage
                style={{
                  width: '100%',
                  height: 230,
                }}
                source={{
                  uri: this.props.preview,
                  priority: FastImage.priority.medium,
                  cache: FastImage.cacheControl.immutable
                }}
                resizeMode={FastImage.resizeMode.contain}
              // onError={(err) => console.warn(err.message)}
              /> */}
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

export default class ReceiptPreview extends Component {
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
      preview={item.preview}
      images={this.props.receiptFiles.images}
      removeCallback={(index) => this.removeImage(index)}
    />
  );

  removeImage = (index) => {
    arr = this.props.receiptFiles.images
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
        data={(this.state.changeData) ? this.state.dataimage : this.props.receiptFiles.images}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  UploadReceiptProses = async () => {

    try {
      await this.setState({
        isLoading: true,
        button: 'Submitting...'
      })

      receiptFile = {
        'transaction_id': this.props.transaction_id,
        'images': this.props.receiptFiles.images,
      }

      await Core.ReceiptUpload(receiptFile, async (err, result) => {
        // Core.getNotify("",result.message)
        if (result.message == "Success.") {
          this.setState({ isLoading: false, Data: result.data })
          Actions.HistoryAfterUpload({
            type: 'reset',
            transaction_id: this.props.transaction_id,
          })
        } else {
          console.warn('Failed to upload receipt')
          await this.setState({ message: result.message, title: 'Upload Receipt', Failed: true, isLoading: false, button: 'Submit' })
        }
      })
    } catch (e) {
      Core.getNotify("", "Failed to upload receipt")
    }
  }

  renderButton() {
    return (
      <View style={{
        justifyContent: 'flex-end',
      }}>
        <TouchableOpacity
          onPress={() => this.UploadReceiptProses({ receiptFiles: this.props.receiptFiles })}
          style={{
            backgroundColor: "#0392CF",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '3%'
          }}
        >
          <Common.Texti
            fontSize={16}
            fontColor={"#ffffff"}
            style={{
              padding: 10
            }}>
            Submit
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

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       isModalVisible: true
  //     })
  //   }, 300)

  //   setTimeout(() => {
  //     this.setState({
  //       isModalVisible: false
  //     })
  //   }, 2000)
  // }

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
          title="Upload Receipt"
          subtitle="Panel"
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
