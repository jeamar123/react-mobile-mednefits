import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Numeral from "numeral";
import ResponsiveImage from 'react-native-responsive-image';
import { ButtonPay, Spinner, Popup } from '../components/common/';
import { InputPay } from '../components/TextInput';
import Navbar from '../components/common/NavbarGrey';
import * as Core from '../core';
import * as Config from '../config';
import * as Common from '../components/common';

class BenefitsDollar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: 0,
      currency: false,
      isLoading: false,
      Balance: this.props.balance,
      placeholder: null,
      failed: false,
      title: null,
      message: null,
      default_service: [this.props.default_service.procedureid]
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
    console.log(this.props);
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  async componentDidMount() {
    await this.getUserBalance();

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

  async getUserBalance() {
    await Core.GetBalance(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        Balance: data.balance,
        currency: result.data.currency_symbol
      });
    });
  }

  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      amount: this.state.amount,
      services: !this.props.services.length ? this.state.default_service : this.props.services,
      clinic_id: this.props.clinicid,
      check_in_id: this.props.checkId,
      check_out_time: this.state.timeNow
    };

    Core.SendPayment(params, (err, result) => {
      console.log(result);
      if (result.status) {
        Core.getNotify('', result.message);

        Actions.Summary({ result: result });
      } else if (!result.status) {
        // Core.getNotify('', result.message);
        this.setState({ title: result.message, message: result.sub_mesage, failed: true })

      } else {
        // Core.getNotify('', 'Failed to send payment, please try again');
        this.setState({ title: 'Payment Error', message: 'Failed to send payment, please try again', failed: true })
      }

      if (result) {
        this.setState({ isLoading: false });
      }
    });
  }

  nextButton() {
    if (this.props.plan_type == 'enterprise_plan') {
      Actions.ConfirmPay({
        services: !this.props.services.length ? this.state.default_service : this.props.services,
        clinicid: this.props.clinicid,
        amount: this.state.amount,
        capCurrency: this.props.capCurrency,
        capAmount: this.props.capAmount,
        balance: this.state.Balance,
        checkId: this.props.checkId,
        consultation_fee_symbol: this.props.consultation_fee_symbol,
        consultation_status: this.props.consultation_status,
        consultation_fees: this.props.consultation_fees,
        clinic_image: this.props.clinic_image,
        clinic_name: this.props.clinic_name,
        plan_type: this.props.plan_type,
        default_service: this.props.default_service
      })
    } else {
      Actions.PayScan({
        services: !this.props.services.length ? this.state.default_service : this.props.services,
        clinicid: this.props.clinicid,
        amount: this.state.amount,
        capCurrency: this.props.capCurrency,
        capAmount: this.props.capAmount,
        balance: this.state.Balance,
        checkId: this.props.checkId,
        consultation_fee_symbol: this.props.consultation_fee_symbol,
        consultation_status: this.props.consultation_status,
        consultation_fees: this.props.consultation_fees,
        clinic_image: this.props.clinic_image,
        clinic_name: this.props.clinic_name,
        plan_type: this.props.plan_type,
        default_service: this.props.default_service
      })
    }
  }

  formatInputValue(number) {
    console.log(number);
    if (number == '' || number == 0) {
      this.setState({ amount: 0 });
    } else {
      this.setState({ amount: number });
    }
  }

  render() {
    console.warn("PropsFromHome: " + JSON.stringify(this.props))
    console.warn("balance" + (Numeral(this.state.Balance).value() * 3).toFixed(2))
    console.warn("servicesProps: " + this.props.services)
    console.warn("defaultServices02: " + this.props.default_service.procedureid)
    console.warn("defaultServices: " + this.state.default_service)

    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <Core.Loader isVisible={this.state.isLoading} />
        <Popup
          kind="insufficientCredit"
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="cancel"
          title="Payment Amount"
        />
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

          <View style={{ backgroundColor: '#ffffff', justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                Enter Bill Amount
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
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5)
              }}
            >
              <Text style={{
                paddingBottom: '7%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 24,
                color: '#9f9f9f',
                alignItems: 'center',
              }}>
                {this.props.capCurrency ? this.props.capCurrency : ' '}
              </Text>
              <InputPay
                keyboardType="numeric"
                returnKeyType='done'
                placeholder="0.00"
                value={this.state.amount}
                onChangeText={number => this.formatInputValue(number)}
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  height: 70,
                  fontSize: 46,
                  marginLeft: responsiveWidth(6),
                  width: '100%',
                  color:
                    (!this.state.amount) ? "#B0B0B0" : "#2c3e50",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: '5%' }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{
              backgroundColor: '#fff',
              width: '45%',
              paddingLeft: responsiveWidth(5),
              paddingTop: responsiveWidth(3),
              paddingBottom: responsiveWidth(3)
            }}>
              {this.props.plan_type == 'enterprise_plan' ?
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2c3e50', fontSize: 17 }}>
                  Balance: {'\n'}N.A.
                </Text>
                :
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2c3e50', fontSize: 17 }}>
                  {/* Balance: {'\n'}{this.props.capCurrency} {(parseFloat(this.state.Balance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                  Balance: {'\n'}{this.props.capCurrency} {this.state.Balance}
                </Text>
              }
            </View>

            <View style={{
              backgroundColor: '#fff',
              width: '45%',
              paddingLeft: responsiveWidth(5),
              paddingTop: responsiveWidth(3),
              paddingBottom: responsiveWidth(3)
            }}>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2c3e50', fontSize: 17 }}>
                Cap: {'\n'}{(this.props.capAmount === 0) ?
                  'Not applicable'
                  : this.props.capCurrency + ' ' + Number(this.props.capAmount).toFixed(2)}
              </Text>
            </View>
          </View>


          {/*Actions.PayScan({
                services: this.props.services,
                clinicid: this.props.clinicid,
                amount: this.state.amount,
                capCurrency: this.props.capCurrency,
                capAmount: this.props.capAmount,
                balance: this.state.Balance,
                checkId: this.props.checkId,
                consultation_fee_symbol: this.props.consultation_fee_symbol,
                consultation_status: this.props.consultation_status,
                consultation_fees: this.props.consultation_fees,
                clinic_image: this.props.clinic_image,
                clinic_name: this.props.clinic_name,
              })*/}

          <View style={{ marginBottom: '5%' }} />
          <ButtonPay onPress={() =>
            (!this.state.amount) ?
              Common.getAlert("Mednefits", "Enter an Amount of 0 or more")
              :
              this.nextButton()
          }
          >
            Next
          </ButtonPay>
        </Content>
      </Container>
    );
  }
}
export default BenefitsDollar;
