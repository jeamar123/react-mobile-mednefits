import React, { Component } from 'react';
import { StatusBar, View, Dimensions } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Title,
  Text,
  Body,
} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Buttons } from '../components/common';
const { width, height } = Dimensions.get('window');

class SelectService extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#EEEEEE' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#EEEEEE' }}>
          <Left>
            <Button transparent>
              <Icons
                name="angle-left"
                style={{ color: '#000', fontSize: 32 }}
              />
              <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                Home
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>Select Service/s</Title>
            <Text style={{ color: '#000' }}>Scan & Pay</Text>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View style={styles.contain}>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'helvetica' }}>Consultation</Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'helvetica' }}>
                Scaling & Polishing
              </Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'helvetica' }}>Fillings</Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'helvetica' }}>Extraction</Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'helvetica' }}>X-Ray</Text>
            </View>
          </View>

          <View style={{ marginTop: 50 }} />
          <Buttons>Proceed</Buttons>
        </Content>
      </Container>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridBox: {
    width: width / 3.9,
    height: height / 8,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default SelectService;
