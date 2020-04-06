import React, { Component } from 'react';
import { StatusBar, View, Image, TextInput, Easing } from 'react-native';
import { GiftedForm } from 'react-native-gifted-form';
import { Container, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ZoomImage from 'react-native-zoom-image';
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
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imageSource: source });
      }
    });
  }

  UNSAFE_componentWillMount() {
    Core.GetSpesificEclaim(this.props.transaction_id, result => {
      // console.log(result);
      data = typeof result == 'string' ? JSON.parse(result.data) : result.data;
      console.log( data );
      if (data.files) {
        this.setState({
          data: data,
          filesData: data.files
        });
      } else {
        this.setState({
          data: data
        });
      }
      // console.warn(this.state.filesData);
    });

    // Core.UserDetail((err, result) => {
    //   this.setState({
    //     user: result.data.profile.full_name,
    //   });
    // });
  }

  _renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.5,
          marginTop: '-2%',
          marginBottom: '1%',
        }}
      />
    );
  }

  _renderDivider2() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.5,
          marginTop: '-2%',
          marginBottom: '1%',
          marginLeft: '38%'
        }}
      />
    );
  }

  _renderReceipt() {
    return this.state.filesData.map(Data => (

      <ZoomImage
        imgStyle={{
          width: 70,
          height: 80,
          margin: 2
        }}
        enableScaling={true}
        easingFunc={Easing.ease}
        duration={200}
        source={{
          uri: !Data.file
            ? '../../assets/photo.png'
            : Data.file,
        }}
      />
    ));
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryClaim
          Status={this.state.data.status_text}
          status_number={this.state.data.status}
          Date={this.state.data.date}
          Amount={this.state.data.claim_amount}
          Currency={this.state.data.currency_symbol}
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
              marginVertical: 20,
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
              Receipt Amount
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '8.5%',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                { this.state.data.currency_symbol } {this.state.data.amount ? this.state.data.amount : 'N/A'}
              </Text>
            </View>
            {/* <TextInput
              placeholder="Spending Account"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '7.5%', fontSize: 13 }}
              value={this.state.data.spending_type ? this.state.data.spending_type : 'N/A'}
            /> */}
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,
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
            <View
              style={{
                padding: 5,
                marginLeft: '5%',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                {this.state.data.spending_type ? this.state.data.spending_type : 'N/A'}
              </Text>
            </View>
            {/* <TextInput
              placeholder="Spending Account"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '7.5%', fontSize: 13 }}
              value={this.state.data.spending_type ? this.state.data.spending_type : 'N/A'}
            /> */}
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,

            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13 }}>
              Claim Type
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '18.5%',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                {this.state.data.service ? this.state.data.service : 'N/A'}
              </Text>
            </View>
            {/* <TextInput
              editable={false} selectTextOnFocus={false}
              placeholder="Claim Type"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '20%', fontSize: 13 }}
              value={this.state.data.service}
            /> */}
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13 }}>
              Provider
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '23%',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                {this.state.data.merchant ? this.state.data.merchant : 'N/A'}
              </Text>
            </View>
            {/* <TextInput
              editable={false} selectTextOnFocus={false}
              placeholder="Provider"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '24%', fontSize: 13 }}
              value={this.state.data.merchant}
            /> */}
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13 }}>
              Claim #
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '24.5%',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                {this.state.data.transaction_id ? this.state.data.transaction_id : 'N/A'}
              </Text>
            </View>
            {/* <TextInput
              editable={false} selectTextOnFocus={false}
              placeholder="Claim ID"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '25.4%', fontSize: 13 }}
              value={this.state.data.transaction_id}
            /> */}
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13, marginRight: '3%' }}
            >
              Date & Time
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '13.5%',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                {this.state.data.date ? this.state.data.visit_date : 'N/A'}
              </Text>
            </View>
            {/* <TextInput
              editable={false} selectTextOnFocus={false}
              placeholder="Date & Time"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '15.5%', fontSize: 13 }}
              value={this.state.data.date}
            /> */}
          </View>
          {this._renderDivider2()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: '2%', fontSize: 13, marginRight: '6%' }}
            >
              Claim Date
            </Text>
            <TextInput
              editable={false} selectTextOnFocus={false}
              placeholder="Claim Date"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '14.5%', fontSize: 13 }}
              value={this.state.data.claim_date}
            />
          </View>
          {this._renderDivider2()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 20,
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
              editable={false} selectTextOnFocus={false}
              placeholder="Member"
              underlineColorAndroid="transparent"
              color="#000"
              style={{ marginLeft: '8%', fontSize: 13 }}
              value={this.state.data.member ? this.state.data.member : 'N/A'}
            />
          </View>

          {(this.state.data.rejected_status == true) ?
            <View>
              {this._renderDivider2()}

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  marginVertical: 20,
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
                  Reason
                </Text>
                <Text
                  style={{
                    marginTop: '-3%',
                    marginLeft: '9%',
                    fontSize: 13,
                    color: '#000',
                    width: '55%',
                    marginTop: '0.5%'
                  }}
                  numberOfLines={8}
                >
                  {this.state.data.rejected_message ? this.state.data.rejected_message : 'N/A'}
                </Text>

              </View>
            </View> : <View />
          }


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
                  marginVertical: 20,
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
