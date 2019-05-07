import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/NavbarGrey';

class ScanPay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Scan & Pay" />
        <Content padder>
          <TouchableOpacity onPress={() => Actions.BenefitsDollar({
            services: this.props.services,
            clinicid: this.props.clinicid,
            capCurrency: this.props.capCurrency,
            capAmount: this.props.capAmount,
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
          <TouchableOpacity onPress={() => Actions.Paycash({ services: this.props.services, clinicid: this.props.clinicid })}>
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
