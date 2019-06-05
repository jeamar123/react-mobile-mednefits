import React, { Component } from 'react';
import { StatusBar, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ResponsiveImage from 'react-native-responsive-image';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import RF from "react-native-responsive-fontsize";
import { Spinner, Popup } from '../components/common';
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
      feeConsultation: this.props.consultation_fees,
      byCash: '',
      amountTotal: ''
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

    this.props.services.map(value =>
      Core.GetProcedureDetails(value, (err, result) => {
        this.setState({
          amount: Number(result.data.price) + Number(this.state.amount),
        });
      })
    );

    const amounts = this.state.inputAmount;
    const cap = this.state.amountCap;
    const consultationAmount = this.state.feeConsultation;

    if (this.props.consultation_status == false) {
      this.setState({ amountTotal: Number(amounts) + Number(consultationAmount), byCash: (Number(amounts) + Number(consultationAmount)) - cap });
    } else {
      this.setState({ amountTotal: Number(amounts) + Number(consultationAmount), byCash: (Number(amounts) + Number(consultationAmount)) - cap });
    }
  }


  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      input_amount: this.props.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
      check_Id: this.props.check_Id
    };


    Core.CreatePayment(params, (err, result) => {
      console.warn(result);
      if (result.status) {
        Core.getNotify('', result.message);
        Actions.Summary({ result: result, clinic_image: this.state.clinic_image });
        this.setState({ isLoading: false });
      } else if (!result.status) {
        this.setState({ title: result.message, message: result.sub_mesage, failed: true, isLoading: false })
      } else {
        this.setState({ title: 'Payment Error', message: 'Failed to send payment, please try again', failed: true, isLoading: false })
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
                Bill Amount
              </Text>
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
              <Text style={{ marginBottom: responsiveHeight(2.2), fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                {this.state.currency ? this.state.currency : ' '}
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: RF(5.8), color: '#2C3E50' }}>
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
                {(this.props.consultation_status == false) ? this.props.capCurrency : this.props.consultation_fee_symbol} {(this.props.capCurrency == 'RM') ? this.props.consultation_fees + '.00' : this.props.consultation_fees}
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
                {this.state.currency ? this.state.currency : ' '} {(this.props.capCurrency == 'RM') ? (Number(this.state.amountTotal).toFixed(2).length === 2) ? Number(this.state.amountTotal).toFixed(2) + '.00' : Number(this.state.amountTotal).toFixed(2) : Number(this.state.amountTotal).toFixed(2)}
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 16 }}>
                {(this.props.capAmount === 0) ? '' : this.props.capCurrency} {(this.props.capAmount === 0) ? 'Not applicable' : (this.props.capCurrency == 'RM') ? this.props.capAmount + '.00' : this.props.capAmount}
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
                {this.state.currency ? this.state.currency : ' '} {
                  (this.props.amount > this.state.amountCap) ? (this.props.capCurrency == 'RM') ? this.props.capAmount + '.00' : this.props.capAmount : this.props.amount
                }
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
                {this.props.capCurrency} {
                  (this.props.capCurrency == 'RM') ? (Number(this.state.byCash).toFixed(2) < 0) ? '0.00' :
                    (Number(this.state.byCash).toFixed(2).length === 2) ?
                      Number(this.state.byCash).toFixed(2) + '.00' : Number(this.state.byCash).toFixed(2) :
                    (Number(this.state.byCash).toFixed(2) < 0) ? '0.00' : Number(this.state.byCash).toFixed(2)}
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

        </Content>
      </Container>
    );
  }
}
export default ConfirmPay;
