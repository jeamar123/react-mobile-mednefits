import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/NavbarGrey';
import * as Commmon from '../components/common';
import * as Core from '../core';

class ScanPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touch: ''
    }
  }

  validationField() {
    if (this.state.touch == "") {
      Commmon.alerty(
        'Mednefits',
        'You have selected payment type via Cash/Nets/Credit Card, please pay direct to health provider',
        [
          {
            text: 'Cancel',
            onPress: () => console.warn('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.SendPayment() },
        ]
      );
    }
  }

  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      services: this.props.services,
      clinic_id: this.props.clinicid,
      check_Id: this.props.check_Id,
    };

    Core.PayDirect(params, (err, result) => {
      if (result.status) {
        Core.getNotify('', result.message);
        Actions.Home({ result: result });
      } else if (!result.status) {
        Core.getNotify('', result.message);
      } else {
        Core.getNotify('', 'Failed to payment, please try again');
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
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Scan & Pay" />
        <Content padder>
          <TouchableOpacity onPress={() => Actions.ConfirmPay({
            services: this.props.services,
            clinicid: this.props.clinicid,
            amount: this.props.amount,
            capCurrency: this.props.capCurrency,
            capAmount: this.props.capAmount,
            check_Id: this.props.check_Id
          })}>
            <Card>
              <CardItem>
                <Body
                  style={{
                    height: 290,
                    width: '95%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image style={{ width: 50, height: 50 }} source={require('../../assets/apps/byCredit.png')} />
                  <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                    Pay by Mednefits Credits
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.validationField()}>
            <Card>
              <CardItem>
                <Body
                  style={{
                    height: 290,
                    width: '95%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image style={{ width: 50, height: 50 }} source={require('../../assets/apps/byCash.png')} />
                  <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                    Pay by Cash
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
export default ScanPay;
