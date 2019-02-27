import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Image, TextInput } from 'react-native';
import { Container, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { HistoryClaim } from '../components/HistoryClaim';
import * as Core from '../core';
import Navbar from '../components/common/Navbar';
const options = {
  title: 'Upload Your Receipt',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};

class DetailEClaim_Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: {
        uri: '',
      },
      filesData: [],
      data: false,
      File: false
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

  componentWillMount() {
    Core.GetSpesificEclaim(this.props.transaction_id, result => {
      data = typeof result == 'string' ? JSON.parse(result.data) : result.data;

      this.setState({
        data: data,
        filesData: data.files
      });
      console.warn(this.state.filesData);
    });

    Core.UserDetail((err, result) => {
      this.setState({
        user: result.data.profile.full_name,
      });
    });
  }

  _renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.8,
          marginTop: '-2%',
          marginBottom: '1%',
        }}
      />
    );
  }

  _renderReceipt() {
    return this.state.filesData.map(Data => (

      <Image
        style={{
          width: 70,
          height: 80,
          margin: 2
        }}
        source={{
          uri: !Data.file
            ? '../../assets/photo.png'
            : Data.file,
        }}
      />
    ));
  }

  render() {
    // this.state.filesData.map(Data =>
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryClaim
          Status={this.state.data.status_text}
          Date={this.state.data.claim_date}
          Amount={this.state.data.amount}
        />
        <GiftedForm
          style={{ backgroundColor: '#fff' }}
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
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                marginRight: '2%',
                fontSize: 13
              }}
            >
              Spending Account
            </Text>
            <TextInput
              placeholder="Spending Account"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '6%', fontSize: 13 }}
              value={this.state.data.spending_type ? this.state.data.spending_type : 'N/A'}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,

            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13 }}>
              Claim Type
            </Text>
            <TextInput
              placeholder="Claim Type"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '19%', fontSize: 13 }}
              value={this.state.data.service}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13 }}>
              Provider
            </Text>
            <TextInput
              placeholder="Provider"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '23%', fontSize: 13 }}
              value={this.state.data.merchant}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13 }}>
              Claim #
            </Text>
            <TextInput
              placeholder="Claim ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '24%', fontSize: 13 }}
              value={this.state.data.transaction_id}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13, marginRight: '3%' }}
            >
              Date & Time
            </Text>
            <TextInput
              placeholder="Date & Time"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '14%', fontSize: 13 }}
              value={this.state.data.date}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13, marginRight: '6%' }}
            >
              Claim Date
            </Text>
            <TextInput
              placeholder="Claim Date"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '12%', fontSize: 13 }}
              value={this.state.data.claim_date}
            />
          </View>
          {this._renderDivider()}

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
                color: '#c4c4c4',
                marginLeft: '2%',
                marginRight: '16%',
                fontSize: 13
              }}
            >
              Member
            </Text>
            <TextInput
              placeholder="Member"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '6%', fontSize: 13 }}
              value={this.state.user ? this.state.user : 'N/A'}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: '#efeff4'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: '#c4c4c4',
                    marginLeft: '2%',
                    marginRight: '11%',
                    fontSize: 13
                  }}
                >
                  Receipt
                </Text>
                <View
                  style={{ marginLeft: 50 }}
                >
                  {this._renderReceipt()}
                </View>
              </View>
            </View>

          </View>

        </GiftedForm>
      </Container>
    );
  }
}

export default DetailEClaim_Transaction;
