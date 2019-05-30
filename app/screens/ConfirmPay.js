import React, { Component } from 'react';
import { StatusBar, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ResponsiveImage from 'react-native-responsive-image';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { ButtonsConfirm, Spinner, Popup } from '../components/common';
import Texti from "../components/common/Texti";
import Navbar from '../components/common/NavbarGrey';
import * as Config from '../config';
import * as Common from '../components/common';
import * as Core from '../core';

class ConfirmPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: 0,
      currency: false,
      isLoading: false,
      Balance: '0',
      placeholder: null,
      failed: false,
      title: null,
      message: null,
      showPopUp: false,
      inputAmount: this.props.amount,
      amountCap: this.props.capAmount,
      byCash: ''
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ showPopUp: false })
  }

  componentDidMount() {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.warn(result)
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url,
        currency: result.data.currency_symbol,
        Balance: result.data.current_balance,
        placeholder: result.data.currency_symbol == 'RM' ? 'Please input amount Malaysian Ringgit' : 'Please input amount in Singaporean Dollar'
      });
    });

    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })

    this.props.services.map(value =>
      Core.GetProcedureDetails(value, (err, result) => {
        this.setState({
          amount: Number(result.data.price) + Number(this.state.amount),
        });
      })
    );

    const amount = this.state.inputAmount;
    const cap = this.state.amountCap;
    this.setState({ byCash: amount - cap });
  }


  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      amount: this.props.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
      check_Id: this.props.check_Id
    };


    Core.CreatePayment(params, (err, result) => {
      console.warn(result);
      if (result.status) {
        Core.getNotify('', result.message);
        Actions.Summary({ result: result });
        this.setState({ isLoading: false });
      } else if (!result.status) {
        // Core.getNotify('', result.message);
        this.setState({ title: result.message, message: result.sub_mesage, failed: true, isLoading: false })
      } else {
        this.setState({ title: 'Payment Error', message: 'Failed to send payment, please try again', failed: true, isLoading: false })
        // Core.getNotify('', 'Failed to send payment, please try again');
      }
    });
  }

  statusModal = () => {
    console.warn('modal hide completely')
    if (this.state.failed) {
      this.setState({ showPopUp: true });
    } else {
      this.setState({ showPopUp: false });
    }
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
          >Just a sec...</Texti>
        </Modal>
      </View>
    );
  }

  renderPopUp() {
    return (
      <Popup
        kind="insufficientCredit"
        isVisible={this.state.showPopUp}
        closeSection={true}
        closeSectionUpdate={this.isVisibleUpdate}
        title={this.state.title}
        message={this.state.message}
      />
    )
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        {this.customLoader()}
        {this.renderPopUp()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Summary" />
        <Content padder>
          <View style={{ backgroundColor: '#ffffff', justifyContent: 'center' }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '4%',
                height: responsiveHeight(11)
              }}
            >
              {!this.state.clinic_name ? (
                <Spinner size="small" />
              ) : (
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: responsiveWidth(5),
                    height: responsiveHeight(8)
                  }}
                  >
                    {/* <Image
                      source={{ uri: this.state.clinic_image }}
                      style={{
                        height: 65,
                        width: 65,
                        resizeMode: 'center',
                        
                      }}
                    /> */}
                    <ResponsiveImage
                      source={{ uri: this.state.clinic_image }}
                      style={{ resizeMode: 'center', marginRight: responsiveWidth(4) }}
                      initWidth="70" initHeight="70"
                    />

                    <Text
                      style={{
                        // marginLeft: '-5%',
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        color: '#666666',
                        fontSize: 18,
                        width: '100%'
                      }}
                      numberOfLines={2}
                    >
                      {this.state.clinic_name}
                    </Text>
                  </View>
                )}
            </View>
          </View>

          <View style={{ backgroundColor: '#ffffff', justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '5%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                Total Bill Amount
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
                marginTop: responsiveHeight(1)
              }}
            >
              <Text style={{
                paddingBottom: '7%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 24,
                color: '#9f9f9f',
                alignItems: 'center',
              }}>
                {this.state.currency ? this.state.currency : ' '}
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 48, color: '#2C3E50', fontWeight: 'bold' }}>
                {this.props.amount}
              </Text>
            </View>
            <View
              style={{
                marginLeft: '5%',
                marginRight: '5%',
              }}>
              <Common.Divider />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2),
                marginBottom: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                Consultation Fee
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 16 }}>
                {this.state.currency ? this.state.currency : ' '} {this.props.amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '7%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                Total Amount
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 16 }}>
                {this.state.currency ? this.state.currency : ' '} {this.props.amount}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#dde0e4', marginTop: responsiveHeight(3) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: responsiveHeight(1),
                paddingBottom: responsiveHeight(1),
                marginBottom: '5%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Cap
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 18 }}>
                {this.state.currency ? this.state.currency : ' '} {this.state.amountCap}
              </Text>

            </View>
          </View>

          <View style={{ backgroundColor: '#fff', marginTop: responsiveHeight(3) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: responsiveHeight(3),
                paddingBottom: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Payable by Credits
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 18 }}>
                {this.state.currency ? this.state.currency : ' '} {this.state.amountCap}
              </Text>
            </View>
            <View>
              <Common.Divider />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: responsiveHeight(1),
                paddingBottom: responsiveHeight(3),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Payable by Cash
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 18 }}>
                {this.props.capCurrency} {this.state.inputAmount < this.state.amountCap ? 0 : this.state.byCash}
              </Text>
            </View>
          </View>


          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: responsiveHeight(6)
          }}>
            <TouchableOpacity
              onPress={() => this.SendPayment()}
              isLoading={this.state.isLoading}
              style={{
                backgroundColor: "#3f9d59",
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
                  padding: 10,
                  fontWeight: 'bold'
                }}>
                PAY NOW
            </Common.Texti>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity style={{ backgroundColor: '#3f9d59',  }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: responsiveHeight(1),
                paddingBottom: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#FFF', fontSize: 16 }}>

              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ marginBottom: '2%', marginTop: '4%' }}>
            <ButtonsConfirm
              onPress={() => this.SendPayment()}
              isLoading={this.state.isLoading}
            >
              Pay {this.state.currency ? this.state.currency : ' '} {this.props.amount}
            </ButtonsConfirm>
          </View> */}
        </Content>
      </Container>
    );
  }
}
export default ConfirmPay;
