import React, { Component } from 'react';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
//import { Root, Popup } from 'popup-ui'
import { Popup } from '../../components/common';

class MenuSide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      message: null,
      showPopUp: false,
    }
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }
  isVisibleUpdate() {
    this.setState({ showPopUp: false })
  }
  renderPopUp() {
    this.setState({ showPopUp: true, message: 'You have no credit to access this feature at the moment.Kindly contact your HR.', })
  }
  render() {
    return (
      <ImageBackground
        source={require('../../../assets/andriod_splash.png')}
        style={styles.DrawerContain}
      >
        <Popup
          kind="CobaPopUp"
          isVisible={this.state.showPopUp}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        />
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
              source={require('../../../assets/apps/logo/New_logo_White01.png')}
            />
          </Body>
          <View style={{ marginTop: 10 }} />
          <ListItem icon style={{ marginTop: 10 }} onPress={() =>
            Actions.Home({
              type: 'reset',
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
            })
          }>
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
              <Text style={styles.text}>Home</Text>
            </Body>
          </ListItem>

          <ListItem icon style={{ marginTop: 10 }} onPress={() =>
            
            Actions.Wallet({
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
            })
            
          }>
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
              <Text style={styles.text}>Wallet</Text>
            </Body>
          </ListItem>

          <ListItem icon style={{ marginTop: 10 }} button={true} onPress={() =>
            
            
            Actions.EclaimSubmit({
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
            })
          }
            >
            <Left>
              <TouchableOpacity  onPress={() => this.renderPopUp()}>
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
              <Text style={styles.text}>E-Claim</Text>
            </Body>
          </ListItem>

          <ListItem icon style={{ marginTop: 10 }} onPress={() =>
            Actions.HistoryTransaction({
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
            })
          }>
            <Left>
              <TouchableOpacity>
                <Image
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 25,
                    height: 25,
                  }}
                  source={require('../../../assets/apps/history.png')}
                />
              </TouchableOpacity>
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text}>History</Text>
            </Body>
          </ListItem>

          <ListItem icon style={{ marginTop: 10 }} onPress={() =>
            Actions.Favourites({
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
            })
          }>
            <Left>
              <TouchableOpacity>
                <Image
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 25,
                    height: 25,
                  }}
                  source={require('../../../assets/apps/favorite.png')}
                />
              </TouchableOpacity>
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text}>Favourites</Text>
            </Body>
          </ListItem>

          <ListItem icon style={{ marginTop: 10 }} onPress={() =>
            Actions.Profile({
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
            })
          }>
            <Left>
              <TouchableOpacity>
                <Image
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 25,
                    height: 25,
                  }}
                  source={require('../../../assets/apps/user.png')}
                />
              </TouchableOpacity>
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text}>Profile</Text>
            </Body>
          </ListItem>
        </Content>
      </ImageBackground>
    );
  }
}

export default MenuSide;
