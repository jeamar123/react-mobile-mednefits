import React, { Component } from 'react';
import { StatusBar, Image, View, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ButtonPay, Spinner, Popup } from '../components/common/';
import { InputPay } from '../components/TextInput';
import Navbar from '../components/common/Navbar';
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
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.log(result)
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url,
        currency: result.data.currency_symbol,
        Balance: result.data.current_balance,
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
        <Navbar leftNav="cancel" title="Mednefits Credits" />
        <Content padder>


          <View style={{ backgroundColor: '#f8f8fa' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%',
                alignItems: 'center',
                marginTop: '2%',
                marginBottom: '10%'
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
                  <Text style={{ marginRight: '30%', fontFamily: Config.FONT_FAMILY_ROMAN, color: '#9e9e9e', fontSize: 18 }}>
                    {this.state.clinic_name}
                  </Text>
                )}

            </View>
          </View>

          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                Payment Amount
              </Text>
            </View>
            <View
              style={{
                marginLeft: '20%',
                marginRight: '20%',
              }}>
              <Common.Divider />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center',
                width: '100%'
              }}
            >
              <Text style={{ paddingBottom: '7%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 20, color: '#9f9f9f', }}>
                {this.state.currency ? this.state.currency : ' '}
              </Text>
              <InputPay
                keyboardType="numeric"
                placeholder="0.00"
                value={this.state.amount}
                onChangeText={number => this.setState({ amount: number })}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%',
                marginBottom: '10%'
              }}
            >
              <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                Current Balance: {this.state.Balance}
              </Text>
            </View>
          </View>




          {/* <Card>
            <CardItem style={{ backgroundColor: '#f8f8fa' }}>
              <Body style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }}>
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
                    <Text style={{ marginRight: '30%', fontFamily: Config.FONT_FAMILY_ROMAN, color: '#a1a1a2', fontSize: 18 }}>
                      {this.state.clinic_name}
                    </Text>
                  )}
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, alignItems: 'center', justifyContent: 'center' }}>
                  Payment Amount
                </Text>
                <View
                  style={{
                    borderBottomColor: '#bcbcbc',
                    borderBottomWidth: 0.8,
                    marginTop: '-2%',
                    marginBottom: '5%',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ marginTop: '7%', fontFamily: 'helvetica' }}>
                    {this.state.currency ? this.state.currency : ' '}
                  </Text>
                  <InputWithButton
                    keyboardType="numeric"
                    placeholder="0.00"
                    value={this.state.amount}
                    onChangeText={number => this.setState({ amount: number })}
                  />
                </View>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Body
                style={{
                  height: 150,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginLeft: 50,
                }}
              >
                <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, alignItems: 'center', justifyContent: 'center' }}>
                  Payment Amount
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ marginTop: '7%', fontFamily: 'helvetica' }}>
                    {this.state.currency ? this.state.currency : ' '}
                  </Text>
                  <InputWithButton
                    keyboardType="numeric"
                    placeholder="0.00"
                    value={this.state.amount}
                    onChangeText={number => this.setState({ amount: number })}
                  />
                </View>
              </Body>
            </CardItem>
          </Card> */}

          <View style={{ marginBottom: '5%' }} />
          <ButtonPay onPress={() => Actions.ConfirmPay({ services: this.props.services, clinicid: this.props.clinicid, amount: this.state.amount })}>
            Next
            </ButtonPay>
        </Content>
      </Container>
    );
  }
}
export default BenefitsDollar;
