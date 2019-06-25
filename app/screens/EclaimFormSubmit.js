import React, { Component } from 'react';
import { Container } from 'native-base';
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
