import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
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
    this.selectPhoto = this.selectPhoto.bind(this);
    this.selectPhoto2 = this.selectPhoto2.bind(this);
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imageSource: source });
      }
    });
  }

  selectPhoto2() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imageSource2: source });
      }
    });
  }

  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';

    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Scan & Pay" />
        <Content padder>
          <TouchableOpacity onPress={() => this.selectPhoto()}>
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
          <TouchableOpacity onPress={() => this.selectPhoto2()}>
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
