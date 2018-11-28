import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Image } from 'react-native';
import { Container, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { HistoryUser } from '../components/HistoryUser';
import { Buttons } from '../components/common';
import Navbar from '../components/common/Navbar';
const options = {
  title: 'Upload Your Receipt',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: {
        uri: '',
      },
    };
    this.selectPhoto = this.selectPhoto.bind(this);
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

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryUser />
        <GiftedForm
          style={{ backgroundColor: '#fff', paddingLeft: 5, paddingRight: 15 }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Image
              style={{ marginHorizontal: 30, marginRight: 30, marginLeft: 50 }}
              source={require('../../assets/apps/tooth.png')}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                marginRight: 30,
                paddingVertical: 10,
              }}
            >
              Dental Care
            </Text>
          </View>
          <GiftedForm.TextInputWidget
            underlineColorAndroid="transparent"
            name="transaction"
            title="Transaction #"
            placeholder="IN44837820"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            underlineColorAndroid="transparent"
            name="service"
            title="Service/s"
            placeholder="Scaling & Polishing"
            clearButtonMode="while-editing"
          />

          <GiftedForm.TextInputWidget
            underlineColorAndroid="transparent"
            name="member"
            title="Member"
            placeholder="Jelind Teo"
            clearButtonMode="while-editing"
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                paddingHorizontal: 10,
                marginRight: 30,
                paddingVertical: 10,
              }}
            >
              Receipt
            </Text>
            <Buttons onPress={() => this.selectPhoto()}>
              <Icon
                name="camera"
                style={{ width: '40%', color: '#fff', fontSize: 24 }}
              />
            </Buttons>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ width: '38%' }} />
            <View
              style={{
                height: 180,
                width: '50%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="cover"
                style={{ width: '80%', height: 180 }}
                source={{
                  uri: !this.state.imageSource.uri
                    ? '../../assets/photo.png'
                    : this.state.imageSource.uri,
                }}
              />
            </View>
          </View>
        </GiftedForm>
      </Container>
    );
  }
}

export default History;
