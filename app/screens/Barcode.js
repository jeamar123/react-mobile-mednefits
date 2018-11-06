import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Navbar from '../components/common/Navbar';
import { RNCamera, FaceDetector } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
  >
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

  render() {
    return (
      <Container>
        <Navbar leftNav="back-home" />
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
            return (
              <Image
                style={{height: "100%",width: "100%"}}
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
