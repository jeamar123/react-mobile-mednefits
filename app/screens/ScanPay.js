import React, { Component } from 'react';
import { StatusBar, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';

class ScanPay extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons
                name="angle-left"
                style={{ color: '#fff', fontSize: 32 }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'helvetica',
                }}
              >
                Home
              </Text>
            </Button>
          </Left>
          <Body>
            <Text
              style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}
            >
              Scan & Pay
            </Text>
          </Body>
          <Right />
        </Header>
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
