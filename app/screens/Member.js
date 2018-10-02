import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { StatusBar, View } from 'react-native';
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

class Member extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons
                name="angle-left"
                style={{ color: '#fff', fontSize: 32 }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Back
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff', fontSize: 22 }}>Member</Title>
          </Body>
          <Right />
        </Header>
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
