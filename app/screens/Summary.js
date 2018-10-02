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
import { SummaryComp } from '../components/SummaryComp';
import styles from '../components/SummaryComp/styles';

class Summary extends Component {
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
              Summary
            </Text>
          </Body>
          <Right />
        </Header>
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
