import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Image, ActivityIndicator } from 'react-native';
import { Container, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { HistoryUser } from '../components/HistoryUser';
import * as Core from '../core';
import * as Config from '../config';
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
      data: false
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
    Core.GetUserNetwork(this.props.transaction_id, (result) => {
      data = (typeof result == "string") ? JSON.parse(result.data) : result.data
      console.warn(data)
      this.setState({
        data: data
      })
    })
  }

  renderContainerHistory() {
    if (!this.state.data) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
        </View>
      )
    } else {
      return (
        <GiftedForm
          style={{ backgroundColor: 'white' }}
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
              alignItems: 'center',
              marginVertical: 13,
              borderBottomWidth: 1,
              borderColor: '#efeff1'
            }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                marginTop: '3%',
                marginLeft: '17.5%',
              }}
              source={{ uri: this.state.data.clinic_type_image }}
            />
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
                {(this.state.data.clinic_type) ? this.state.data.clinic_type : "N/A"}
              </Text>
            </View>
            {/* <Text
              style={{
                paddingHorizontal: 10,
                marginLeft: '-3.3%',
                paddingVertical: 10,
                fontSize: 13,
                fontWeight: 'bold',
              }}
            >
            </Text> */}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
              borderBottomWidth: 1,
              borderColor: '#efeff1'
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginTop: '3%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 13,
                marginLeft: '7%',
              }}
            >
              Transaction #
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
                {this.props.transaction_id}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginTop: '3%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 13,
                marginLeft: '7%',
              }}
            >
              Services/s
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '18%',
                borderBottomWidth: 1,
                borderColor: '#efeff1',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  borderColor: '#efeff1',
                  fontSize: 13
                }}>
                {this.state.data.services}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginTop: '3%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 13,
                marginLeft: '7%',
              }}
            >
              Date & Time
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '15.3%',
                borderBottomWidth: 1,
                borderColor: '#efeff1',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  borderColor: '#efeff1',
                  fontSize: 13
                }}>
                {this.state.data.date_of_transaction}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginTop: '3%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 13,
                marginLeft: '7%',
              }}
            >
              Member
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '21.4%',
                borderBottomWidth: 1,
                borderColor: '#efeff1',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  borderColor: '#efeff1',
                  fontSize: 13
                }}>
                {(this.state.data.customer) ? this.state.data.customer : "N/A"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginTop: '3%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontSize: 13,
                marginLeft: '7%',
              }}
            >
              Payment Type
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '12.5%',
                borderBottomWidth: 1,
                borderColor: '#efeff1',
                width: '100%',
                fontSize: 13
              }}>
              <Text
                style={{
                  borderColor: '#efeff1',
                  fontSize: 13
                }}>
                {(this.state.data.payment_type) ? this.state.data.payment_type : "N/A"}
              </Text>
            </View>
          </View>

          {(this.state.data.lite_plan == false) ?
            this.state.data.lite_plan : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Total Amount
                  </Text>
              <Text style={{ marginLeft: responsiveWidth(9.3), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '100%', fontSize: 13 }}>
                {(this.state.data.amount) ? this.state.data.amount : "0.00"}
              </Text>
            </View>
          }

          {(this.state.data.lite_plan == false) ?
            this.state.data.lite_plan : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13, width: '30%' }}
              >
                Medicine & Treatment
                  </Text>
              <Text style={{ marginLeft: responsiveWidth(-0.7), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '48%', fontSize: 13 }}>
                {(this.state.data.procedure_cost) ? this.state.data.procedure_cost : "0.00"}
              </Text>
              {(this.state.data.service_credits == false) ? this.state.data.service_credits : <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#0392cf',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '65%',
                  marginLeft: responsiveWidth(-11)
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Credits
                    </Text>
              </View>}
            </View>
          }

          {(this.state.data.lite_plan == false) ?
            this.state.data.lite_plan : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 13,
              }}
            >
              <Text
                style={{ color: '#c4c4c4', marginLeft: 20, marginRight: '3%', padding: 5, fontSize: 13 }}
              >
                Consultation
                  </Text>
              <Text style={{ marginLeft: responsiveWidth(10), padding: 5, borderBottomWidth: 1, borderColor: '#efeff1', width: '43%', fontSize: 13 }}>
                {(this.state.data.consultation) ? this.state.data.consultation : "0.00"}
              </Text>
              {(this.state.data.consultation_credits == false) ? this.state.data.consultation_credits : <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#0392cf',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '100%',
                  marginLeft: responsiveWidth(-6.5)
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Credits
                    </Text>
              </View>}
            </View>
          }

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
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
      )
    }
  }

  render() {
    console.warn("datanya " + (this.state.data.clinic_name) ? this.state.data.clinic_name : "");
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryUser
          Amount={this.state.data.amount}
          clinicname={this.state.data.clinic_name}
          clinicimage={this.state.data.clinic_image}
        />

        {this.renderContainerHistory()}

      </Container>
    );
  }
}

export default History;
