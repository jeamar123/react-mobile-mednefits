import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import RF from "react-native-responsive-fontsize";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import ResponsiveImage from 'react-native-responsive-image';
import * as Core from '../../core';
import * as Config from '../../config';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Mednefits',
      loading: false,
      right: false,
      left: false,
    };
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
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#000', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#000', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'back-eclaim') {
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
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
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
              style={{ color: '#000', fontSize: 32, paddingStart: 2, paddingEnd: 2 }}
            />
            <Text
              style={{
                color: '#000',
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
                color: '#000',
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
    } else {
      return (
        // <View
        //   style={{
        //     width: 50,
        //     height: 50,
        //     justifyContent: 'center',
        //     alignItems: 'flex-start',
        //   }}
        // >
        //   <TouchableOpacity
        //     style={{ paddingLeft: 15 }}
        //     onPress={() => this.props.drawerAction(true)}
        //   >
        //     <Icons name="bars" style={{ color: '#fff', fontSize: 32 }} />
        //   </TouchableOpacity>
        // </View>

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
    } else if (this.props.title) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: responsiveHeight(5)
          }}
        >
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: (this.props.fontColor) ? this.props.fontColor : '#fff',
              fontSize: 18,
              lineHeight: 18,
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
            style={{ height: 135, resizeMode: 'contain', width: 135 }}
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
            style={{ paddingEnd: '3%' }}
            onPress={() => Actions.SwitchUser()}
          >
            <Image
              source={require('../../../assets/apps/switch.png')}
              style={{ height: 55, resizeMode: 'center', width: 75 }}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'done') {
      return (
        <View
          style={{
            width: responsiveWidth(15.5),
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: responsiveWidth(2),
            marginTop: responsiveHeight(5.3)
          }}
        >
          <TouchableOpacity onPress={() => Actions.Home({ type: 'reset' })}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: 10,
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
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Actions.Search()
            }
          >
            <Image
              source={require('../../../assets/apps/search.png')}
              style={{ height: 55, resizeMode: 'center', width: 75 }}
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
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'update-password') {
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
            onPress={() => this.props.updatePassword(true)}
          >
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: '2%',
                width: 65,
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
            width: 50,
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
                width: 65,
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
            width: 50,
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
                width: 65,
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
            width: 50,
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
                width: 65,
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
            width: 50,
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
                width: 65,
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
    } else if (this.props.rightNav == 'Close') {
      return (
        <View
          style={{
            width: responsiveWidth(13),
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: '5%',
            marginTop: responsiveHeight(5.1)
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
              source={require('../../../assets/apps/downclose.png')}
              style={{ resizeMode: 'contain', }}
              initWidth="24" initHeight="12"
            />
            {/* <Image
              source={require('../../../assets/apps/Close.png')}
              style={{ height: 85, resizeMode: 'center', width: 55 }}
            /> */}
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
      <View style={{ flexDirection: 'column' }}>
        <View
          style={[
            styles.container,
            {
              justifyContent:
                !this.props.leftNav && !this.props.rightNav
                  ? 'center'
                  : 'space-between',
              backgroundColor: (this.props.backgroundColor) ? this.props.backgroundColor : '#3F9D59',
            },
          ]}
        >
          <StatusBar backgroundColor="#3F9D59" barStyle="dark-content" />
          {this.renderLeft()}
          {this.renderMiddle()}
          {this.renderRight()}
        </View>
        <Core.Network />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 2,
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
