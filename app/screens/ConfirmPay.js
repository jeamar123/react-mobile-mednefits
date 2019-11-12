import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ResponsiveImage from 'react-native-responsive-image';
import AsyncStorage from '@react-native-community/async-storage';
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
      byCash: 0,
      byCredit: 0,
      amountTotal: 0,
      timeNow: ''
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ showPopUp: false })
  }

  async getUserBalance() {
    await Core.GetBalance(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        Balance: String(this.props.balance),
        currency: result.data.currency_symbol
      });

      this.calculateValues();
    });
  }

  calculateValues() {
    this.props.services.map(value =>
      Core.GetProcedureDetails(value, (err, result) => {
        this.setState({
          amount: Number(result.data.price) + Number(this.state.amount),
        });
      })
    );
    console.log( this.props );
    console.log( this.state );
    const consultationAmount = this.state.feeConsultation;
    const totalAmount = Number( this.state.inputAmount.replace(',','') ) + Number( consultationAmount );
    const balance = this.state.Balance.replace(',','');
    const cap = this.state.amountCap;
    var payCredit = 0;
    var payCash = 0;
    console.log( this.props );
    console.log( this.state );

    if( Number( cap ) > 0 ){
      if( Number( cap ) > Number( balance ) ){
        if( Number( totalAmount ) > Number( balance ) ){
          payCredit = Number( balance );
          payCash = Number( totalAmount ) - Number( balance );
        }else{
          payCredit = Number( totalAmount );
          payCash = 0;
        }
      }else if( Number( cap ) == Number( totalAmount ) ){
        payCredit = Number( totalAmount );
        payCash = 0;
      }else{
        if( Number( totalAmount ) > Number( cap ) ){
          payCredit = Number( cap );
          payCash = Number( totalAmount ) - Number( cap );
        }else if( Number( cap ) > Number( totalAmount ) ){
          payCredit = Number( totalAmount );
          payCash = 0;
        }
      }
    }else{
      if( Number( totalAmount ) > Number( balance ) ){
        payCredit = Number( balance );
        payCash = Number( totalAmount ) - Number( balance );
      }else{
        payCredit = Number( totalAmount );
        payCash = 0;
      }
    }

    this.setState({ 
      amountTotal: ( Number(totalAmount) ).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}), 
      byCash: ( payCash ).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}),
      byCredit: ( payCredit ).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}),
    });

    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      timeNow:
        year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  componentDidMount() {
    this.getUserBalance();
  }

  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      input_amount: Number( this.props.amount.replace(',','') ),
      services: this.props.services,
      clinic_id: this.props.clinicid,
      check_in_id: this.props.checkId,
      check_out_time: this.state.timeNow
    };

    Core.CreatePayment(params, async (err, result) => {
      // console.warn(result);
      console.log( result );
      if (result.status) {
        Core.getNotify('', result.message);
        user = await Core.GetDataLocalReturnNew('user_id');
        newUserCheckinIDName = Config.CHECKIDVISIT + '_' + user;
        AsyncStorage.removeItem(newUserCheckinIDName);
        Actions.Summary({ result: result, clinic_image: this.props.clinic_image, type: 'reset' });
        this.setState({ isLoading: false });
      } else if (!result.status) {
        this.setState({ title: result.message, message: result.sub_mesage, failed: true, isLoading: false })
      } else {
        this.setState({ title: 'Payment Error', message: 'Failed to send payment, please try again', failed: true, isLoading: false })
      }
    });
  }

  statusModal = () => {
    // console.warn('modal hide completely')
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

  PaybyCredit() {
    if (this.props.capAmount === 0) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} {this.state.byCash}
          </Text>
        </View >
      )
    } else if (this.state.amountTotal > this.state.amountCap) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} {this.props.capAmount}
          </Text>
        </View >
      )
    } else if (this.state.amountTotal < this.state.amountCap) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} {this.state.amountTotal}
          </Text>
        </View>
      )
    } else if (this.state.amountTotal > this.state.Balance) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} {this.state.Balance}
          </Text>
        </View>
      )
    } else if (this.state.amountTotal == this.state.amountCap) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} {this.props.capAmount}
          </Text>
        </View>
      )
    }
    else {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} 0.00
          </Text>
        </View>
      )
    }
  }

  PaybyCash() {
    if (this.props.capAmount === 0) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} 0.00
          </Text>
        </View >
      )
    } else if (Number(this.state.byCash) < 0) {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} 0.00
          </Text>
        </View >
      )
    } else {
      return (
        <View>
          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
            {this.props.capCurrency ? this.props.capCurrency : ' '} {
              Number(this.state.byCash).toFixed(2)
            }
          </Text>
        </View >
      )
    }
  }


  render() {
    // console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        {this.customLoader()}
        {this.renderPopUp()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Summary" />
        <Content padder>
          <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', paddingBottom: responsiveHeight(1.5) }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '4%',
                height: responsiveHeight(11)
              }}
            >
              {!this.props.clinic_name ? (
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
                      source={{ uri: this.props.clinic_image }}
                      style={{ resizeMode: 'contain', marginRight: responsiveWidth(4) }}
                      initWidth="75" initHeight="75"
                    />

                    <Text
                      style={{
                        // marginLeft: '-5%',
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        color: '#666666',
                        fontSize: 18,
                        width: responsiveWidth(65),
                        marginRight: responsiveWidth(5),
                      }}
                      numberOfLines={3}
                    >
                      {this.props.clinic_name}
                    </Text>
                  </View>
                )}
            </View>
          </View>

          <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', height: responsiveHeight(27) }}>
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
              <Text style={{ marginBottom: responsiveHeight(2.2), fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(3.2) }}>
                {this.props.capCurrency ? this.props.capCurrency : ' '}
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: RF(5.8), color: '#2C3E50' }}>
                { this.props.amount }
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
                {this.props.capCurrency ? this.props.capCurrency : ' '} {Number(this.props.consultation_fees).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: responsiveHeight(4.5),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                Total Amount
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 16 }}>
                {this.props.capCurrency ? this.props.capCurrency : ' '} {this.state.amountTotal}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#dde0e4', marginTop: responsiveHeight(2), paddingTop: responsiveHeight(0.5), height: responsiveHeight(7), paddingBottom: responsiveHeight(2) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: responsiveHeight(0.5),
                paddingBottom: responsiveHeight(1.5),
                marginBottom: '5%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Cap
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 16 }}>
                {(this.props.capAmount === 0) ? '' : this.props.capCurrency} {(this.props.capAmount === 0) ? 'Not applicable' : Number(this.props.capAmount).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#fff', marginTop: responsiveHeight(2), height: responsiveHeight(15.5) }}>
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
                {this.props.capCurrency ? this.props.capCurrency : ' '} {this.state.byCredit}
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
                paddingTop: responsiveHeight(0.5),
                paddingBottom: responsiveHeight(4.5),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Payable by Cash
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#3f9d59', fontSize: 16 }}>
                {this.props.capCurrency ? this.props.capCurrency : ' '} {this.state.byCash}
              </Text>
            </View>
          </View>

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: responsiveHeight(5)
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
