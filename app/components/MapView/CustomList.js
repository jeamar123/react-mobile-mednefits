import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

class CustomList extends Component {
  static propTypes = {
    style: PropTypes.object,
    imageUrl: PropTypes.any,
    title: PropTypes.any,
    description: PropTypes.any,
    distance: PropTypes.any,
  };

  render = () => {
    const { imageUrl, title, description, distance } = this.props;
    return (
      <View>
        <View style={styles.bubble}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                flex: 1,
                backgroundColor: 'black',
                borderRadius: 6,
                borderColor: '#007a87',
                borderWidth: 0.5,
                marginLeft: 10,
                marginRight: 20,
              }}
              source={{ uri: imageUrl }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 5,
                marginTop: 10,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: '300',
                fontSize: 14,
                marginLeft: 5,
              }}
            >
              {description}
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: '200',
                fontSize: 14,
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              {distance} km
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginRight: 10,
                alignSelf: 'flex-end',
              }}
              source={require('../../assets/maps/direction.png')}
            />
          </View>
        </View>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  imageView: {},
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#ffff',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default CustomList;
