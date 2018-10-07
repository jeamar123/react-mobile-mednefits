import React, { Component } from 'react';
import { StatusBar, View, Dimensions } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Buttons } from '../components/common';
import Navbar from '../components/common/Navbar';
const { width, height } = Dimensions.get('window');

class SelectService extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#eeeeee' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back-home"
          title="Select Service/s"
          subtitle="Scan & Pay"
        />
        <Content padder>
          <View style={styles.contain}>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'HelveticaNeue-Roman' }}>
                Consultation
              </Text>
            </View>
            <View style={styles.gridBox}>
              <Text
                style={{
                  fontFamily: 'HelveticaNeue-Roman',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Scaling & Polishing
              </Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'HelveticaNeue-Roman' }}>
                Fillings
              </Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'HelveticaNeue-Roman' }}>
                Extraction
              </Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={{ fontFamily: 'HelveticaNeue-Roman' }}>X-Ray</Text>
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
