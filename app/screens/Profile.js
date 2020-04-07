import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Config from '../config';
import Navbar from '../components/common/Navbar';
import Icons from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet'
import * as Core from '../core';

class RenderList extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={{
          backgroundColor: 'white',
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 3
        }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text
            style={{
              color: 'black',
              marginLeft: 15,
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: 14,
            }}
          >
            {this.props.title}
          </Text>
          <Icons
            name="angle-right"
            style={{
              color: '#0392cf',
              fontSize: 25,
              paddingRight: 15
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  async logoutProcess(index) {
    if (index == 0) {
      try {
        // await AsyncStorage.removeItem('check_in_id');
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('latitude');
        await AsyncStorage.removeItem('longitude');
      }
      catch (exception) {
        Core.getNotify("", "Failed logout, please try again")
      }
      finally {
        Actions.Login({
          type: 'reset',
        })
      }
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <Navbar
          leftNav="back-eclaim"
          Services={this.props.services}
          clinic_Id={this.props.clinicid}
          member={this.props.member}
          nric={this.props.nric}
          check_Id={this.props.checkId}
          checkTime={this.props.checkTime}
          capCurrency={this.props.capCurrency}
          capAmount={this.props.capAmount}
          clinic_image={this.props.clinic_image}
          clinic_name={this.props.clinic_name}
          consultation_fee_symbol={this.props.consultation_fee_symbol}
          consultation_status={this.props.consultation_status}
          consultation_fees={this.props.consultation_fees}
        />
        {/* <Common.Popup
          kind="insufficientCredit"
          //just for example the right parameter is like this isVisible={this.props.isVisible}
          isVisible={true}
          closeSection={true}
          onRequestClose={() => { this.visibleModal(false); }}
        /> */}
        <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
          <View style={{ marginTop: 50 }}>
            <RenderList
              action={() => Actions.ManageProfile()}
              title="Manage Profile"
            />
            <RenderList
              action={() => Actions.Updatepassword()}
              title="Update Password"
            />
            <View style={{ marginTop: 50 }}>
              <RenderList
                action={this.showActionSheet}
                title="Logout"
              />
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'You are about to logout?'}
                options={['Yes, please', 'Cancel']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={(index) => this.logoutProcess(index)}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default Profile;
