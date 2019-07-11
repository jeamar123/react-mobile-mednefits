import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Image, Text, Alert } from 'react-native';

const propTypes = {
  imageUrl: PropTypes.any,
  title: PropTypes.any,
  description: PropTypes.any,
  distance: PropTypes.any,
};

class UserCallout extends React.Component {
  render() {
    const { imageUrl, title, description } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Image
            style={{
              flex: 1,
              backgroundColor: 'black',
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            source={{ uri: imageUrl }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 5,
                marginTop: 15,
                marginRight: 10,
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
                marginRight: 10,
              }}
            >
              {description}
            </Text>
          </View>
        </View>

        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

UserCallout.propTypes = propTypes;

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
    borderTopColor: 'white',
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

export default UserCallout;
