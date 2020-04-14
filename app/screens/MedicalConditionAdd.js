import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  TextInput,
} from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getNotify } from '../components/common/Notify';
import * as Core from '../core';
import * as Config from '../config';
import DatePicker from 'react-native-datepicker-latest';
import Navbar from '../components/common/Navbar';

class AddMedCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      date: '',
      condition: '',
    };
    this.AddMedCondition = this.AddMedCondition.bind(this);
  }

  UNSAFE_componentWillMount() {
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

  AddMedical_Condition(callback) {
    // console.warn('update');
    userid = this.state.userid;
    date = this.state.Date_visit;
    condition = this.state.condition;

    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        console.warn(result)
        if (result) {
          fetch(Config.AUTH_NEW_CONDITION, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': result,
            },
            body: JSON.stringify({
              userid: userid,
              date: date,
              condition: condition,
            }),
          })
            .then(response => response.json())
            .then(res => {
              console.warn(res);
              if (res.status == true) {
                Core.getNotify('', 'Success Add Data');
                Actions.MedicalCondition();
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
          marginTop: '-2%',
          marginBottom: '5%',
        }}
      />
    );
  }

  AddMedCondition(result) {
    if (result) {
      this.AddMedical_Condition();
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          rightNav="add-MedCondition"
          AddMedCondition={this.AddMedCondition}
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
              confirmBtnText="Oke"
              cancelBtnText="Batal"
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.condition}
              onChangeText={text => this.setState({ condition: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Condition
            </Text>
          </View>
          {this._renderDivider()}

        </GiftedForm>
      </Container>
    );
  }
}

export default AddMedCondition;
