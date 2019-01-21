import React, { Component } from 'react'
import {View,  Dimensions, StatusBar, ActivityIndicator} from 'react-native'
import Modal from "react-native-modal";
import Texti from "../components/common/Texti"
const { height, width } = Dimensions.get('window');

const Loader = ({ isVisible }) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator color="#fff" size="large" />
        <Texti
          fontColor="#FFFFFF"
          >Just a sec...</Texti>
      </Modal>
    </View>
  );
};

export { Loader };
