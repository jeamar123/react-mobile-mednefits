import React, { Component } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, List, ListItem, Text } from 'native-base';
import Navbar from '../components/common/Navbar';

class Member extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#0392cf" barStyle="dark-content" />
        <Navbar leftNav="back" title="Member" />
        <Content>
          <List>
            <ListItem>
              <TouchableOpacity onPress={() => Actions.ReceiptVerification()}>
                <Text>Filbert Tan</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity onPress={() => Actions.ReceiptVerification()}>
                <Text>Jelind Teo</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity onPress={() => Actions.ReceiptVerification()}>
                <Text>Edith Tan</Text>
              </TouchableOpacity>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Member;
