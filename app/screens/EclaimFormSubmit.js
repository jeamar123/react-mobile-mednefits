import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { EclaimSubmit } from '../components/EclaimSubmit';
import EclaimForm from '../components/EclaimForm';
import { Buttons, Texti } from '../components/common';
import Navbar from '../components/common/Navbar';

class EclaimFormSubmit extends Component {

  state = {
    submitForm: false,
  };

  rightNavCallback = (cb) => {
    this.setState({
      submitForm: cb
    })

    setTimeout(()=>{
      this.setState({
        submitForm: !cb
      })
    },100)
  }

  submitFormCallback = (cb) => {
    this.setState({
      submitForm: cb
    })
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
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
