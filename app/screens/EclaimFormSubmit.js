import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { EclaimSubmit } from '../components/EclaimSubmit';
import EclaimForm from '../components/EclaimForm';
import EclaimStep from '../components/EclaimStep';
import Navbar from '../components/common/NavbarGrey';

class EclaimFormSubmit extends Component {

  state = {
    submitForm: false,
  };

  rightNavCallback = (cb) => {
    this.setState({
      submitForm: cb
    })
  }

  render() {
    return (
      <Container>
        <Navbar
          leftNav="back"
          title="Submit Claim"
          subtitle="E-Claim"
          fontColor="#000000"
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
        <EclaimStep />
        <EclaimForm
          {...this.props}
          submitForm={this.state.submitForm}
          claim={this.props.claim}
          claimTypeState={this.props.claimTypeState}
          currency={this.props.currency}
          currencyState={this.props.currencyState}
        />
      </Container>
    );
  }
}

export default EclaimFormSubmit;
