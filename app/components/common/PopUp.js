import React, { Component } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Linking
} from 'react-native';
import Modal from 'react-native-modal';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Config from '../../config';
import * as Core from '../../core';
import * as Common from '../common';
import VersionCheck from 'react-native-version-check';
export default class Popup extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      isVisible: this.props.isVisible,
    };
  }

  // componentDidMount() {
  //   console.log(this.props);
  //   this.setState({ isVisible: this.props.isVisible })
  // }

  // componentWillMount() {
  //   this.setState({ isVisible: this.props.isVisible });
  //   console.log(this.state.isVisible);
  // }

  renderBody() {
    if (this.props.kind == 'loginFailed') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(30), }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}
          <View style={{ marginTop: 5, marginBottom: 20, marginRight: 25, marginLeft: 25, paddingTop: 20 }}>
            <View>
              <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={15} marginBottom={20} style={{ color: '#38424B', height: 55, width: '70%', textAlign: 'center', alignSelf: 'center' }} >
                Your User ID or Password is Incorrect.
              </Common.Texti>
              <View style={{ flex: 1, flexDirection: 'row', height: 35, width: '90%', textAlign: 'left', alignSelf: 'center' }}>
                <View style={{ width: 13 }} >
                  <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={14} style={{ color: '#38424B', }}>1. </Common.Texti>
                </View>
                <View style={{ flex: 1 }} >
                  <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={14} style={{ color: '#38424B', }}>Make sure you have updated your User ID to your Mobile Number.</Common.Texti>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', height: 35, width: '90%', textAlign: 'left', alignSelf: 'center' }}>
                <View style={{ width: 13 }} >
                  <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={14} style={{ color: '#38424B', }}>2. </Common.Texti>
                </View>
                <View style={{ flex: 1 }} >
                  <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={14} style={{ color: '#38424B', }}>If you still can't login, reset your password.</Common.Texti>
                </View>
              </View>
            </View>


            {/* 
            // { this.props.url != null && this.props.url != undefined ?
            //   <View>
            //     <Common.Texti
            //       fontFamily={Config.FONT_FAMILY_ROMAN}
            //       fontSize={15}
            //       marginBottom={22}
            //       style={{
            //         color: '#38424B',
            //         textAlign: 'center'
            //       }}
            //     >
            //       {this.props.title}
            //     </Common.Texti>
            //     <Common.Texti
            //       fontSize={12}
            //       marginBottom={10}
            //     >
            //       Please click <Common.Texti fontColor={'#338BC2'} style={{ color: '#338BC2', textDecorationLine: 'underline' }} onPress={() => this.goToUrl()}>here</Common.Texti> to change your user ID to your mobile number.
            //     </Common.Texti>
            //   </View>
            //   :
            //   <View>
            //     <Common.Texti fontFamily={Config.FONT_FAMILY_MEDIUM} fontSize={15} marginBottom={20} style={{ color: '#38424B', marginBottom: 20, height: 30 }} >
            //       Your User ID or Password is incorrect.
            //     </Common.Texti>
            //     <View style={{ flex: 1, flexDirection: 'row', }}>
            //       <View style={{ width: 20 }} >
            //         <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={12} style={{ color: '#38424B', }}>1. </Common.Texti>
            //       </View>
            //       <View style={{ flex: 1 }} >
            //         <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={12} style={{ color: '#38424B', }}>Make sure you have updated your User ID to your Mobile Number.</Common.Texti>
            //       </View>
            //     </View>
            //     <View style={{ flex: 1, flexDirection: 'row', }}>
            //       <View style={{ width: 20 }} >
            //         <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={12} style={{ color: '#38424B', }}>2. </Common.Texti>
            //       </View>
            //       <View style={{ flex: 1 }} >
            //         <Common.Texti fontFamily={Config.FONT_FAMILY_ROMAN} fontSize={12} style={{ color: '#38424B', }}>If you still can't login, reset your password.</Common.Texti>
            //       </View>
            //     </View>
            //   </View>
            // }
            */}
          </View>

        </View>
      );
    } else if (this.props.kind == 'insufficientCredit') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}

          <View style={{ margin: 10 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={20}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>
          </View>

        </View>
      );
    } else if (this.props.kind == 'eClaimError') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}

          <View style={{ margin: 10 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={20}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>
          </View>

        </View>
      );
    } else if (this.props.kind == 'update-application') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}

          <View style={{ margin: 10 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={20}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>
            <Common.ButtonUpdate
              style={{
                padding: 7
              }}
              onPress={() => Linking.openURL('https://apps.apple.com/sg/app/mednefits/id972694931')}>
              Update Now
            </Common.ButtonUpdate>
          </View>
        </View>
      );
    } else if (this.props.kind == 'CobaPopUp') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(25) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}
          <Image
            style={{ width: 150, height: 100 }}
            source={require('../../../assets/bell.png')}
            resizeMode="contain" />
          <View style={{ margin: 5, textAlign: 'center', alignSelf: 'center' }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>

          </View>
        </View>


      );
    }
  }

  async CheckVersion() {
    try {
      version = await Core.CheckVersion()

      Linking.openURL(version);

    } catch (e) {
      console.warn(e + "sa");
      // Common.getNotify("","Failed to request url")
    }
  }

  goToUrl() {
    console.log(this.props.url);
    Linking.openURL(this.props.url);
  }

  _closeSection() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../../assets/close.png')}
      />
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: '#000' }}>
        <Modal isVisible={this.props.isVisible}>
          {(!this.props.closeSection) ? (<View />) : (
            <TouchableOpacity
              onPress={() => this.props.closeSectionUpdate(true)}
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginBottom: -50,
                zIndex: 99,
              }}
            >
              {this._closeSection()}
            </TouchableOpacity>
          )}

          <View
            style={{ backgroundColor: '#fff', borderRadius: 10, margin: 20 }}
          >
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 15,
              }}
            >
              {this.renderBody()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
