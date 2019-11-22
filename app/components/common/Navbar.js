import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import ResponsiveImage from 'react-native-responsive-image';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import RF from "react-native-responsive-fontsize";
import * as Core from '../../core';
import * as Config from '../../config';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Empat Kali',
      loading: false,
      right: false,
      left: false,
      currency_symbol: this.props.currency_symbol,
    };
    console.log(this.props);
    console.log(this.state);
  }

  toggleCurrency() {
    this.setState({
      currency_symbol: this.state.currency_symbol == 'SGD' ? 'MYR' : 'SGD',
    });
    this.props.updateCurrency();
  }


  componentWillMount() {
    if (this.props.leftNav) {
      this.setState({ left: true });
    }

    if (this.props.rightNav) {
      this.setState({ right: true });
    }
  }

  renderLeft() {
    if (this.props.type == 'reset') {
      return <View />;
    } else if (this.props.leftNav == 'back') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'history-back') {
      return (
        <View
          style={{
            width: 60,
            height: 50,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 11,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'history-back-after-upload') {
      return (
        <View
          style={{
            width: 60,
            height: 50,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Actions.HistoryTransaction()
            }
            style={{
              paddingStart: 11,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'to-home') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home({ type: 'reset' })}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: RF(1.8),
                fontFamily: Config.FONT_FAMILY_THIN,
                fontWeight: 'bold'
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'backtoProfile') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.ManageProfile()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'backtoFav') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Favourites()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'backProfile') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Profile()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else if (this.props.leftNav == 'back-eclaim') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: Config.FONT_FAMILY_ROMAN, }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'homeback') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home({
              services: this.props.Services,
              clinicid: this.props.clinic_Id,
              member: this.props.member,
              nric: this.props.nric,
              checkId: this.props.check_Id,
              checkTime: this.props.checkTime,
              capCurrency: this.props.capCurrency,
              capAmount: this.props.capAmount,
              clinic_image: this.props.clinic_image,
              clinic_name: this.props.clinic_name,
              consultation_fee_symbol: this.props.consultation_fee_symbol,
              consultation_status: this.props.consultation_status,
              consultation_fees: this.props.consultation_fees
            })}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: Config.FONT_FAMILY_ROMAN, }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'back_history') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.HistoryTransaction()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: Config.FONT_FAMILY_ROMAN, }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'back-home') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home({
              services: this.props.Services,
              clinicid: this.props.clinic_Id,
              member: this.props.member,
              nric: this.props.nric,
              checkId: this.props.check_Id,
              checkTime: this.props.checkTime,
              capCurrency: this.props.capCurrency,
              capAmount: this.props.capAmount,
              clinic_image: this.props.clinic_image,
              clinic_name: this.props.clinic_name,
              consultation_fee_symbol: this.props.consultation_fee_symbol,
              consultation_status: this.props.consultation_status,
              consultation_fees: this.props.consultation_fees
            })}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: '#fff', fontSize: 32, paddingStart: 2, paddingEnd: 2 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: RF(1.7),
                fontFamily: Config.FONT_FAMILY_THIN,
                fontWeight: 'bold',
                width: 40
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'back-fav') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop({
              services: this.props.Services,
              clinicid: this.props.clinic_Id,
              member: this.props.member,
              nric: this.props.nric,
              checkId: this.props.check_Id,
              checkTime: this.props.checkTime,
              capCurrency: this.props.capCurrency,
              capAmount: this.props.capAmount,
              clinic_image: this.props.clinic_image,
              clinic_name: this.props.clinic_name,
              consultation_fee_symbol: this.props.consultation_fee_symbol,
              consultation_status: this.props.consultation_status,
              consultation_fees: this.props.consultation_fees
            })}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: '#fff', fontSize: 32, paddingStart: 2, paddingEnd: 2 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: RF(1.7),
                fontFamily: Config.FONT_FAMILY_THIN,
                fontWeight: 'bold',
                width: 40
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'cancel') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: RF(1.8),
                fontFamily: Config.FONT_FAMILY_THIN,
                fontWeight: 'bold',
                width: 50,
                paddingStart: 2,
                paddingEnd: 2
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'cancel-credits') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Roman',
                width: 50,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'cancel-cash') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Roman',
                width: 50,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'null') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        />
      );
    } else if (this.props.leftNav == 'close') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 15,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'HelveticaNeue-Roman',
                width: 55,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'previous') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Roman',
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'wallet') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Wallet()}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ paddingTop: 3, color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Wallet
          </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            style={{ paddingLeft: '20%' }}
            onPress={() => this.props.drawerAction(true)}
          >
            <Icons name="bars" style={{ color: '#fff', fontSize: 32 }} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderMiddle() {
    if (this.props.title && this.props.subtitle) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: (this.props.fontColor) ? this.props.fontColor : '#fff',
              fontSize: 18,
            }}
          >
            {this.props.title}
          </Text>
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Roman',
              color: (this.props.fontColor) ? this.props.fontColor : '#fff',
              fontSize: 14,
            }}
          >
            {this.props.subtitle}
          </Text>
        </View>
      );
    } else if (this.props.title2 && this.props.subtitle2) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: responsiveHeight(2.2)
          }}
        >
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: (this.props.fontColor) ? this.props.fontColor : '#fff',
              fontSize: 16,
            }}
          >
            {this.props.title2}
          </Text>
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: (this.props.fontColor) ? this.props.fontColor : '#fff',
              fontSize: 16,
            }}
          >
            {this.props.subtitle2}
          </Text>
        </View>
      );
    } else if (this.props.title) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: (this.props.fontColor) ? this.props.fontColor : '#fff',
              fontSize: 18,
            }}
          >
            {this.props.title}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/LogoMednefits.png')}
            style={{ height: 135, resizeMode: 'contain', width: 135, marginTop: -8 }}
          />
        </View>
      );
    }
  }

  renderRight() {
    if (this.props.rightNav == true) {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ paddingEnd: '15%' }}
            onPress={() => Actions.SwitchUser()}
          >
            <ResponsiveImage
              source={require('../../../assets/apps/switch.png')}
              style={{ resizeMode: 'contain', }}
              initWidth="78" initHeight="40"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'done') {
      return (
        <View
          style={{
            width: 70,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.Home()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
                width: 70
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'search') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: '2.5%',
            marginTop: '0.5%',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Actions.HomeSearch()
            }
          >
            <ResponsiveImage
              source={require('../../../assets/apps/search.png')}
              style={{ flex: 1, height: 20, width: 20, marginRight: 10 }}
              resizeMode="contain"
              initWidth="20" initHeight="20"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'next') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => this.props.rightNavCallback(true)}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'update-profile') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.updateProfile(true)}
          >
            {(!this.props.onLoaderProcess) ? (
              <Text
                style={{
                  fontFamily: 'HelveticaNeue-Roman',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginRight: '2%',
                  width: 65,
                }}
              >
                UPDATE
              </Text>
            ) : (
                <View style={{ marginRight: '5%' }}>
                  <ActivityIndicator size="small" color="white" style={{ fontSize: 14 }} />
                </View>
              )
            }
          </TouchableOpacity>
        </View>
      );
    }
    else if (this.props.rightNav == 'update-password') {
      return (
        <View
          style={{
            width: 70,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.updatePassword(true)}
          >
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: '2%',
                width: 70,
              }}
            >
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'add-MedHistory') {
      return (
        <View
          style={{
            width: 70,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.addMedicalHistory(true)}
          >
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: '2%',
                width: 70,
              }}
            >
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'add-MedAllergies') {
      return (
        <View
          style={{
            width: 70,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.AddAllergies(true)}
          >
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: '2%',
                width: 70,
              }}
            >
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'add-MedCondition') {
      return (
        <View
          style={{
            width: 70,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.AddMedCondition(true)}
          >
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: '2%',
                width: 70,
              }}
            >
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'add-Medication') {
      return (
        <View
          style={{
            width: 70,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.AddMedication(true)}
          >
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: '2%',
                width: 70,
              }}
            >
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'Adding-MedAllergies') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.MedicalAllergiesAdd()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'ClosetoHome') {
      return (
        <View
          style={{
            width: responsiveWidth(12),
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: responsiveWidth(6.5),
            // marginTop: responsiveHeight(0.8)
          }}
        >
          <TouchableOpacity
            // style={{ paddingStart: '23%' }}
            onPress={() => Actions.Home({
              services: this.props.Services,
              clinicid: this.props.clinic_Id,
              member: this.props.member,
              nric: this.props.nric,
              checkId: this.props.check_Id,
              checkTime: this.props.checkTime,
              capCurrency: this.props.capCurrency,
              capAmount: this.props.capAmount,
              clinic_image: this.props.clinic_image,
              clinic_name: this.props.clinic_name,
              consultation_fee_symbol: this.props.consultation_fee_symbol,
              consultation_status: this.props.consultation_status,
              consultation_fees: this.props.consultation_fees
            })}
          >
            <ResponsiveImage
              source={require('../../../assets/apps/Close.png')}
              style={{ resizeMode: "center", }}
              initWidth="20" initHeight="20"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'Close') {
      return (
        <View
          style={{
            width: responsiveWidth(12),
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: responsiveWidth(6.5),
            // marginTop: responsiveHeight(0.8)
          }}
        >
          <TouchableOpacity
            // style={{ paddingStart: '23%' }}
            onPress={() => Actions.ECardUser()}
          >
            <ResponsiveImage
              source={require('../../../assets/apps/Close.png')}
              style={{ resizeMode: "center", }}
              initWidth="20" initHeight="20"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'Adding-Medications') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.MedicalMedicationsAdd()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'Adding-MedCondition') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.MedicalConditionAdd()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'Adding-MedHistory') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.MedicalHistoryAdd()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'currency-toggle' && this.props.convert_option == true) {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            paddingRight: 5,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ paddingEnd: '15%' }}
            onPress={() => this.toggleCurrency()}
          >
            {
              this.state.currency_symbol == 'SGD' ?
                <ResponsiveImage
                  source={require('../../../assets/toggle-currency-myr.jpg')}
                  style={{ resizeMode: 'contain', marginTop: 10 }}
                  initWidth="100" initHeight="30"
                />
              :
              <ResponsiveImage
                source={require('../../../assets/toggle-currency-sgd.jpg')}
                style={{ resizeMode: 'contain', marginTop: 10 }}
                initWidth="100" initHeight="30"
              />
            }
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Button transparent style={{ paddingLeft: 15 }} />
        </View>
      );
    }
  }

  render() {
    // console.warn(this.props.rightNav);
    return (
      <SafeAreaView style={{ backgroundColor: '#0392cf' }}>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={[
              styles.container,
              {
                justifyContent:
                  !this.props.leftNav && !this.props.rightNav
                    ? 'center'
                    : 'space-between',
                backgroundColor: (this.props.backgroundColor) ? this.props.backgroundColor : '#0392cf',
              },
            ]}
          >
            <StatusBar backgroundColor="#0392cf" barStyle="dark-content" />
            {this.renderLeft()}
            {this.renderMiddle()}
            {this.renderRight()}
          </View>
          <Core.Network />
        </View>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 2,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0
  },
  navBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 24,
    fontFamily: 'MyriadPro',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  },
});
