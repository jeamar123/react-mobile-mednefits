import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { ProfileManage } from '../components/ProfileManage';
import * as Core from '../core';
import * as Config from '../config';
import Navbar from '../components/common/Navbar';
import { ButtonProfile } from '../components/common/ButtonProfile';

class manageProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: '',
      PhoneNumber: '',
      nirc_number: '',
      Dob: '',
      Weight: '',
      Height: '',
      blodeType: '',
    };
  }

  componentWillMount() {
    this.GetDataProfile();
  }

  GetDataProfile() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Full_name : data.profile.full_name,
        PhoneNumber : data.profile.mobile_phone,
        nirc_number : data.profile.nric,
        Dob : data.profile.dob,
        Weight : data.profile.weight,
        Height : data.profile.height,
        blodeType : data.profile.blood_type,
        clinicImage : data.profile.photo_url,
      });
    });
  }

  _renderDivider(){
    return(
      <View style={{borderWidth: 1, borderColor: "#6c6c6c", marginTop: '-2%', marginBottom: '5%'}} />
    )
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" />
        <ProfileManage
        clinicimage={this.state.clinicImage}
        />
        <GiftedForm
          style={{ backgroundColor: '#fff', paddingLeft: '5%', paddingRight: '5%' }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {this.state.Full_name}
              onChangeText={text => this.setState({Full_name: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, }}>
              Name
            </Text>
          </View>
          {this._renderDivider()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {this.state.PhoneNumber}
              onChangeText={text => this.setState({PhoneNumber: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, }}>
              Phone
            </Text>
          </View>
          {this._renderDivider()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {this.state.nirc_number}
              onChangeText={text => this.setState({nirc_number: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, }}>
              NIRC Number
            </Text>
          </View>
          {this._renderDivider()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {this.state.Dob}
              onChangeText={text => this.setState({Dob: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, }}>
              Date of Birth
            </Text>
          </View>
          {this._renderDivider()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {`${this.state.Weight}`}
              onChangeText={text => this.setState({Weight: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, }}>
              Weight (KG)
            </Text>
          </View>
          {this._renderDivider()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {`${this.state.Height}`}
              onChangeText={text => this.setState({Height: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, }}>
              Height (CM)
            </Text>
          </View>
          {this._renderDivider()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Transaction ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-4%', width: '40%', fontFamily: Config.FONT_FAMILY_ROMAN, }}
              value= {this.state.blodeType}
              onChangeText={text => this.setState({blodeType: text})}
            />
            <Text style={{ color: '#c4c4c4', marginLeft: '2%', fontFamily: Config.FONT_FAMILY_ROMAN }}>
              Blood Type
            </Text>
          </View>
          {this._renderDivider()}          
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%'}}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{justifyContent: 'flex-end', fontSize: 36, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#8fd8f7'}}>1</Text>
            <ButtonProfile>Medical History</ButtonProfile>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%'}}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{justifyContent: 'flex-end', fontSize: 36, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#8fd8f7'}}>1</Text>
            <ButtonProfile>Alergies</ButtonProfile>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%'}}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{justifyContent: 'flex-end', fontSize: 36, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#8fd8f7'}}>1</Text>
            <ButtonProfile>Medical Conditions</ButtonProfile>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%'}}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{justifyContent: 'flex-end', fontSize: 36, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#8fd8f7'}}>1</Text>
            <ButtonProfile>Medications</ButtonProfile>
          </View>
        </GiftedForm>
      </Container>
    );
  }
}

export default manageProfile;
