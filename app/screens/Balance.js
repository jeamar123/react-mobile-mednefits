import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Text,
  Body,
} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from '../components/BalanceComp/styles';

class Balance extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons name="bars" style={{ color: '#fff', fontSize: 32 }} />
            </Button>
          </Left>
          <Body>
            <Text
              style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}
            >
              Mednefits
            </Text>
          </Body>
          <Right>
            <Button transparent>
              <Icons name="gear" style={{ color: '#fff', fontSize: 32 }} />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <View style={styles.container}>
            <Text style={{ fontFamily: 'helvetica', fontSize: 20 }}>
              How it Works
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'helvetica',
                marginTop: 60,
              }}
            >
              Your Benefits Credits
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'helvetica',
                marginTop: 30,
              }}
            >
              Balance
            </Text>
            <Text
              style={{
                fontSize: 42,
                color: '#0392cf',
                fontFamily: 'helvetica',
                marginTop: 10,
              }}
            >
              S$ 1,000.00
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'helvetica',
                marginTop: 50,
              }}
            >
              Applied in your next transactions
            </Text>
          </View>
          <View style={styles.ButtonStyle}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'helvetica',
                }}
              >
                E-Claim Account
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 10,
                  fontFamily: 'helvetica',
                }}
              >
                Spent
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                  fontFamily: 'helvetica',
                }}
              >
                S$ 68.00
              </Text>
            </View>
          </View>
          <View style={styles.ButtonStyle2}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'helvetica',
                }}
              >
                In-Network Account
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 10,
                  fontFamily: 'helvetica',
                }}
              >
                Spent
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                  fontFamily: 'helvetica',
                }}
              >
                S$ 140.00
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Balance;
