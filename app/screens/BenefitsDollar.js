import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { DollarBenefits } from '../components/DollarBenefits';
import { Buttons, Spinner } from '../components/common';
import { InputWithButton } from '../components/TextInput';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';

class BenefitsDollar extends Component {

  constructor(props){
    super(props)

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: 0,
      currency: false,
      isLoading: false
    }
  }

  componentDidMount(){
    Core.GetClinicDetails(this.props.clinicid,(err, result)=>{
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url
      })
    })

    Core.GetBalance((err, result)=>{
      this.setState({currency: result.data.currency_symbol})
    })

    this.props.services.map(value=>
      Core.GetProcedureDetails(value, (err, result)=>{
        this.setState({
          amount: Number(result.data.price) + Number(this.state.amount)
        })
      })
    )
  }

  SendPayment(){

    this.setState({isLoading: true})

    params = {
      amount: this.state.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid
    }

    Core.SendPayment(params, (err, result)=>{
      if (result.status) {
        Core.getNotify("",result.message)

        Actions.Summary({result: result})
      } else if (!result.status) {
        Core.getNotify("",result.message)
      } else {
        Core.getNotify("","Failed to send payment, please try again")
      }

      if (result) {
        this.setState({isLoading: false})
      }
    })
  }

  render() {
    return (
      <Container>
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="cancel" title="Benefits Dollars" />
        <DollarBenefits />
        <Content padder>
          <Card>
            <CardItem style={{ backgroundColor: '#E8E7EE' }}>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                {(!this.state.clinic_image) ? (
                  <Image
                    source={require('../../assets/apps/mednefits.png')}
                    style={{ height: 55, resizeMode: 'center', width: 155 }}
                  />
              ) : (
                <Image
                  source={{uri: this.state.clinic_image}}
                  style={{ height: 55, resizeMode: 'center', width: 155 }}
                />
              )}
              {(!this.state.clinic_name) ? (
                <Spinner size="small"/>
              ) : (
                <Text style={{ marginTop: 10, fontFamily: 'helvetica' }}>
                  {this.state.clinic_name}
                </Text>
              )}
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Body
                style={{
                  height: 150,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginLeft: 50,
                }}
              >
                <Text style={{ marginTop: 20, fontFamily: 'helvetica' }}>
                  Payment Amount
                </Text>
                <InputWithButton
                  keyboardType="numeric"
                  placeholder="Total Payment"
                  value={((this.state.currency) ? this.state.currency : " ") + " "+this.state.amount}
                />
              </Body>
            </CardItem>

            <Buttons onPress={() => this.SendPayment()} isLoading={this.state.isLoading}>Pay</Buttons>
            <View style={{ marginBottom: 20 }} />
          </Card>
        </Content>
      </Container>
    );
  }
}
export default BenefitsDollar;
