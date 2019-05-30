import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
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
      Balance: '0',
      placeholder: null,
      failed: false,
      title: null,
      message: null
    };

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  componentDidMount() {
    // Core.GetClinicDetails(98, (err, result) => {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.log(result)
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url,
        currency: result.data.currency_symbol,
        Balance: result.data.current_balance,
      });
    });
  }

  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      amount: this.state.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
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

  render() {
    console.warn("props: " + JSON.stringify(this.props))
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
                    <Image
                      source={{ uri: this.state.clinic_image }}
                      style={{
                        height: 65,
                        resizeMode: 'center',
                        width: 65,
                        marginRight: responsiveWidth(4)
                      }}
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
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 16 }}>
                Total Bill Amount
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
                {this.state.currency ? this.state.currency : ' '}
              </Text>
              <InputPay
                keyboardType="numeric"
                placeholder="0.00"
                value={this.state.amount}
                onChangeText={number => this.setState({ amount: number })}
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 17 }}>
                Balance: {'\n'}{this.state.Balance}
              </Text>
            </View>

            <View style={{
              backgroundColor: '#fff',
              width: '45%',
              paddingLeft: responsiveWidth(5),
              paddingTop: responsiveWidth(3),
              paddingBottom: responsiveWidth(3)
            }}>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: 17 }}>
                Cap: {'\n'}{this.props.capCurrency} {this.props.capAmount}
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: '5%' }} />
          <ButtonPay onPress={() => Actions.PayScan({
            services: this.props.services,
            clinicid: this.props.clinicid,
            amount: this.state.amount,
            capCurrency: this.props.capCurrency,
            capAmount: this.props.capAmount,
            check_Id: this.props.check_Id
          })}>
            Next
          </ButtonPay>
        </Content>
      </Container>
    );
  }
}
export default BenefitsDollar;
