import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import {
  Container,
  Content,
  Left,
  Right,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';
import { SummaryComp } from '../components/SummaryComp';
import styles from '../components/SummaryComp/styles';
import Navbar from '../components/common/Navbar';

class Summary extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="null"
          title="Summary"
          subtitle="In-Network"
          rightNav="done"
        />
        <SummaryComp />
        <Content padder>
          <Card>
            <CardItem style={{ backgroundColor: '#fff' }}>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 14,
                    fontFamily: 'helvetica',
                  }}
                >
                  Medicloud Family Clinic
                </Text>
                <View
                  style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <Text style={styles.detailUp}>S$</Text>
                  <Text style={styles.detail}>100</Text>
                  <Text style={styles.detailUp}>00</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Left>
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Service
                </Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 10 }}>
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Consultation
                </Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Left>
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Transaction Time
                </Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 10 }}>
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  01-10-2017 10:30
                </Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Left>
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Trans-ID
                </Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 10 }}>
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  IN74859204
                </Text>
              </Right>
            </CardItem>
            <View style={{ marginBottom: 10 }} />
          </Card>
        </Content>
      </Container>
    );
  }
}
export default Summary;
