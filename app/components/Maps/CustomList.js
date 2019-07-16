import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
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
    const { imageUrl, title, description, distance, latitude, longitude } = this.props;
    return (
      <View>
        <View style={styles.bubble}>
          <View style={{ marginBottom: 15, justifyContent: 'center' }}>
            {(imageUrl == undefined) ? (
              <Image
                source={{
                  uri: "https://empatkali.co.id/assets/img/logo-final.png?v=1",
                }}
                style={{
                  width: 50,
                  height: 50
                }}
                resizeMode='contain'
              >
              </Image>
            ) : (
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
              )}
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
              {(distance) ? distance + " km" : ""}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL('http://maps.google.com/maps?daddr=' + latitude + ',' + longitude)}
            style={{ justifyContent: 'center' }}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginRight: 10,
                alignSelf: 'flex-end',
              }}
              source={require('../../../assets/apps/maps/direction.png')}
            />
          </TouchableOpacity>
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
