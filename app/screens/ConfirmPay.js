import React, { Component } from 'react';
import { StatusBar, Image, View, Dimensions } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ButtonsConfirm, Spinner, Popup } from '../components/common';
import Navbar from '../components/common/NavbarGrey';
import * as Config from '../config';
import * as Core from '../core';

class ConfirmPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: '',
      credits: '',
      currency: false,
      isLoading: false,
      Balance: '0',
      placeholder: null,
      failed: false,
      title: null,
      message: null,
      calculate: null
    };

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  componentDidMount() {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.log(result)
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
  }

  SendPayment() {
    this.setState({ isLoading: true });

    parameterData = {
      amount: this.props.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
      check_Id: this.props.check_Id
    };

    Core.CreatePayment(parameterData, (err, result) => {
      if (result.status) {
        Core.getNotify('', result.message);
        Actions.Summary({ result: result, type: 'reset' });
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
        <Navbar leftNav="cancel" title="Summary" />
        <Content padder>

          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2%',
                marginBottom: '2%'
              }}
            >
              {!this.state.clinic_image ? (
                <Image
                  source={require('../../assets/apps/mednefits.png')}
                  style={{ height: 55, resizeMode: 'center', width: 155 }}
                />
              ) : (
                  <Image
                    source={{ uri: this.state.clinic_image }}
                    style={{ height: 55, resizeMode: 'center', width: 155 }}
                  />
                )}
              {!this.state.clinic_name ? (
                <Spinner size="small" />
              ) : (
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16, marginTop: '3%' }}>
                    {this.state.clinic_name}
                  </Text>
                )}

            </View>
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                flex: 1,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ marginTop: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 18, color: '#2C3E50' }}>
                  {this.state.currency ? this.state.currency : ' '} {' '}
                </Text>
                <Text style={{ marginTop: '1%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 44, color: '#2C3E50' }}>
                  {this.props.amount}
                </Text>
              </View>

            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <View style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 10,
                paddingLeft: 10,
                borderRadius: 3,
                borderWidth: 2,
                borderColor: "#bdbdbd",
                alignItems: 'flex-start',
                width: '48%'
              }}>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                  By Credits:
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontWeight: 'bold' }}>
                  {this.state.currency ? this.state.currency : ' '} {this.props.amount}
                </Text>
              </View>
              <View style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 10,
                paddingLeft: 10,
                borderRadius: 3,
                borderWidth: 2,
                borderColor: "#bdbdbd",
                alignItems: 'flex-start',
                width: '48%'
              }}>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                  By Cash:
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontWeight: 'bold' }}>
                  {this.props.capCurrency} {this.props.capAmount}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, marginBottom: '18%', marginTop: '8%' }}>
              <ButtonsConfirm
                onPress={() => this.SendPayment()}
                isLoading={this.state.isLoading}
              >
                Pay {this.state.currency ? this.state.currency : ' '} {this.props.amount}
              </ButtonsConfirm>
            </View>
          </View>

        </Content>
      </Container>
    );
  }
}
export default ConfirmPay;
