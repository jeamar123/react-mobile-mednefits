import React, { Component } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Linking
} from 'react-native';
import {
  Content,
  ListItem,
  Text,
  Left,
  Body,
} from 'native-base';
import Modal from 'react-native-modal';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Config from '../../config';
import * as Core from '../../core';
import * as Common from '.';

export default class PopAds extends Component {
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
    if (this.props.kind == 'popAds') {
      return (
        <ImageBackground
          source={require('../../../assets/AdsMeds.jpg')}
          style={{
            backgroundColor: '#0392cf',
            width: '100%',
            height: responsiveHeight(50),
            borderRadius: 10
          }}
        />
      );
    } else if (this.props.kind == 'popAdsWithItem') {
      return (
        <ImageBackground
          source={require('../../../assets/andriod_splash.png')}
          style={{
            backgroundColor: '#0392cf',
            width: '100%',
            height: responsiveHeight(50),
          }}
        >
          <Content padder>
            <View style={{ marginTop: 50 }} />
            <Body>
              <Image
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                  width: 40,
                  height: 40,
                }}
                source={require('../../../assets/apps/LogoMednefits.png')}
              />
            </Body>
            {/* <View style={{ marginTop: 10 }} /> */}
            <ListItem icon style={{ marginTop: 10 }} >
              <Left>
                <TouchableOpacity>
                  <Image
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 25,
                      height: 25,
                    }}
                    source={require('../../../assets/apps/home.png')}
                  />
                </TouchableOpacity>
              </Left>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text>Home</Text>
              </Body>
            </ListItem>

            <ListItem icon style={{ marginTop: 10 }} >
              <Left>
                <TouchableOpacity

                >
                  <Image
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 25,
                      height: 25,
                    }}
                    source={require('../../../assets/apps/wallet.png')}
                  />
                </TouchableOpacity>
              </Left>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text>Wallet</Text>
              </Body>
            </ListItem>

            <ListItem icon style={{ marginTop: 10 }}>
              <Left>
                <TouchableOpacity>
                  <Image
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 25,
                      height: 25,
                    }}
                    source={require('../../../assets/apps/receipt.png')}
                  />
                </TouchableOpacity>
              </Left>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text>E-Claim</Text>
              </Body>
            </ListItem>
          </Content>
        </ImageBackground>
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
            style={{ borderRadius: 10, margin: 20 }}
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
