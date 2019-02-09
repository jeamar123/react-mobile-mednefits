import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Container } from 'native-base';
import Navbar from '../components/common/Navbar';
import * as Core from '../core'
import { RNCamera, FaceDetector } from 'react-native-camera';
import { Actions } from 'react-native-router-flux'
import { Spinner, Text } from '../components/common/Spinner'
import * as Config from '../config'

const PendingView = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, position: 'absolute' }}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

class Barcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      data: false,
      isLoading: false
    };

    this.scanBarcode = this.scanBarcode.bind(this)
    this.barcodeHandler = this.barcodeHandler.bind(this)
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.data !== this.state.data) {
      this.scanBarcode()
      this.setState({
        data: false
      })
    }
  }

  scanBarcode = (data) => {
  	this.setState({ isLoading: true })
    barcodeData = data
    console.log(barcodeData);

    try {
      Core.GetBarcodeData(barcodeData.data, (result)=>{
        console.warn("res "+result);
        if (result.status) {
          Actions.SelectService({
            type:'reset',
            services: result.data.clinic_procedures,
            clinicid: result.data.clinic_id
          })
        }

        this.setState({
          isLoading: false
        })
      })
    } catch (e) {
      this.setState({
        isLoading: false
      })
    } finally {
      setTimeout(()=>{
        this.setState({
          isLoading: false
        })
      }, 10000)
    }

  }

  barcodeHandler(data) {
    console.warn('setdata');
    console.warn(data);
    if (data) {
      this.setState({ data: data, isLoading: true })
    }
  }

  onBarCodeRead = async obj => {
    if (this.state.data == obj.data) return;
    this.setState({ data: obj, isLoading: true })
  }

  render() {
    console.warn(this.state.data);
    return (
      <Container>
        <Navbar leftNav="back-home" />

        {(this.state.isLoading) ? (
          <Spinner />
        ) : (
            <RNCamera
              style={styles.preview}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={
                'We need your permission to use your camera phone'
              }
              onBarCodeRead={this.scanBarcode}
              ref={cam => (this.camera = cam)}
            >
              {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <ImageBackground
                    style={{ height: '100%', width: '100%' }}
                    source={require('../../assets/barcode.png')}
                  >

                  </ImageBackground>
                )
              }}
            </RNCamera>
          )}

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
