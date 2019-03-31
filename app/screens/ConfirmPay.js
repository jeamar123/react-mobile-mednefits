import React, { Component } from 'react';
import { StatusBar, Image, View, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ResponsiveImage from 'react-native-responsive-image';
import { Buttons, Spinner, Popup } from '../components/common';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/Navbar';
import * as Config from '../config';
import * as Core from '../core';

class ConfirmPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: 0,
      currency: false,
      isLoading: false,
      Balance: '0',
      placeholder: null,
      failed: false,
      title: null,
      message: null,
      showPopUp: false,
    };

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ showPopUp: false })
  }

  componentDidMount() {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.log(result)
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url,
        currency: result.data.currency_symbol,
        Balance: result.data.current_balance,
        placeholder: result.data.currency_symbol == 'RM' ? 'Please input amount Malaysian Ringgit' : 'Please input amount in Singaporean Dollar'
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
      amount: this.props.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
    };

    Core.SendPayment(params, (err, result) => {
      console.log(result);
      if (result.status) {
        Core.getNotify('', result.message);
        Actions.Summary({ result: result });
        this.setState({ isLoading: false });
      } else if (!result.status) {
        // Core.getNotify('', result.message);
        this.setState({ title: result.message, message: result.sub_mesage, failed: true, isLoading: false })
      } else {
        this.setState({ title: 'Payment Error', message: 'Failed to send payment, please try again', failed: true, isLoading: false })
        // Core.getNotify('', 'Failed to send payment, please try again');
      }
    });
  }

  statusModal = () => {
    console.log('modal hide completely')
    if (this.state.failed) {
      this.setState({ showPopUp: true });
    } else {
      this.setState({ showPopUp: false });
    }
  }

  customLoader() {
    return (
      <View>
        <Modal
          isVisible={this.state.isLoading}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          onModalHide={this.statusModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
          <Texti
            fontColor="#FFFFFF"
          >Just a sec...</Texti>
        </Modal>
      </View>
    );
  }

  renderPopUp() {
    return (
      <Popup
        kind="insufficientCredit"
        isVisible={this.state.showPopUp}
        closeSection={true}
        closeSectionUpdate={this.isVisibleUpdate}
        title={this.state.title}
        message={this.state.message}
      />
    )
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        {this.customLoader()}
        {this.renderPopUp()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="cancel-cash" title="Mednefits Credits" />
        {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#518cb0',
              height: height / 9,
              width: width,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'helvetica',
                fontSize: 16,
                paddingTop: 10,
                paddingBottom: 15,
                color: '#fff',
              }}
            >
              Current Balance
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text
                style={{
                  fontFamily: 'helvetica',
                  fontSize: 20,
                  lineHeight: 20,
                  color: '#fff',
                  fontWeight: '600',
                }}
              >
                {this.state.Balance}
              </Text>
            </View>
          </View>
        </View> */}
        <Content padder>

          <View style={{ backgroundColor: '#f8f8fa' }}>
            <View
              style={{
                justifyContent: 'center', alignItems: 'center',
                marginTop: '2%',
                marginBottom: '10%'
              }}
            >
              {!this.state.clinic_image ? (
                <ResponsiveImage
                  source={require('../../assets/apps/mednefits.png')}
                  style={{ resizeMode: 'center' }}
                  initWidth="70" initHeight="70"
                />
              ) : (
                  <ResponsiveImage
                    source={{ uri: this.state.clinic_image }}
                    style={{ resizeMode: 'center' }}
                    initWidth="70" initHeight="70"
                  />
                )}
              {!this.state.clinic_name ? (
                <Spinner size="small" />
              ) : (
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#9e9e9e', fontSize: 18, marginTop: '3%' }}>
                    {this.state.clinic_name}
                  </Text>
                )}

            </View>
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                flex: 1,
                height: 100,
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: 50,
                marginTop: '2%',
                marginBottom: '5%'
              }}
            >
              <Text style={{ marginTop: '-5%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 18 }}>
                Payment Amount
                </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ marginTop: '2%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 18 }}>
                  {this.state.currency ? this.state.currency : ' '} {' '}
                </Text>
                <Text style={{ marginTop: '1%', fontFamily: Config.FONT_FAMILY_BOLD, fontSize: 44 }}>
                  {this.props.amount}
                </Text>
              </View>

            </View>
          </View>
          <View style={{ marginBottom: '20%', marginTop: '10%' }}>
            <Buttons
              onPress={() => this.SendPayment()}
              isLoading={this.state.isLoading}
            >
              Pay {this.state.currency ? this.state.currency : ' '} {this.props.amount}
            </Buttons>
          </View>
          {/* <Card>
            <CardItem cardBody>
              <Body
                style={{
                  height: 120,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginLeft: 50,
                }}
              >
                <Text style={{ marginTop: '-5%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 18 }}>
                  Payment Amount
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ marginTop: '1%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 22 }}>
                    {this.state.currency ? this.state.currency : ' '} {' '}
                  </Text>
                  <Text style={{ marginTop: '1%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 30 }}>
                    {this.props.amount}
                  </Text>
                </View>
              </Body>
            </CardItem>

          </Card> */}

        </Content>
      </Container>
    );
  }
}
export default ConfirmPay;
