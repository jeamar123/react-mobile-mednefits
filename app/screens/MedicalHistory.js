import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text, Drawer, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import RF from "react-native-responsive-fontsize";
import Navbar from '../components/common/Navbar';
import { ButtonCall } from '../components/common/ButtonCall';
import * as Config from '../config';
import * as Core from '../core';
import * as Common from '../components/common';

class MedicalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      resultData: [],
      DataE_Claim: [],
      data: false,
      history: [],
    };
    this.drawerActionCallback = this.drawerActionCallback.bind(this);
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  drawerActionCallback(callback) {
    if (callback == true) {
      this.openDrawer();
    }
  }

  async componentDidMount() {
    this.getFavorites_Clinic();
    await Core.UserDetail(async (error, result) => {
      // console.log(error);
      // console.log(result);
      if (result.status) {
        data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
        await this.setState({
          Full_name: data.profile.full_name,
          nirc_number: data.profile.nric,
          email: data.profile.email,
          PhoneNumber: data.profile.mobile_phone,
          Dob: data.profile.dob,
          Weight: data.profile.weight,
          Height: data.profile.height,
          bmi: data.profile.bmi,
          blodeType: data.profile.blood_type,
          photo_url: data.profile.photo_url,
          history: data.history,
          allergies: data.allergies,
          medCondition: data.conditions,
          medication: data.medications
        });
      } else if (result.history == null) {
        setTimeout(function () {
          Actions.pop();
          Core.getNotifyLong('', 'Sorry, no Data here ');
        }, 20000);
      }
      // console.log(data);
    });
  }

  getFavorites_Clinic() {
    Core.GetFavouritesClinic((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data, data: true });
    });
  }

  DelMedical_History(history_id) {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      console.warn(result)
      if (result) {
        fetch(Config.AUTH_DELETE_HISTORY + '?value=' + history_id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': result,
          }
        })
          .then(response => response.json())
          .then(res => {
            console.warn(history_id);
            if (res.status == true) {
              Core.getNotify('', 'Success Delete Data');
              Actions.MedicalHistory();
            } else {
              Core.getNotify('', 'Failed Delete Data');
            }
          })
          .catch(error => {
            console.warn('error fetching', error.message);
          });
      } else {
        console.warn("else");
        // Actions.login({ type: 'reset' });
      }
    });
  }

  renderMedicalHistory() {
    if (this.state.history == null) {
      return (
        <View />
      )
    }
    else if (this.state.history) {
      return this.state.history.map((Data, index) => (

        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            // width: '90%'
            marginBottom: responsiveHeight(1),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: responsiveHeight(2),
              marginLeft: '5%',
              marginRight: '5%'
            }}
          >
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.8) }}>
              Clinic{' '}
              <Text style={{ fontFamily: Config.FONT_FAMILY_BOLD, color: '#848484', fontSize: RF(1.8) }}>
                {'' + Data.clinic_name} - {Data.record_id}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.DelMedical_History(Data.record_id)
              }
              style={{
                paddingTop: 2,
                paddingBottom: 4,
                backgroundColor: '#ED153F',
                borderRadius: 5,
                alignSelf: 'center',
                width: responsiveWidth(20)
              }}
            >
              <Text
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: 14,
                }}
              > DELETE
            </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Common.Divider />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
              marginLeft: '5%',
              marginRight: '5%'
            }}
          >
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.8) }}>
              Type Visit{' '}
              <Text style={{ fontFamily: Config.FONT_FAMILY_BOLD, color: '#848484', fontSize: RF(1.8) }}>
                {'' + Data.visit_type}
              </Text>
            </Text>
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(1.8) }}>
              Date : {Data.date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: responsiveHeight(2),
              marginLeft: '5%',
              marginRight: '5%'
            }}
          >
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.8) }}>
              Doctor{' '}
              <Text style={{ fontFamily: Config.FONT_FAMILY_BOLD, color: '#848484', fontSize: RF(1.8) }}>
                {'' + Data.doctor}
              </Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: responsiveHeight(1.5),
              marginLeft: '5%',
              marginRight: '5%'
            }}
          >
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.8) }}>
              Notes from doctor : {' '}
              <Text style={{ fontFamily: Config.FONT_FAMILY_BOLD, color: '#848484', fontSize: RF(1.8) }}>
                {'' + Data.note}
              </Text>
            </Text>
          </View>

        </View>
      ));
    }
  }


  render() {
    console.warn(JSON.stringify(this.state.history, null, 4))
    return (

      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          drawerAction={this.drawerActionCallback}
          leftNav="backtoProfile"
          rightNav="Adding-MedHistory"
        />

        {(!this.state.data) ? (
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <ActivityIndicator size="large" color="#0392cf" />
          </View>
        ) : (
            <View
              style={{
                flex: 1,
                marginLeft: '2%',
                marginRight: '2%',
                marginTop: '2%',
              }}
            >
              <ScrollView>
                {this.renderMedicalHistory()}
              </ScrollView>
            </View>

          )}

      </View>
    );
  }
}

export default MedicalHistory;
