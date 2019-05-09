import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import { Buttons2 } from '../components/common/Buttons2';
import Navbar from '../components/common/NavbarGrey';
import * as Commmon from '../components/common';
import * as Config from '../config';
const { width, height } = Dimensions.get('window');

class SelectService extends Component {

  constructor(props) {
    super(props);

    this.state = {
      services: [],
      clinic: false
    }

    this.selectedService = this.selectedService.bind(this)
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
      Commmon.getAlert("Mednefits", "Please at least chooseone service to proceed")
    } else {
      Actions.BenefitsDollar({
        services: this.state.services,
        clinicid: this.props.clinicid,
        capCurrency: this.props.capCurrency,
        capAmount: this.props.capAmount,
        check_Id: this.props.check_Id
      })
    }
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        {(this.props.services == undefined) ? (
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
    height: responsiveHeight(16),
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gridBoxActive: {
    width: width / 3.8,
    height: responsiveHeight(16),
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
