import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import Navbar from '../components/common/Navbar';

class Member extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#0392cf" barStyle="light-content" />
        <Navbar leftNav="back" title="Member" />
        <Content>
          <List>
            <ListItem>
              <Text>Filbert Tan</Text>
            </ListItem>
            <ListItem>
              <Text>Jelind Teo</Text>
            </ListItem>
            <ListItem>
              <Text>Edith Tan</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Member;
