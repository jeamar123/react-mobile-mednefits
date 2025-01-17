import React, { Component } from 'react';
import { StatusBar, View, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/common/NavbarGrey';
import * as Common from '../components/common'
import { Actions } from 'react-native-router-flux'

class ItemRender extends Component {
  constructor(props) {
    super(props)
  }

  callbackItem = () => {

    Actions.EclaimSubmit({ currencyState: this.props.value, currency: this.props.label })

  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <View style={{ flex: 1, marginLeft: 15, marginTop: 15 }}>
        <TouchableOpacity
          onPress={this.callbackItem}
          style={{
            paddingTop: (this.props.index == 0) ? 5 : 0,
            paddingBottom: 15
          }}
        >
          <Common.Texti>
            {this.props.label}
          </Common.Texti>
        </TouchableOpacity>
        <Common.Divider />
      </View>
    )
  }
}

class CurrencySelect extends Component {

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item, index }) => (
    <ItemRender
      index={index}
      label={item.label}
      value={item.value}
    />
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Navbar leftNav="back" title={this.props.title} />
        <FlatList
          data={this.props.currencyData}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default CurrencySelect;
