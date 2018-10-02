import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
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
import { DollarBenefits } from '../components/DollarBenefits';
import { Buttons } from '../components/common';
import { InputWithButton } from '../components/TextInput';

class BenefitsDollar extends Component {
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
              Benefit Dollars
            </Text>
          </Body>
          <Right />
        </Header>
        <DollarBenefits />
        <Content padder>
          <Card>
            <CardItem style={{ backgroundColor: '#E8E7EE' }}>
              <Body
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={require('../../assets/apps/mednefits.png')} />
                <Text style={{ marginTop: 10, fontFamily: 'helvetica' }}>
                  Medicloud Family Clinic
                </Text>
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
                <Text
                  style={{
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  Payment Amount
                </Text>
                <InputWithButton
                  keyboardType="numeric"
                  placeholder="S$ 00.00"
                />
              </Body>
            </CardItem>

            <Buttons>Pay</Buttons>
            <View style={{ marginBottom: 20 }} />
          </Card>
        </Content>
      </Container>
    );
  }
}
export default BenefitsDollar;
