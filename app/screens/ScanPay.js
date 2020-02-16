import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import ResponsiveImage from 'react-native-responsive-image';
import Navbar from '../components/common/NavbarGrey';
import * as Commmon from '../components/common';
import * as Core from '../core';
import * as Config from '../config';

class ScanPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touch: '',
      timeNow: ''
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

  componentDidMount() {
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



  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      input_amount: this.props.amount,
      services: this.props.services,
      services: !this.props.services.length ? this.props.default_service : this.props.services,
      clinic_id: this.props.clinicid,
      check_in_id: this.props.checkId,
      check_out_time: this.state.timeNow
    };

    Core.PayDirect(params, async (err, result) => {
      if (result.status) {
        Core.getNotify('', 'Transaction Successful');
        user = await Core.GetDataLocalReturnNew('user_id');
        newUserCheckinIDName = Config.CHECKIDVISIT + '_' + user;
        AsyncStorage.removeItem(newUserCheckinIDName);
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
    // console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Payment Type" />
        <Content padder>
          <TouchableOpacity onPress={() => Actions.ConfirmPay({
            services: !this.props.services.length ? this.props.default_service : this.props.services,
            clinicid: this.props.clinicid,
            amount: this.props.amount,
            capCurrency: this.props.capCurrency,
            capAmount: this.props.capAmount,
            balance: this.props.balance,
            checkId: this.props.checkId,
            consultation_fee_symbol: this.props.consultation_fee_symbol,
            consultation_status: this.props.consultation_status,
            consultation_fees: this.props.consultation_fees,
            clinic_image: this.props.clinic_image,
            clinic_name: this.props.clinic_name,
            plan_type: this.props.plan_type,
            default_service: this.props.default_service
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
