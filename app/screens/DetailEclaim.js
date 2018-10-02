import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { StatusBar, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import { ClaimDetail } from '../components/ClaimDetail';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';

class DetailEclaim extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons
                name="angle-left"
                style={{ color: '#fff', fontSize: 32 }}
              />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                Home
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff', fontSize: 22 }}>E-Claim</Title>
            <Text style={{ color: '#fff' }}>File a claim</Text>
          </Body>
          <Right />
        </Header>
        <ClaimDetail />
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
          <GiftedForm.TextInputWidget
            name="service"
            title="*Item/Service"
            placeholder="Gym Membership"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="merchant"
            title="*Merchant"
            placeholder="Mednefits Pte Ltd"
            clearButtonMode="while-editing"
          />
          <GiftedForm.ModalWidget
            title="*Date of Visit"
            displayValue="dateVisit"
            scrollEnabled={false}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.DatePickerIOSWidget
              name="birthday"
              mode="date"
              getDefaultDate={() => {
                return new Date(new Date().getFullYear() - 18 + '');
              }}
            />
          </GiftedForm.ModalWidget>
          <GiftedForm.ModalWidget
            title="Time of Visit"
            displayValue="timeVisit"
            scrollEnabled={false}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.DatePickerIOSWidget
              name="birthday"
              mode="date"
              getDefaultDate={() => {
                return new Date(new Date().getFullYear() - 18 + '');
              }}
            />
          </GiftedForm.ModalWidget>
          <GiftedForm.TextInputWidget
            name="claimAmount"
            title="*Claim Amount"
            placeholder="SGD"
            clearButtonMode="while-editing"
          />
          <GiftedForm.ModalWidget
            title="*Member"
            displayValue="member"
            scrollEnabled={false}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.DatePickerIOSWidget
              name="Member"
              mode="date"
              getDefaultDate={() => {
                return new Date(new Date().getFullYear() - 18 + '');
              }}
            />
          </GiftedForm.ModalWidget>
          <GiftedForm.TextInputWidget
            name="receipt"
            title="*Receipt"
            clearButtonMode="while-editing"
          />
        </GiftedForm>
      </Container>
    );
  }
}

export default DetailEclaim;
