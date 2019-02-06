import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Container } from 'native-base';
import Navbar from '../components/common/Navbar';
import * as Core from '../core'
import { RNCamera, FaceDetector } from 'react-native-camera';
import { Actions } from 'react-native-router-flux'

const PendingView = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

class Barcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
  }

  barcodeHandler(data) {
    if (data) {
      Core.GetBarcodeData(data.data, (result) => {
        if (result.status) {
          Actions.SelectService({ services: result.data.clinic_procedures, clinicid: result.data.clinic_id })
        }
      })
    }
  }

  render() {
    return (
      <Container>
        <Navbar leftNav="back-home" />
        <RNCamera
          style={styles.preview}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          onBarCodeRead={this.barcodeHandler}
          ref={cam => (this.camera = cam)}
        >
          {({ camera, status }) => {
            return (
              <Image
                style={{ height: '100%', width: '100%' }}
                source={require('../../assets/barcode.png')}
              />
            );
          }}
        </RNCamera>
      </Container>
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
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Barcode;
