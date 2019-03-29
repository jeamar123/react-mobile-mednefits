import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { EclaimSubmit } from '../components/EclaimSubmit';
import EclaimForm from '../components/EclaimForm';
import Navbar from '../components/common/Navbar';

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
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back-eclaim"
          title="E-Claim"
          subtitle="File e-claim"
          rightNav="next"
          rightNavCallback={this.rightNavCallback}
        />
        <EclaimSubmit />
        <EclaimForm
          submitForm={this.state.submitForm}
        />
      </Container>
    );
  }
}

export default EclaimFormSubmit;
