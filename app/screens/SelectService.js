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
      services: []
    }
  }

  componentWillMount(){
    console.warn(this.props.services);
  }

  selectedService(data){
    console.warn(data);
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
              <TouchableOpacity key={key} style={styles.gridBox} onPress={()=>this.selectedService(data.procedureid)}>
                <Text style={{ fontFamily: 'HelveticaNeue-Roman', textAlign: 'center' }}>
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
    height: height / 8,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  gridBoxActive: {
    width: width / 3.9,
    height: height / 8,
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
