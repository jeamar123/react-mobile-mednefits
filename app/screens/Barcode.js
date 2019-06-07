import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Container } from 'native-base';
import Navbar from '../components/common/Navbar';
import * as Core from '../core'
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux'
import { Spinner } from '../components/common/Spinner'
import { Popup } from '../components/common';

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
      isLoading: false,
      failed: false,
      title: null,
      message: null
    };

    this.scanBarcode = this.scanBarcode.bind(this)
    this.barcodeHandler = this.barcodeHandler.bind(this)
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.data !== this.state.data) {
      this.scanBarcode()
      this.setState({
        data: false
      })
    }
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  scanBarcode = (data) => {
    this.setState({ isLoading: true })
    barcodeData = data
    console.warn(barcodeData);

    try {
      Core.GetBarcodeData(barcodeData.data, (result) => {
        console.warn("res " + JSON.stringify(result));
        console.warn(result)
        if (result.status) {
          Actions.checkinUser({
            type: 'reset',
            services: result.data.clinic_procedures,
            clinicid: result.data.clinic_id,
            member: result.data.member,
            nric: result.data.nric,
            checkId: result.data.check_in_id,
            checkTime: result.data.check_in_time,
            capCurrency: result.data.cap_currency_symbol,
            capAmount: result.data.cap_per_visit_amount,
            clinic_image: result.data.image_url,
            clinic_name: result.data.name,
            consultation_fee_symbol: result.data.consultation_fee_symbol,
            consultation_status: result.data.consultation_status,
            consultation_fees: result.data.consultation_fees
          })
          this.setState({
            isLoading: false,
            failed: false,
          })
        } else {
          this.setState({
            isLoading: false,
            failed: true,
            title: 'Clinic Scan Error',
            message: result.message
          })
        }


      })
    } catch (e) {
      this.setState({
        isLoading: false
      })
    } finally {
      setTimeout(() => {
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
        <Popup
          kind="loginFailed"
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        />
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
