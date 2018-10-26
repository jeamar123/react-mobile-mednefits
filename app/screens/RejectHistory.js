import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { RejectedHistory } from '../components/RejectedHistory';
import Navbar from '../components/common/Navbar';

class RejectHistory extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <RejectedHistory />
        <GiftedForm
          style={{ backgroundColor: '#fff', paddingLeft: 5, paddingRight: 15 }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <GiftedForm.TextInputWidget
            name="service"
            title="Item/Service"
            placeholder="Gym Membership"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="merchant"
            title="Merchant"
            placeholder="Mednefits Pte Ltd"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="Claim"
            title="Claim"
            placeholder="SGD"
            clearButtonMode="while-editing"
          />
          <GiftedForm.ModalWidget
            title="Date & Time"
            displayValue="dateTime"
            scrollEnabled={false}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.DatePickerIOSWidget
              name="dateTime"
              mode="date"
              getDefaultDate={() => {
                return new Date(new Date().getFullYear() - 18 + '');
              }}
            />
          </GiftedForm.ModalWidget>
          <GiftedForm.ModalWidget
            title="Claim Date"
            displayValue="claimDate"
            scrollEnabled={false}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.DatePickerIOSWidget
              name="claimDate"
              mode="date"
              getDefaultDate={() => {
                return new Date(new Date().getFullYear() - 18 + '');
              }}
            />
          </GiftedForm.ModalWidget>

          <GiftedForm.TextInputWidget
            name="member"
            title="Member"
            clearButtonMode="while-editing"
          />
          <GiftedForm.ModalWidget
            title="Receipt"
            displayValue="receipt"
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
        </GiftedForm>
      </Container>
    );
  }
}

export default RejectHistory;
