import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import ResponsiveImage from 'react-native-responsive-image';
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
        Actions.Home({ result: result, type: 'reset' });
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
        <Navbar leftNav="back" title="Payment Type" />
        <Content padder>
          <TouchableOpacity onPress={() => Actions.ConfirmPay({
            services: this.props.services,
            clinicid: this.props.clinicid,
            amount: this.props.amount,
            capCurrency: this.props.capCurrency,
            capAmount: this.props.capAmount,
            check_Id: this.props.check_Id,
            consultation_fee_symbol: this.props.consultation_fee_symbol,
            consultation_status: this.props.consultation_status,
            consultation_fees: this.props.consultation_fees,
            clinic_image: this.props.clinic_image,
            clinic_name: this.props.clinic_name,
          })}>
            <Card>
              <CardItem>
                <Body
                  style={{
                    height: responsiveHeight(38),
                    width: '95%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ResponsiveImage
                    source={require('../../assets/apps/byCredit.png')}
                    initWidth="55" initHeight="55"
                  />
                  <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                    Mednefits Credits
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
                    height: responsiveHeight(38),
                    width: '95%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ResponsiveImage
                    source={require('../../assets/apps/byCash.png')}
                    initWidth="55" initHeight="55"
                  />
                  <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                    Cash/Nets/Credit Card
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
