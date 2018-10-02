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

class BankList extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons name="angle-left" style={{ color: '#fff' }} />
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Back
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>Bank List</Title>
          </Body>
          <Right />
        </Header>
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
