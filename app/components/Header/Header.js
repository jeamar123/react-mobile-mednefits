import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Header = () => (
  <Header style={{ backgroundColor: '#0392cf' }}>
    <Left>
      <Button transparent>
        <Icons name="angle-left" style={{ color: '#fff', fontSize: 36 }} />
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          Home
        </Text>
      </Button>
    </Left>
    <Body>
      <Title style={{ color: '#fff', fontSize: 22 }}>E-Claim</Title>
      <Text style={{ color: '#fff' }}>File a claim</Text>
    </Body>
    <Right />
  </Header>
);

export default Header;
