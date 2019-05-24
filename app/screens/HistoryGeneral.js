import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  Easing,
  ScrollView,
  RefreshControl
}
  from 'react-native';
import { Container, Text } from 'native-base';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ZoomImage from 'react-native-zoom-image';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { Buttons } from '../components/common';
import { HistoryUser } from '../components/HistoryUser';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';

const options = {
  title: 'Upload Your Receipt',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: {
        uri: '',
      },
      data: false,
      isLoading: false,
      refreshing: false,
    };
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    Core.GetUserNetwork(this.props.transaction_id, (result) => {
      data = (typeof result == "string") ? JSON.parse(result.data) : result.data
      console.warn(data)
      this.setState({
        data: data, refreshing: false
      })
    })
  }


  selectPhoto() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.warn('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({ imageSource: source, photo_url: response.uri, isLoading: true });

        const file = {
          uri: response.uri,
          name: 'receipt',
          type: 'image/jpeg',
        };

        Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
          let myHeaders = new Headers();
          let formdata = new FormData();

          myHeaders.append('Authorization', result);
          myHeaders.append('Content-Type', 'multipart/form-data');
          formdata.append("file", file)
          formdata.append("transaction_id", this.props.transaction_id)

          params = {
            url: Config.USER_UPLOAD_IN_NETWORK_RECEIPT,
            method: 'POST',
            header: myHeaders,
            body: formdata,
          };

          fetch(Config.USER_UPLOAD_IN_NETWORK_RECEIPT, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
          })
            .then(response => response.json())
            .then(response => {
              console.warn(JSON.stringify(response, null, 4))
              Core.getNotify('', response.message);
              Actions.HistoryGeneral(this.props.transaction_id)
              this.setState({ isLoading: false, refreshing: true });
              Core.GetUserNetwork(this.props.transaction_id, (result) => {
                data = (typeof result == "string") ? JSON.parse(result.data) : result.data
                console.warn(data)
                this.setState({
                  data: data, refreshing: false
                })
              })
            })
            .catch(error => {
              console.warn('error fetching', error.message);
            });
        });
      }
    });
  }

  componentWillMount() {
    Core.GetUserNetwork(this.props.transaction_id, (result) => {
      data = (typeof result == "string") ? JSON.parse(result.data) : result.data
      console.warn(data)
      this.setState({
        data: data
      })
    })
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
          <Texti
            fontColor="#FFFFFF"
          >Uploading</Texti>
        </Modal>
      </View>
    );
  }

  renderReceiptUpload() {
    if (this.state.data.files.length > 0) {
      return this.state.data.files.map((Data, index) => (
        <ZoomImage
          imgStyle={{
            width: 80,
            height: 100,
            marginLeft: '18.5%',
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#c4c4c4',
          }}
          enableScaling={true}
          easingFunc={Easing.ease}
          duration={200}
          source={{
            uri: !Data.file
              ? '../../assets/photo.png'
              : Data.file,
          }}
        />
      ));

    } else if (this.state.data.files) {
      return (
        <View
          style={{
            marginLeft: '10.5%',
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{
            marginTop: '-7%',
            marginLeft: '75%',
            marginBottom: '-8%',
            width: 15,
            height: 15,
            borderRadius: 15 / 2,
            backgroundColor: '#f44336',
            alignItems: 'center',
            justifyContent: 'center'
          }} />
          <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <Buttons onPress={() => this.selectPhoto()}>
              <Icon name="camera" style={{ color: '#fff', fontSize: 36 }} />
            </Buttons>
          </View>
        </View>
      )
    }
  }

  renderContainerHistory() {
    if (!this.state.data) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
        </View>
      )
    } else {
      return (
        <GiftedForm
          style={{ backgroundColor: 'white' }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              alignItems: 'center',
              marginVertical: 13,
              borderBottomWidth: 1,
              borderColor: '#efeff1'
            }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                marginHorizontal: 30,
                marginRight: 30,
                marginLeft: 100,
              }}
              source={{ uri: this.state.data.clinic_type_image }}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                marginLeft: '-3.3%',
                paddingVertical: 10,
                fontSize: 13,
                fontWeight: 'bold',
              }}
            >
              {(this.state.data.clinic_type) ? this.state.data.clinic_type : "N/A"}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
              borderBottomWidth: 1,
              borderColor: '#efeff1'
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: 20,
                padding: 5,
                fontSize: 13,
                marginBottom: 10,
              }}
            >
              Transaction #
              </Text>
            <Text style={{ marginLeft: responsiveWidth(12), padding: 5, fontSize: 13, marginBottom: 10, }}>
              {this.props.transaction_id}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: 20,
                marginRight: '6%',
                padding: 5,
                fontSize: 13
              }}
            >
              Services/s
              </Text>
            <Text style={{ padding: 5, marginLeft: responsiveWidth(10.7), borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
              {this.state.data.services}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: 20,
                marginRight: '3%',
                padding: 5,
                fontSize: 13
              }}
            >
              Date & Time
              </Text>
            <Text style={{ marginLeft: responsiveWidth(11.5), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
              {this.state.data.date_of_transaction}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '9%', padding: 5, fontSize: 13 }}
            >
              Member
              </Text>
            <Text style={{ marginLeft: responsiveWidth(11.2), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
              {(this.state.data.customer) ? this.state.data.customer : "N/A"}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
            >
              Payment Type
              </Text>
            <Text style={{ marginLeft: responsiveWidth(8.4), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
              {(this.state.data.payment_type) ? this.state.data.payment_type : "N/A"}
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: '#efeff1',
              borderBottomWidth: 0.8,
            }}
          />

          {(this.state.data.cap_transaction == false) ?
            this.state.data.cap_transaction : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Cap  per visit
              </Text>
              <Text style={{ marginLeft: responsiveWidth(10.4), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
                {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.cap_per_visit) ? this.state.data.cap_per_visit : "N/A"}
              </Text>
            </View>
          }

          {(this.state.data.cap_transaction == false) ?
            this.state.data.cap_transaction : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Paid by Credits
              </Text>
              <Text style={{ marginLeft: responsiveWidth(7.2), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '58%', fontSize: 13 }}>
                {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.paid_by_credits) ? this.state.data.paid_by_credits : "N/A"}
              </Text>

              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#0392cf',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '100%',
                  marginLeft: '-20%'
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Credits
              </Text>
              </View>
            </View>
          }

          {(this.state.data.cap_transaction == false) ?
            this.state.data.cap_transaction : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Paid by Cash
              </Text>
              <Text style={{ marginLeft: responsiveWidth(10.2), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '53%', fontSize: 13 }}>
                {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.paid_by_cash) ? this.state.data.paid_by_cash : "N/A"}
              </Text>

              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#3F9D59',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '100%',
                  marginLeft: -60
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Cash
                </Text>
              </View>
            </View>
          }

          {(this.state.data.lite_plan == false) ?
            this.state.data.lite_plan : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Total Amount
              </Text>
              <Text style={{ marginLeft: responsiveWidth(9.1), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
                {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.converted_amount) ? this.state.data.converted_amount : "0.00"}
              </Text>
            </View>
          }

          {(this.state.data.lite_plan == false) ?
            this.state.data.lite_plan : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13, width: '30%' }}
              >
                Medicine & Treatment
              </Text>
              <Text style={{ marginLeft: responsiveWidth(-0.6), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '48%', fontSize: 13 }}>
                {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.converted_procedure_cost) ? this.state.data.converted_procedure_cost : "0.00"}
              </Text>
              {(this.state.data.service_credits == false) ? this.state.data.service_credits : <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#0392cf',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '65%',
                  marginLeft: -40
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Credits
                </Text>
              </View>}
            </View>
          }

          {(this.state.data.lite_plan == false) ?
            this.state.data.lite_plan : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Consultation
                  </Text>
              <Text style={{ marginLeft: responsiveWidth(10), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '43%', fontSize: 13 }}>
                {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.converted_consultation) ? this.state.data.converted_consultation : "0.00"}
              </Text>
              {(this.state.data.consultation_credits == false) ? this.state.data.consultation_credits : <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#0392cf',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '100%',
                  marginLeft: -20
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Credits
                </Text>
              </View>}
            </View>
          }

          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: '#efeff4'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    color: '#c4c4c4',
                    marginTop: '3%',
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                    fontSize: 13,
                    marginLeft: '7%',
                  }}
                >
                  Receipt
                </Text>
                <View style={{
                  padding: 5,
                  marginLeft: '3%',
                  width: '100%',
                  fontSize: 13
                }}>
                  {this.renderReceiptUpload()}
                </View>
              </View>
            </View>
          </View>

        </GiftedForm>
      )
    }
  }

  render() {
    console.warn("datanya " + (this.state.data.clinic_name) ? this.state.data.clinic_name : "");
    return (
      <Container>
        {this.customLoader()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryUser
          Amount={this.state.data.converted_amount}
          clinicname={this.state.data.clinic_name}
          clinicimage={this.state.data.clinic_image}
          Currency={this.state.data.currency_symbol}
        />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.renderContainerHistory()}

        </ScrollView>


      </Container>
    );
  }
}

export default History;
