import React, { Component } from 'react';
import { StatusBar, Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import Navbar from '../components/common/Navbar';

class ScanPay extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Scan & Pay" />
        <Content padder>
          <Card>
            <CardItem>
              <Body
                style={{
                  height: 200,
                  width: 200,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={require('../../assets/apps/byCredit.png')} />
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Pay by Benefits Credit
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body
                style={{
                  height: 200,
                  width: 200,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={require('../../assets/apps/byCash.png')} />
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Pay by Cash
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default ScanPay;
