import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
const options = {
  title: 'Choose you Pay Receipt',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};

class ScanPay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Scan & Pay" />
        <Content padder>
          <TouchableOpacity onPress={() => Actions.BenefitsDollar({services: this.props.services, clinicid: this.props.clinicid})}>
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
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.BenefitsDollar({services: this.props.services, clinicid: this.props.clinicid})}>
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
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
export default ScanPay;
