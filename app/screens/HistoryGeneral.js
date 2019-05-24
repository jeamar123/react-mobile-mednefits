import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  Easing,
  ScrollView,
  RefreshControl,
  TouchableOpacity
}
  from 'react-native';
import { Container, Text } from 'native-base';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ZoomImage from 'react-native-zoom-image';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { Buttons } from '../components/common';
import { HistoryUser } from '../components/HistoryUser';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';

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
      data: false,
      isLoading: false,
      refreshing: false,
    };
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    Core.GetUserNetwork(this.props.transaction_id, (result) => {
      data = (typeof result == "string") ? JSON.parse(result.data) : result.data
      console.warn(data)
      this.setState({
        data: data, refreshing: false
      })
    })
  }


  selectPhoto() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.warn('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({ imageSource: source, photo_url: response.uri, isLoading: true });

        const file = {
          uri: response.uri,
          name: 'receipt',
          type: 'image/jpeg',
        };

        Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
          let myHeaders = new Headers();
          let formdata = new FormData();

          myHeaders.append('Authorization', result);
          myHeaders.append('Content-Type', 'multipart/form-data');
          formdata.append("file", file)
          formdata.append("transaction_id", this.props.transaction_id)

          params = {
            url: Config.USER_UPLOAD_IN_NETWORK_RECEIPT,
            method: 'POST',
            header: myHeaders,
            body: formdata,
          };

          fetch(Config.USER_UPLOAD_IN_NETWORK_RECEIPT, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
          })
            .then(response => response.json())
            .then(response => {
              console.warn(JSON.stringify(response, null, 4))
              Core.getNotify('', response.message);
              Actions.HistoryGeneral(this.props.transaction_id)
              this.setState({ isLoading: false, refreshing: true });
              Core.GetUserNetwork(this.props.transaction_id, (result) => {
                data = (typeof result == "string") ? JSON.parse(result.data) : result.data
                console.warn(data)
                this.setState({
                  data: data, refreshing: false
                })
              })
            })
            .catch(error => {
              console.warn('error fetching', error.message);
            });
        });
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

  customLoader() {
    return (
      <View>
        <Modal
          isVisible={this.state.isLoading}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          onModalHide={this.statusModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
          <Texti
            fontColor="#FFFFFF"
          >Uploading</Texti>
        </Modal>
      </View>
    );
  }

  renderReceiptUpload() {
    if (this.state.data.files.length > 0) {
      return this.state.data.files.map((Data, index) => (
        <ZoomImage
          imgStyle={{
            width: 80,
            height: 100,
            marginLeft: '18.5%',
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#c4c4c4',
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

    } else if (this.state.data.files) {
      return (
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginLeft: '15.3%'
          }}>
          <View style={{
            marginLeft: '61.5%',
            marginBottom: '-7.5%',
            width: 15,
            height: 15,
            borderRadius: 15 / 2,
            backgroundColor: '#f44336',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }} />
          <View style={{ flex: 1, width: '50%', }}>
            <TouchableOpacity
              onPress={() => this.selectPhoto()}
              style={{
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: '#0392cf',
                borderRadius: 5,
                margin: 15,
                width: '120%',
                height: '50%'
              }}>
              <View style={{
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'center'
              }} >
                <Icon name="camera" style={{ color: '#fff', fontSize: 20, marginLeft: 5 }} />
                <Text style={{ color: '#fff', fontSize: 15, margin: 5 }}> Upload Receipt</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
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
                marginLeft: '14.5%',
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

          <View
            style={{
              borderBottomColor: '#efeff1',
              borderBottomWidth: 0.8,
            }}
          />

          {(this.state.data.cap_transaction == false) ?
            this.state.data.cap_transaction : <View
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
                Cap  per visit
              </Text>
              <View
                style={{
                  padding: 5,
                  marginLeft: '13.9%',
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
                  {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.cap_per_visit) ? this.state.data.cap_per_visit : "N/A"}
                </Text>
              </View>
            </View>
          }

          {(this.state.data.cap_transaction == false) ?
            this.state.data.cap_transaction : <View
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
                Paid by Credits
              </Text>
              <View
                style={{
                  padding: 5,
                  marginLeft: '10.8%',
                  borderBottomWidth: 1,
                  borderColor: '#efeff1',
                  width: '56%',
                  fontSize: 13
                }}>
                <Text
                  style={{
                    borderColor: '#efeff1',
                    fontSize: 13
                  }}>
                  {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.paid_by_credits) ? this.state.data.paid_by_credits : "N/A"}
                </Text>
              </View>

              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#0392cf',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '100%',
                  marginLeft: '-20%'
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
              </View>
            </View>
          }

          {(this.state.data.cap_transaction == false) ?
            this.state.data.cap_transaction : <View
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
                Paid by Cash
              </Text>
              <View
                style={{
                  padding: 5,
                  marginLeft: '13.7%',
                  borderBottomWidth: 1,
                  borderColor: '#efeff1',
                  width: '52%',
                  fontSize: 13
                }}>
                <Text
                  style={{
                    borderColor: '#efeff1',
                    fontSize: 13
                  }}>
                  {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.paid_by_cash) ? this.state.data.paid_by_cash : "N/A"}
                </Text>
              </View>

              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '20%',
                  backgroundColor: '#3F9D59',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  height: '100%',
                  marginLeft: -60
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Cash
                </Text>
              </View>
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
                style={{
                  color: '#c4c4c4',
                  marginTop: '3%',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 13,
                  marginLeft: '7%',
                }}
              >
                Total Amount
              </Text>
              <View
                style={{
                  padding: 5,
                  marginLeft: '14%',
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
                  {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.converted_amount) ? this.state.data.converted_amount : "0.00"}
                </Text>
              </View>
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
                style={{
                  color: '#c4c4c4',
                  marginTop: '3%',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 13,
                  marginLeft: '7%',
                  width: '20%'
                }}
              >
                Medicine & Treatment
              </Text>
              <View
                style={{
                  padding: 5,
                  marginLeft: '9%',
                  borderBottomWidth: 1,
                  borderColor: '#efeff1',
                  width: '100%',
                  marginTop: '3%',
                  fontSize: 13
                }}>
                <Text
                  style={{
                    borderColor: '#efeff1',
                    fontSize: 13
                  }}>
                  {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.converted_procedure_cost) ? this.state.data.converted_procedure_cost : "0.00"}
                </Text>
              </View>
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
                style={{
                  color: '#c4c4c4',
                  marginTop: '3%',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 13,
                  marginLeft: '7.5%',
                }}
              >
                Consultation
              </Text>
              <View
                style={{
                  padding: 5,
                  marginLeft: '14%',
                  borderBottomWidth: 1,
                  borderColor: '#efeff1',
                  width: '42%',
                  fontSize: 13
                }}>
                <Text
                  style={{
                    borderColor: '#efeff1',
                    fontSize: 13
                  }}>
                  {(this.state.data.currency_symbol) ? this.state.data.currency_symbol : "N/A"} {(this.state.data.converted_consultation) ? this.state.data.converted_consultation : "0.00"}
                </Text>
              </View>
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

          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
            }}
          >
            <Text style={{ width: '38%' }} >
              Receipt
            </Text>
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
          </View> */}

          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 13,
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
              Receipt
            </Text>
            <View
              style={{
                padding: 5,
                marginLeft: '13.5%',
                width: '100%',
                fontSize: 13
              }}>
              {this.renderReceiptUpload()}
            </View>
          </View> */}

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
                    marginTop: '3%',
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                    fontSize: 13,
                    marginLeft: '7%',
                  }}
                >
                  Receipt
                </Text>
                <View style={{
                  padding: 5,
                  marginLeft: '3%',
                  width: '100%',
                  fontSize: 13
                }}>
                  {this.renderReceiptUpload()}
                </View>
              </View>
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
        {this.customLoader()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryUser
          Amount={this.state.data.converted_amount}
          clinicname={this.state.data.clinic_name}
          clinicimage={this.state.data.clinic_image}
          Currency={this.state.data.currency_symbol}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.renderContainerHistory()}

        </ScrollView>
      </Container>
    );
  }
}

export default History;
