import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import styles from '../components/BalanceComp/styles';
import Navbar from '../components/common/Navbar';

class Balance extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" rightNav={true} />
        <Content padder>
          <View style={styles.container}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 20,
                color: '#666666',
              }}
            >
              How it Works
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'HelveticaNeue-Medium',
                marginTop: 60,
              }}
            >
              Your Benefits Credits
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'HelveticaNeue-Medium',
                marginTop: 30,
              }}
            >
              Balance
            </Text>
            <Text
              style={{
                fontSize: 42,
                color: '#0392cf',
                fontFamily: 'HelveticaNeue-Roman',
                marginTop: 10,
              }}
            >
              S$ 1,000.00
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'HelveticaNeue-Roman',
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
                  fontFamily: 'HelveticaNeue-Roman',
                }}
              >
                E-Claim Account
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 10,
                  fontFamily: 'HelveticaNeue-Roman',
                }}
              >
                Spent
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                  fontFamily: 'HelveticaNeue-Roman',
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
                  fontFamily: 'HelveticaNeue-Roman',
                }}
              >
                In-Network Account
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 10,
                  fontFamily: 'HelveticaNeue-Roman',
                }}
              >
                Spent
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                  fontFamily: 'HelveticaNeue-Roman',
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
