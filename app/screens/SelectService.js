import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Buttons } from '../components/common/Buttons2';
import Navbar from '../components/common/NavbarGrey';
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

  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
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

          <Buttons style={{ width: '100%' }} onPress={() => Actions.PayScan({ type: 'reset', services: this.state.services, clinicid: this.props.clinicid })}>
            Proceed
          </Buttons>
        </Content>
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
    height: height / 6.2,
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
