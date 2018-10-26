import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/common/Navbar';

class BankList extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Bank List" />
        <Content>
          <List>
            <ListItem>
              <Text>DBS/POSB BANK</Text>
            </ListItem>
            <ListItem>
              <Text>OCBC</Text>
            </ListItem>
            <ListItem>
              <Text>UOB</Text>
            </ListItem>
            <ListItem>
              <Text>CITI BANK</Text>
            </ListItem>
            <ListItem>
              <Text>MAY BANK</Text>
            </ListItem>
            <ListItem>
              <Text>STANDARD CHARTERED BANK</Text>
            </ListItem>
            <ListItem>
              <Text>HSBC</Text>
            </ListItem>
            <ListItem>
              <Text>BANK OF CHINA</Text>
            </ListItem>
            <ListItem>
              <Text>RHB BANK</Text>
            </ListItem>

            <ListItem>
              <Text>CIMB BANK BERHAD</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default BankList;
