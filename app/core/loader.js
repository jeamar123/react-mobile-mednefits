import React, { Component } from 'react'
import { View, Dimensions, StatusBar, ActivityIndicator } from 'react-native'
import Modal from "react-native-modal";
import Texti from "../components/common/Texti"
const { height, width } = Dimensions.get('window');

const Loader = ({ isVisible }) => {
  if (isVisible) {
    return (
      <View>
        <Modal
          isVisible={isVisible}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#0392cf" size="large" />
          <Texti
            fontColor="#FFFFFF"
          >Just a sec...</Texti>
        </Modal>
      </View>
    );
  } else {
    return null;
  }
};

export { Loader };
