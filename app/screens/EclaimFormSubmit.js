import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Image, Text, TextInput } from 'react-native';
import { Container } from 'native-base';
import { EclaimSubmit } from '../components/EclaimSubmit';
import { Buttons } from '../components/common';
import Navbar from '../components/common/Navbar';

class EclaimFormSubmit extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          title="E-Claim"
          subtitle="File e-claim"
          rightNav="next"
        />
        <EclaimSubmit />
        <GiftedForm
          style={{ backgroundColor: '#fff', paddingLeft: 5, paddingRight: 15 }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ color: '#000', marginLeft: '2%' }}>
              *Item/Service
            </Text>
            <TextInput
              placeholder="Gym Membership"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '20%' }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#000', marginLeft: '2%', marginRight: '6%' }}
            >
              *Merchant
            </Text>
            <TextInput
              placeholder="Mednefits Pte Ltd"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '20%' }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
            >
              *Date of Visit
            </Text>
            <TextInput
              placeholderTextColor="#0392cf"
              placeholder="Choose Date"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '40%' }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
            >
              *Time of Visit
            </Text>
            <TextInput
              placeholderTextColor="#0392cf"
              placeholder="Choose Time"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '39%' }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
            >
              *Claim Amount
            </Text>
            <TextInput
              placeholderTextColor="#0392cf"
              placeholder="S$"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '15%' }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                color: '#000',
                marginLeft: '2%',
                marginRight: '10%',
              }}
            >
              Member
            </Text>
            <TextInput
              placeholder="Member"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '19%' }}
            />
          </View>

          {/* <Buttons>Submit</Buttons> */}
        </GiftedForm>
      </Container>
    );
  }
}

export default EclaimFormSubmit;
