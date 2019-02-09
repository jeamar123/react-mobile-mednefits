import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Image, Text, Alert } from 'react-native';

const propTypes = {
  imageUrl: PropTypes.any,
  title: PropTypes.any,
  description: PropTypes.any,
  distance: PropTypes.any,
};

class CustomCallout extends React.Component {
  render() {
    const { imageUrl, title, description, distance } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Image
            style={{ flex: 1, backgroundColor: 'black', height: 80, width: 80 }}
            source={{ uri: imageUrl }}
          />
          <View style={{ flex: 1 }}>
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
          <Image
            style={{
              flex: 1,
              height: 30,
              width: 30,
              alignSelf: 'center',
              marginRight: 5,
            }}
            source={require('../../assets/maps/direction.png')}
          />
        </View>

        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  bubble: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',

    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 0.5,
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

export default CustomCallout;
