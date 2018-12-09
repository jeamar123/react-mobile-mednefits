import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ClaimDetail } from '../components/ClaimDetail';
import { ButtonFooter } from '../components/common';
import Navbar from '../components/common/Navbar';

class DetailEclaim extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="E-Claim" subtitle="File e-claim" />
        <ClaimDetail />
        <ScrollView>
          <GiftedForm
            style={{
              backgroundColor: '#fff',
              paddingLeft: 5,
              paddingRight: 15,
            }}
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
                placeholderTextColor="#0392cf"
                placeholder="Spectacle"
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
                placeholderTextColor="#0392cf"
                placeholder="Spectacle Hut"
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
                placeholder="25 April 2017"
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '19%' }}
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
                placeholder="3:30pm"
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '18%' }}
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
                placeholder="S$188.00"
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
                placeholderTextColor="#0392cf"
                placeholder="Filber Tan"
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '19%' }}
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
                  marginRight: '19%',
                }}
              >
                Receipt
              </Text>
              <View
                style={{
                  height: 130,
                  width: '50%',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{ width: '50%', height: 130 }}
                  source={require('../../assets/apps/mednefits.png')}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text style={{ width: '38%' }} />
            </View>
          </GiftedForm>
          <ButtonFooter onPress={() => Actions.ThanksEclaim()}>
            Submit
          </ButtonFooter>
        </ScrollView>
      </Container>
    );
  }
}

export default DetailEclaim;
