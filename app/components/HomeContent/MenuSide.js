import React from 'react';
import { View, Image,ImageBackground, TouchableOpacity } from 'react-native';
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
  <ImageBackground
    source={require('../../../assets/andriod_splash.png')}
    style={styles.DrawerContain}
    >
    <Content padder>
      <View style={{ marginTop: 50 }} />
      <Body>
        <Image
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            width: 40,
            height: 40,
          }}
          source={require('../../../assets/apps/LogoMednefits.png')}
        />
      </Body>
      <View style={{ marginTop: 10 }} />
      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <TouchableOpacity
            onPress={() =>
              Actions.Home({
                type: 'reset',
              })
            }
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../../assets/apps/home.png')}
            />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Actions.Home({
                type: 'reset',
              })
            }
          >
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <TouchableOpacity
            onPress={() =>
              Actions.Balance({
                type: 'reset',
              })
            }
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../../assets/apps/wallet.png')}
            />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Actions.Balance({
                type: 'reset',
              })
            }
          >
            <Text style={styles.text}>Wallet</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <TouchableOpacity
            onPress={() =>
              Actions.EclaimSubmit({
                type: 'reset',
              })
            }
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../../assets/apps/receipt.png')}
            />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Actions.EclaimSubmit()
            }
          >
            <Text style={styles.text}>E-Claim</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <TouchableOpacity
            onPress={() =>
              Actions.HistoryTransaction()
            }
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../../assets/apps/history.png')}
            />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Actions.HistoryTransaction()
            }
          >
            <Text style={styles.text}>History</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <TouchableOpacity
            onPress={() =>
              Actions.Favourites()
            }
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../../assets/apps/favorite.png')}
            />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Actions.Favourites()
            }
          >
            <Text style={styles.text}>Favourites</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>

      <ListItem icon style={{ marginTop: 10 }}>
        <Left>
          <TouchableOpacity
            onPress={() =>
              Actions.Profile()
            }
          >
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../../assets/apps/user.png')}
            />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Actions.Profile()
            }
          >
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    </Content>
  </ImageBackground>
);

export default MenuSide;
