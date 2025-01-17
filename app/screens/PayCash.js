import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ButtonDone, Spinner } from '../components/common';
import Navbar from '../components/common/Navbar';
import * as Config from '../config';
import * as Core from '../core';

class PayCash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: 0,
      currency: false,
      isLoading: false,
      Balance: '0',
    };
  }

  componentDidMount() {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url,
        currency: result.data.currency_symbol,
        Balance: result.data.current_balance,
      });
    });

    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })

    this.props.services.map(value =>
      Core.GetProcedureDetails(value, (err, result) => {
        this.setState({
          amount: Number(result.data.price) + Number(this.state.amount),
        });
      })
    );
  }

  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      services: this.props.services,
      clinic_id: this.props.clinicid,
    };

    Core.PayDirect(params, (err, result) => {
      if (result.status) {
        Core.getNotify('', result.message);
        Actions.Home({ result: result });
      } else if (!result.status) {
        Core.getNotify('', result.message);
      } else {
        Core.getNotify('', 'Failed to payment, please try again');
      }

      if (result) {
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    return (
      <Container>
        <Core.Loader isVisible={this.state.isLoading} />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="cancel-cash" title="Health Provider" rightNav="done" />

        <Content padder style={{ backgroundColor: '#439057' }}>
          <Card>
            <CardItem style={{ backgroundColor: '#f8f8fa' }}>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                {!this.state.clinic_image ? (
                  <Image
                    source={require('../../assets/apps/mednefits.png')}
                    style={{ height: 60, resizeMode: 'contain', width: 160 }}
                  />
                ) : (
                    <Image
                      source={{ uri: this.state.clinic_image }}
                      style={{ height: 60, resizeMode: 'contain', width: 160 }}
                    />
                  )}
                {!this.state.clinic_name ? (
                  <Spinner size="small" />
                ) : (
                    <Text style={{ marginTop: 10, fontFamily: Config.FONT_FAMILY_LIGHT, color: '#9e9e9e' }}>
                      {this.state.clinic_name}
                    </Text>
                  )}
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Body
                style={{
                  height: 200,
                  width: 200,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Image style={{ width: 55 , height: 55  }} source={require('../../assets/apps/byCash.png')} />
                <Text style={{ marginTop: 20, fontFamily: 'helvetica', width: '80%', fontWeight: 'bold', textAlign: 'center', }}>
                  Pay directly to health provider using any preferred payment method onsite
                </Text>
              </Body>
            </CardItem>

            <ButtonDone
              onPress={() => this.SendPayment()}
              isLoading={this.state.isLoading}
            >
              Done
            </ButtonDone>
            <View style={{ marginBottom: 20 }} />
          </Card>
        </Content>
      </Container>
    );
  }
}
export default PayCash;
