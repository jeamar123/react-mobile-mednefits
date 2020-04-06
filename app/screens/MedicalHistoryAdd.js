import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getNotify, getAlert } from '../components/common/Notify';
import * as Core from '../core';
import * as Config from '../config';
import * as Common from '../components/common';
import DatePicker from 'react-native-datepicker-latest';
import Navbar from '../components/common/Navbar';
import { ButtonProfile } from '../components/common/ButtonProfile';

class addMedicalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      visit_type: '',
      doctor: '',
      clinic_name: '',
      note: '',
      date: ''
    };
    this.addMedicalHistory = this.addMedicalHistory.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.GetDataProfile();
  }

  GetDataProfile() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data.profile.user_id);
      this.setState({
        user_id: data.profile.user_id,
      });
    });
  }

  AddMedical_History(callback) {
    // console.warn('update');
    user_id = this.state.user_id;
    visit_type = this.state.visit_type;
    doctor = this.state.doctor;
    clinic_name = this.state.clinic_name;
    note = this.state.note;
    date = this.state.Date_visit;

    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        console.warn(result)
        if (result) {
          fetch(Config.AUTH_NEW_HISTORY, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': result,
            },
            body: JSON.stringify({
              user_id: user_id,
              visit_type: visit_type,
              doctor: doctor,
              clinic_name: clinic_name,
              note: note,
              date: date
            }),
          })
            .then(response => response.json())
            .then(res => {
              console.warn(res);
              if (res.status == true) {
                Core.getNotify('', 'Success Add Data');
                Actions.MedicalHistory();
              } else {
                Core.getNotify('', 'Failed Add Data');
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
    } catch (e) {
      console.warn('error get Data' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }

  _renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.8,
          marginTop: '3%',
          marginBottom: '8%',
        }}
      />
    );
  }

  addMedicalHistory(result) {
    if (result) {
      this.AddMedical_History();
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          rightNav="add-MedHistory"
          addMedicalHistory={this.addMedicalHistory}
        />
        <GiftedForm
          style={{
            backgroundColor: '#fff',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '10%',
          }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <DatePicker
              style={{
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              date={
                this.state.Date_visit == '0000-00-00'
                  ? '1993-08-30'
                  : this.state.Date_visit
              }
              mode="date"
              placeholder="DD-MM-YYYY   "
              format="DD-MM-YYYY"
              confirmBtnText="Done"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: { width: 0, height: 0 },
                dateInput: {
                  color: '#38424B',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginLeft: '4%',
                  borderWidth: 0,
                  marginBottom: 10,
                },
                placeholderText: {
                  color: '#38424B',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 14,
                  lineHeight: 30,
                },
                dateText: {
                  color: '#38424B',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 14,
                  lineHeight: 30,
                },
              }}
              onDateChange={date => this.setState({ Date_visit: date })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Date
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder=""
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.visit_type}
              onChangeText={text => this.setState({ visit_type: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Type of Visit
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder=""
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.doctor}
              onChangeText={text => this.setState({ doctor: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Doctor
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder=""
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.clinic_name}
              onChangeText={text => this.setState({ clinic_name: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Clinic
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder=""
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.note}
              onChangeText={text => this.setState({ note: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Description
            </Text>
          </View>
          {this._renderDivider()}

        </GiftedForm>
      </Container>
    );
  }
}

export default addMedicalHistory;
