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

class AddMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      medication: '',
      dosage: '',
    };
    this.AddMedication = this.AddMedication.bind(this);
  }

  componentWillMount() {
    this.GetDataProfile();
  }

  GetDataProfile() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      // console.warn(data.profile.user_id);
      this.setState({
        userid: data.profile.user_id,
      });
      console.warn(this.state.userid);
    });
  }

  AddMedical_Medication(callback) {
    // console.warn('update');
    userid = this.state.userid;
    medication = this.state.medication;
    dosage = this.state.dosage;

    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        console.warn(result)
        if (result) {
          fetch(Config.AUTH_NEW_MEDICATION, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': result,
            },
            body: JSON.stringify({
              userid: userid,
              medication: medication,
              dosage: dosage,
            }),
          })
            .then(response => response.json())
            .then(res => {
              console.warn(res);
              if (res.status == true) {
                Core.getNotify('', 'Success Add Data');
                Actions.MedicalMedications();
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

  AddMedication(result) {
    if (result) {
      this.AddMedical_Medication();
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          rightNav="add-Medication"
          AddMedication={this.AddMedication}
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
            <TextInput
              placeholder=""
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.medication}
              onChangeText={text => this.setState({ medication: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Medication
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
              value={this.state.dosage}
              onChangeText={text => this.setState({ dosage: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              dosage
            </Text>
          </View>
          {this._renderDivider()}

        </GiftedForm>
      </Container>
    );
  }
}

export default AddMedication;
