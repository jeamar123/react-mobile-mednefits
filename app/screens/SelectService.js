import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import { Buttons2 } from '../components/common/Buttons2';
import Navbar from '../components/common/NavbarGrey';
import Texti from "../components/common/Texti";
import * as Commmon from '../components/common';
import * as Config from '../config';
import * as Core from '../core';
const { width, height } = Dimensions.get('window');

class SelectService extends Component {

  constructor(props) {
    super(props);

    this.state = {
      services: [],
      clinic: false,
      kickout: false,
      isLoading: false,
      services: '',
      clinicid: '',
      member: '',
      nric: '',
      checkId: '',
      checkTime: '',
      capCurrency: '',
      capAmount: '',
      clinic_image: '',
      clinic_name: '',
      consultation_fee_symbol: '',
      consultation_status: '',
      consultation_fees: ''
    }

    this.selectedService = this.selectedService.bind(this)
  }

  async componentDidMount() {
    await this.StatusUseronClinic();
  }

  async StatusUseronClinic() {
    storageCheckinUser = await Core.GetDataLocalReturnNew(Config.CHECKIDVISIT);
    data =
      await typeof storageCheckinUser == 'string' ? JSON.parse(storageCheckinUser) : storageCheckinUser;
    console.warn('storageData ' + JSON.stringify(data, 4, null))

    this.setState({
      services: data.clinic_procedures,
      clinicid: data.clinic_id,
      member: data.member,
      nric: data.nric,
      checkId: data.check_in_id,
      checkTime: data.check_in_time,
      capCurrency: data.cap_currency_symbol,
      capAmount: data.cap_per_visit_amount,
      clinic_image: data.image_url,
      clinic_name: data.name,
      consultation_fee_symbol: data.consultation_fee_symbol,
      consultation_status: data.consultation_status,
      consultation_fees: data.consultation_fees,
      isLoading: true
    })

    await Core.CancelVisiByClinic(this.state.checkId, async (error, result) => {
      data =
        await typeof result == 'string' ? JSON.parse(result) : result;
      if (data.status == false) {
        this.setState({
          kickout: true,
        });
        setTimeout(() => {
          this.setState({
            isLoading: false
          })
        }, 1500)
        Actions.notRegister()
      } else {
        setTimeout(() => {
          this.setState({
            isLoading: false
          })
        }, 1500)
      }
      console.warn('data ' + data.check_in_status_removed);
      // await this.setState({
      //   kickout: result.data.check_in_status_removed,
      // });

    });
  }

  remove(array, element) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] === element) {
        array.splice(i, 1);
      }
    }

    return array
  }

  sum(input) {

    if (toString.call(input) !== "[object Array]")
      return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += Number(input[i]);
    }

    return total;
  }

  selectedService(data) {
    let serviceId = "services-" + data.procedureid

    serviceArr = []
    serviceArr2 = this.state.services
    service = [...serviceArr, ...serviceArr2]

    isExist = service.includes(data.procedureid);

    if (!isExist) {
      this.refs[serviceId].setNativeProps({
        borderColor: '#0392CF',
        borderWidth: 2
      });

      service.push(data.procedureid)

    } else {
      this.refs[serviceId].setNativeProps({
        borderColor: '#FFFFFF',
        borderWidth: 2
      });

      service.splice(service.indexOf(data.procedureid), 1)
    }

    this.setState({ services: service })
  }

  validationField() {
    if (this.state.services == "") {
      Commmon.getAlert("Mednefits", "Please at least choose one service to proceed")
    } else {
      Actions.BenefitsDollar({
        services: this.state.services,
        clinicid: this.props.clinicid,
        capCurrency: this.props.capCurrency,
        capAmount: this.props.capAmount,
        checkId: this.props.checkId,
        consultation_fee_symbol: this.props.consultation_fee_symbol,
        consultation_status: this.props.consultation_status,
        consultation_fees: this.props.consultation_fees,
        clinic_image: this.props.clinic_image,
        clinic_name: this.props.clinic_name,
      })
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
          >Checking Registration...</Texti>
        </Modal>
      </View>
    );
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        {this.customLoader()}
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        {(this.props.checkId && this.state.kickout == false) ? (
          <View style={{ flex: 1 }}>
            <Navbar
              leftNav="back-home"
              title="Select Service/s"
              subtitle="Scan & Pay"
            />
            <Content padder>
              <View style={styles.contain}>
                {this.props.services.map((data, key) => (
                  <TouchableOpacity
                    key={key}
                    ref={"services-" + data.procedureid}
                    style={styles.gridBox} onPress={() => this.selectedService(data)}>
                    <Text style={{ fontFamily: 'HelveticaNeue-Roman', textAlign: 'center', fontSize: 14 }}>
                      {data.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Buttons2 style={{ width: '100%' }} onPress={() => this.validationField()}>
                Proceed
                </Buttons2>
            </Content>
          </View>
        ) : (!this.props.checkId && this.state.kickout == true) ? (
          <View style={{ flex: 1 }}>
            <Navbar
              leftNav="back"
              title="Payment Type"
            />
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN }}>Please register before</Text>
              <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN }}>making payment</Text>
            </View>
          </View>
        ) : (
              <View style={{ flex: 1 }}>
                <Navbar
                  leftNav="back"
                  title="Payment Type"
                />
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN }}>Please register before</Text>
                  <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN }}>making payment</Text>
                </View>
              </View>
            )}

      </Container>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridBox: {
    width: width / 3.8,
    height: height / 7.3,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gridBoxActive: {
    width: width / 3.8,
    height: height / 6.2,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 3,
    borderColor: "#0392CF"
  },
};

export default SelectService;
