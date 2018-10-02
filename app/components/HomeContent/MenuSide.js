import React from 'react';
import { View, Image } from 'react-native';
import {
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const MenuSide = () => (
  <View style={styles.DrawerContain}>
    <Content padder>
      <View style={{ marginTop: 50 }} />
      <Body>
        <Image
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            width: 50,
            height: 50,
          }}
          source={require('../../../assets/apps/LogoMednefits.png')}
        />
      </Body>
      <View style={{ marginTop: 20 }} />
      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <Button
            onPress={() =>
              Actions.home({
                type: 'reset',
              })
            }
            style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/home.png')}
            />
          </Button>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text style={styles.text}>Home</Text>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <Button
            onPress={() =>
              Actions.SettingWallet({
                type: 'reset',
              })
            }
            style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/wallet.png')}
            />
          </Button>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text style={styles.text}>Wallet</Text>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <Button
            onPress={() =>
              Actions.DetailEclaim({
                type: 'reset',
              })
            }
            style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/receipt.png')}
            />
          </Button>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text style={styles.text}>E-Claim</Text>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <Button
            onPress={() =>
              Actions.HistoryTransaction({
                type: 'reset',
              })
            }
            style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/history.png')}
            />
          </Button>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text style={styles.text}>History</Text>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <Button style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}>
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/favorite.png')}
            />
          </Button>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text style={styles.text}>Favourites</Text>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <Button style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}>
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/user.png')}
            />
          </Button>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text style={styles.text}>Profile</Text>
        </Body>
      </ListItem>
    </Content>
  </View>
);

export default MenuSide;
