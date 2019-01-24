import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, ActivityIndicator,ImageBackground,Platform, Dimensions,PermissionsAndroid } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Navbar from '../components/common/Navbar';
import { RNCamera, FaceDetector } from 'react-native-camera';
import {Text} from '../common'
import * as Common from '../components/common'
import * as Config from '../config'
import * as Core from '../core'
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux'
import * as mime from 'react-native-mime-types';

const options = {
  title: 'Select Photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from gallery' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const PendingView = () => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, opacity: 0.3 }}
  >
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      preview: false,
      isLoading: false,
      flashMode: false,
      attachedPanel: false
    };
  }

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = { quality: 0.5, base64: false };
        const data = await this.camera.takePictureAsync(options);
        const maxHeight = Dimensions.get('window').height;
        const maxWidth = Dimensions.get('window').width;

        const ratio = Math.min(maxWidth / data.width, maxHeight / data.height);

        this.setState({
          preview: data.uri,
          previewHeight: data.height * ratio,
          previewWidth: data.width * ratio,
          filename: 'receipt'+this.props.member+'.jpg',
          filetype: 'images/jpg'
        })
      }
    } catch (e) {
      console.warn(e.message);
      Core.getNotify("", "Failed to take picture")

    }
  }

  retakeAction=()=>{
    this.setState({
      preview: false
    })
  }

  async requestPermission(){
    if(Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        return result === PermissionsAndroid.RESULTS.GRANTED || result === true
    }
    return true;
  }

  renderCamera=()=>{
    if (this.state.preview) {
      return(
        <ImageBackground
          source={{uri: this.state.preview}}
          style={styles.preview}
          resizeMode="contain"
        />
      )
    } else {
      return(
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={(!this.state.flashMode) ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
        {({ camera, status, recordAudioPermissionStatus }) => {

            if (status !== 'READY') this.requestPermission()

          }}
        </RNCamera>
      )
    }
  }

  changeFlash=()=>{
    if (!this.state.flashMode) {
      Core.getNotify("","Flash is on")
    }

    this.setState({
      flashMode: !this.state.flashMode
    })

  }

  openGallery=()=>{
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          preview: response.uri,
          filename: response.fileName,
          filetype: response.type,
        });
      }
    });
  }

  finishReceipt=()=>{
    Core.getNotify("","Receipt attached")

    this.setState({
      attachedPanel: true
    })
  }

  renderAction=()=>{
    return(
      <View style={styles.actionPanel}>
        <TouchableOpacity
          onPress={()=>Actions.DetailEclaim({claimdata: Object.assign({},{uri:this.state.preview, filename: this.state.filename, filetype:this.state.filetype}, this.props.claimdata)})}
          style={{width: "100%", backgroundColor: "#0392cf", justifyContent: 'center', alignItems: 'center', display: (this.state.attachedPanel) ? 'flex' : 'none',paddingTop: 15,paddingBottom: 15}}>
          <Icon
            type="SimpleLineIcons"
            name="check"
            style={{
              color: "#fff"
            }}
          />
        </TouchableOpacity>
        <View style={{width: "100%",backgroundColor: '#efeff4', justifyContent: 'space-between', flexDirection: 'row', display: (this.state.attachedPanel) ? 'none' : 'flex'}}>
          <TouchableOpacity
            onPress={this.changeFlash}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 15
            }}>
            <ImageBackground
              source={(this.state.flashMode) ? require("../../assets/apps/flash-active.png") : require("../../assets/apps/flash.png")}
              style={{
                width: 30,
                height: 30
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.openGallery}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginRight: 15
            }}>
            <ImageBackground
              source={require('../../assets/apps/gallery-round.png')}
              style={{
                width: 30,
                height: 30
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={{width: "100%",backgroundColor: '#efeff4', justifyContent: 'space-between', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, display: (this.state.attachedPanel) ? 'none' : 'flex'}}>
          <TouchableOpacity
            onPress={this.retakeAction}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15
            }}>
            <Common.Texti
              fontColor={"#0392cf"}
            >
              Retake
            </Common.Texti>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Icon type="Feather" name="camera"  style={{color: 'white', fontSize: 20, justifyContent: 'center'}} />
            </TouchableOpacity>
          </View>
          {
            (this.state.preview) ?
            (
              <TouchableOpacity
                onPress={this.finishReceipt}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15
              }}>
                <Common.Texti
                  fontColor={"#0392cf"}
                >
                  Finish
                </Common.Texti>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  fontFamily: 'HelveticaNeue-Roman',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginRight: 15,
                  opacity: 0
                }}
              >
                DONE
              </Text>
            )
          }
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navbar
          leftNav="back"
          title="Receipt Verification"
          subtitle="E-Claim"
          backgroundColor={"#efeff4"}
          fontColor={"#2d3436"}
        />
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        {this.renderCamera()}
        {this.renderAction()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    marginTop: 25,
    width: "100%"
  },
  actionPanel: {

  },
  capture: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    backgroundColor: "#0392cf",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Camera;
