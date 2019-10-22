import React, { Component } from 'react';
import {
  StatusBar,
  View,
  ActivityIndicator,
  Easing,
  ScrollView,
  RefreshControl,
  TouchableOpacity
}
  from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ZoomImage from 'react-native-zoom-image';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import RF from "react-native-responsive-fontsize";
import { HistoryUser } from '../components/HistoryUser';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';
import * as Common from '../components/common';

const options = {
  title: 'Upload Your Receipt',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};

class History extends Component {
  constructor(props) {
    super(props);
    this.toggleCurrency = this.toggleCurrency.bind(this);
    this.state = {
      imageSource: {
        uri: '',
      },
      data: false,
      isLoading: false,
      refreshing: false,
      currency_symbol: this.props.currency_symbol == 'S$' || this.props.currency_symbol == 'SGD' ? 'SGD' : 'MYR',
      malaysia_exchange_rate: '3.00',
    };
    this.selectPhoto = this.selectPhoto.bind(this);
    console.log( this.props );
    console.log( this.state );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    Core.GetUserNetwork(this.props.transaction_id, (result) => {
      data = (typeof result == "string") ? JSON.parse(result.data) : result.data
      console.warn(data)
      this.setState({
        data: data, 
        total_amount: data.total_amount,
        cap_per_visit: data.cap_per_visit,
        bill_amount: data.bill_amount,
        consultation_fee: data.consultation_fee,
        paid_by_credits: data.paid_by_credits,
        paid_by_cash: data.paid_by_cash,
        malaysia_exchange_rate: data.malaysia_exchange_rate ? data.malaysia_exchange_rate : 3,
        refreshing: false,
      })
    })
  }

  toggleCurrency(){
    if( this.state.currency_symbol == 'SGD' ){
      this.setState({
        currency_symbol: 'MYR',
        total_amount: parseFloat( this.state.total_amount /= this.state.malaysia_exchange_rate ).toFixed(2),
        cap_per_visit: parseFloat( this.state.cap_per_visit /= this.state.malaysia_exchange_rate ).toFixed(2),
        bill_amount: parseFloat( this.state.bill_amount /= this.state.malaysia_exchange_rate ).toFixed(2),
        consultation_fee: parseFloat( this.state.consultation_fee /= this.state.malaysia_exchange_rate ).toFixed(2),
        paid_by_credits: parseFloat( this.state.paid_by_credits /= this.state.malaysia_exchange_rate ).toFixed(2),
        paid_by_cash: parseFloat( this.state.paid_by_cash /= this.state.malaysia_exchange_rate ).toFixed(2),
      });
    }else{
      this.setState({
        currency_symbol: 'SGD',
        total_amount: parseFloat( this.state.total_amount *= this.state.malaysia_exchange_rate ).toFixed(2),
        cap_per_visit: parseFloat( this.state.cap_per_visit *= this.state.malaysia_exchange_rate ).toFixed(2),
        bill_amount: parseFloat( this.state.bill_amount *= this.state.malaysia_exchange_rate ).toFixed(2),
        consultation_fee: parseFloat( this.state.consultation_fee *= this.state.malaysia_exchange_rate ).toFixed(2),
        paid_by_credits: parseFloat( this.state.paid_by_credits *= this.state.malaysia_exchange_rate ).toFixed(2),
        paid_by_cash: parseFloat( this.state.paid_by_cash *= this.state.malaysia_exchange_rate ).toFixed(2),
      });
    }
    // console.log( this.state );
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
        data: data,
        total_amount: data.total_amount,
        cap_per_visit: data.cap_per_visit,
        bill_amount: data.bill_amount,
        consultation_fee: data.consultation_fee,
        paid_by_credits: data.paid_by_credits,
        paid_by_cash: data.paid_by_cash,
        malaysia_exchange_rate: data.malaysia_exchange_rate ? data.malaysia_exchange_rate : 3,
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

  renderreceiptUpload() {
    if (this.state.data.files.length > 0) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: '5%',
          marginRight: '5%'
        }}>
          <View style={{ marginTop: responsiveHeight(2) }}>
            <TouchableOpacity
              onPress={() => Actions.ReceiptView({
                receiptFiles: Object.assign({}, {
                  images: this.state.data.files.map((Images, index) => (Images.file))
                }),
                imageFile: this.state.data.files
              })}
              style={{
                backgroundColor: "#efeff4",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderColor: '#0392cf',
                borderWidth: 1,
                paddingRight: '35%',
                paddingLeft: '35%'
              }}
            >
              <Common.Texti
                fontSize={16}
                fontColor={"#0392cf"}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                View Receipt
              </Common.Texti>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <TouchableOpacity
              onPress={() => Actions.receiptUpload({ transaction_id: this.props.transaction_id })}
              style={{
                backgroundColor: "#efeff4",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderColor: '#848484',
                borderWidth: 1,
                paddingRight: '32.5%',
                paddingLeft: '32.5%'
              }}
            >
              <Common.Texti
                fontSize={16}
                fontColor={"#848484"}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                Upload Receipt
            </Common.Texti>
            </TouchableOpacity>
          </View>
        </View>
      )

      // return this.state.data.files.map((Data, index) => (
      //   <ZoomImage
      //     imgStyle={{
      //       width: 80,
      //       height: 100,
      //       marginLeft: '18.5%',
      //       paddingTop: 5,
      //       paddingBottom: 5,
      //       backgroundColor: '#fff',
      //       borderRadius: 10,
      //       borderWidth: 1,
      //       borderColor: '#c4c4c4',
      //     }}
      //     enableScaling={true}
      //     easingFunc={Easing.ease}
      //     duration={200}
      //     source={{
      //       uri: !Data.file
      //         ? '../../assets/photo.png'
      //         : Data.file,
      //     }}
      //   />
      // ));

    } else if (this.state.data.files) {
      return (
        <View
          style={{
            flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: '5%',
            marginRight: '5%'

          }}>
          <View style={{ flex: 1, width: '100%', marginTop: responsiveHeight(2), marginBottom: responsiveHeight(10) }}>
            <TouchableOpacity
              onPress={() => Actions.receiptUpload({ transaction_id: this.props.transaction_id })}
              style={{
                backgroundColor: "#efeff4",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderColor: '#0392cf',
                borderWidth: 1,
                paddingRight: '32.5%',
                paddingLeft: '32.5%'
              }}
            >
              <Common.Texti
                fontSize={16}
                fontColor={"#0392cf"}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                Upload Receipt
                </Common.Texti>
            </TouchableOpacity>

          </View>
        </View >
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
        // <GiftedForm
        //   style={{ backgroundColor: 'white' }}
        //   formName="signupForm"
        //   openModal={route => {
        //     navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
        //   }}
        // >

        //   <View
        //     style={{
        //       flex: 1,
        //     }}>
        //     <View
        //       style={{
        //         backgroundColor: '#efeff4'
        //       }}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignContent: 'space-between',
        //           marginVertical: 20,
        //         }}
        //       >
        //         <Text
        //           style={{
        //             color: '#c4c4c4',
        //             marginTop: '3%',
        //             fontFamily: Config.FONT_FAMILY_ROMAN,
        //             fontSize: 13,
        //             marginLeft: '7%',
        //           }}
        //         >
        //           Receipt
        //         </Text>
        //         <View style={{
        //           padding: 5,
        //           marginLeft: '3%',
        //           width: '100%',
        //           fontSize: 13
        //         }}>
        //           {this.renderreceiptUpload()}
        //         </View>
        //       </View>
        //     </View>
        //   </View>


        // </GiftedForm>

        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <View
            style={{
              backgroundColor: '#EFEFF4',
              width: '100%',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1%',
                  paddingBottom: '5%',
                  marginLeft: '5%',
                  marginRight: '5%'
                }}
              >
                <View>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#B1B1B1', fontSize: 16, marginTop: responsiveHeight(-1) }}>
                    Bill Details
                  </Text>
                </View>

              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                marginTop: responsiveHeight(1.5),
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.9) }}>
                Bill Amount
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {(this.state.currency_symbol) ? this.state.currency_symbol : "N/A"} {(this.state.bill_amount) ? this.state.bill_amount : "0.00"}
              </Text>
            </View>

            <View
              style={{
                marginTop: responsiveHeight(1.5),
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.9) }}>
                Consultation Fee
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {(this.state.currency_symbol) ? this.state.currency_symbol : "N/A"} {(this.state.consultation_fee) ? this.state.consultation_fee : "0.00"}
              </Text>
            </View>

            <View
              style={{
                marginTop: responsiveHeight(1.5),
                marginBottom: responsiveHeight(1),
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.9) }}>
                Total Amount
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {(this.state.currency_symbol) ? this.state.currency_symbol : "N/A"} {(this.state.total_amount) ? this.state.total_amount : "0.00"}
              </Text>
            </View>

            <View>
              <Common.Divider />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1),
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.9) }}>
                Paid by Credits
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {(this.state.currency_symbol) ? this.state.currency_symbol : "N/A"} {(this.state.paid_by_credits) ? this.state.paid_by_credits : "0.00"}
              </Text>
            </View>
            <View>
              <Common.Divider />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(2.5),
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.9) }}>
                Paid by Cash
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {(this.state.currency_symbol) ? this.state.currency_symbol : "N/A"} {(this.state.paid_by_cash) ? this.state.paid_by_cash : "0.00"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: '#efeff4',
                marginBottom: responsiveHeight(10)
              }}>
              <View>
                <View style={{
                  width: '100%',
                }}>
                  {this.renderreceiptUpload()}
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }

  render() {
    console.warn("datanya " + (this.state.data.clinic_name) ? this.state.data.clinic_name : "");
    return (
      <Container>
        {this.customLoader()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar 
          leftNav="history-back" 
          rightNav="currency-toggle" 
          currency_symbol={ this.props.currency_symbol } 
          updateCurrency={ this.toggleCurrency }
          title="History" 
        />
        <HistoryUser
          Currency={this.state.currency_symbol}
          Amount={this.state.total_amount}
          transaction_id={this.state.data.transaction_id}
          date_of_transaction={this.state.data.date_of_transaction}
          customer={this.state.data.customer}
          clinicname={this.state.data.clinic_name}
          clinicimage={this.state.data.clinic_image}
          services={this.state.data.services}
          cap_per_visit={this.state.cap_per_visit}
          cap_transaction={this.state.data.cap_transaction}
          malaysia_exchange_rate={this.state.malaysia_exchange_rate}
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
