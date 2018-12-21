import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Buttons } from '../components/common';
import Navbar from '../components/common/Navbar';
const { width, height } = Dimensions.get('window');

class SelectService extends Component {

  constructor(props){
    super(props);

    this.state = {
      services: [],
      total: []
    }

    this.selectedService = this.selectedService.bind(this)
  }

  remove(array, element) {
    for( var i = 0; i < array.length-1; i++){
       if ( array[i] === element) {
         array.splice(i, 1);
       }
    }

    return array
  }

  sum(input){

    if (toString.call(input) !== "[object Array]")
      return false;

      var total =  0;
      for(var i=0;i<input.length;i++)
      {
        if(isNaN(input[i])){
        continue;
         }
          total += Number(input[i]);
      }

      return total;
  }

  selectedService(data){
    let serviceId = "services-"+data.procedureid

    serviceArr = []
    serviceArr2 = this.state.services

    service = [...serviceArr, ...serviceArr2]

    isExist = service.includes(data);

    if (!isExist) {
      this.refs[serviceId].setNativeProps({
        borderColor: '#0392CF',
        borderWidth: 1
      });

      service.push(data)

    } else {
      this.refs[serviceId].setNativeProps({
        borderColor: '#FFFFFF',
        borderWidth: 1
      });

      service.splice( service.indexOf(data), 1 )
    }

    this.setState({ services: service })
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#eeeeee' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back-home"
          title="Select Service/s"
          subtitle="Scan & Pay"
        />
        <Content padder>
          <View style={styles.contain}>
            {this.props.services.map((data, key)=>(
              <TouchableOpacity
                key={key}
                ref={"services-"+data.procedureid}
                style={styles.gridBox} onPress={()=>this.selectedService(data)}>
                <Text style={{ fontFamily: 'HelveticaNeue-Thin', textAlign: 'center', fontSize: 12 }}>
                  {data.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Buttons onPress={() => Actions.PayScan({ type: 'reset' })}>
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
    width: width / 3.9,
    height: height / 7,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gridBoxActive: {
    width: width / 3.9,
    height: height / 7,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: "#0392CF"
  },
};

export default SelectService;
