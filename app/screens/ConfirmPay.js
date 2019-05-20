import React, { Component } from 'react';
import { StatusBar, Image, View, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ResponsiveImage from 'react-native-responsive-image';
import { ButtonsConfirm, Spinner, Popup } from '../components/common';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/NavbarGrey';
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
      inputAmount: this.props.amount,
      amountCap: this.props.capAmount,
      byCash: ''
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ showPopUp: false })
  }

  componentDidMount() {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.warn(result)
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

    const amount = this.state.inputAmount;
    const cap = this.state.amountCap;
    this.setState({ byCash: amount - cap });
  }


  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      amount: this.props.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
      check_Id: this.props.check_Id
    };


    Core.CreatePayment(params, (err, result) => {
      console.warn(result);
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
    console.warn('modal hide completely')
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
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        {this.customLoader()}
        {this.renderPopUp()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Summary" />
        <Content padder>
          <View style={{ height: '40%' }}>
            <View style={{ backgroundColor: '#fff' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '4%',
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
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#9e9e9e', fontSize: 18, marginTop: '2%', marginBottom: '3%' }}>
                      {this.state.clinic_name}
                    </Text>
                  )}
              </View>

            </View>
            <View style={{ backgroundColor: '#fff' }}>
              <View
                style={{
                  flex: 1,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 18, color: '#2C3E50' }}>
                    {this.state.currency ? this.state.currency : ' '} {' '}
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 44, color: '#2C3E50', fontWeight: 'bold' }}>
                    {this.props.amount}
                  </Text>
                </View>

              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginLeft: '5%',
                  marginRight: '5%'
                }}
              >
                <View style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: "#bdbdbd",
                  alignItems: 'flex-start',
                  width: '48%'
                }}>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    By Credits:
                </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontWeight: 'bold' }}>
                    {this.state.currency ? this.state.currency : ' '} {this.state.inputAmount}
                  </Text>
                </View>
                <View style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: "#bdbdbd",
                  alignItems: 'flex-start',
                  width: '48%'
                }}>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    By Cash:
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontWeight: 'bold' }}>
                    {this.props.capCurrency}
                    {this.state.inputAmount < this.state.amountCap ? 0 : this.state.byCash}
                  </Text>
                </View>
              </View>

              <View style={{ flex: 1, marginBottom: '8%', marginTop: '10%' }}>
                <ButtonsConfirm
                  onPress={() => this.SendPayment()}
                  isLoading={this.state.isLoading}
                >
                  Pay {this.state.currency ? this.state.currency : ' '} {this.props.amount}
                </ButtonsConfirm>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default ConfirmPay;
