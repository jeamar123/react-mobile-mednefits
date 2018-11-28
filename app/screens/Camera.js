import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Navbar from '../components/common/Navbar';
import { RNCamera, FaceDetector } from 'react-native-camera';
import {Text} from '../common'
import * as Config from '../config'

const PendingView = () => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
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
    };
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.warn(data.uri);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.warn(barcodes)
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
          }}
        </RNCamera>
        <View style={{

          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10
          }}>
            
            <View>
              <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                <Icon type="Feather" name="camera"  style={{color: 'white', fontSize: 20}}/>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
