import React, { Component } from 'react';
import {
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    View,
    AsyncStorage,
    WebView,
    Linking,
    ScrollView,
    Image,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { getAlert, getNotify } from './Notify';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');
import * as Core from '../../core';
import * as Config from '../../config'
import * as Common from '../../components/common'

export default class Modaly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.isVisible,
        };
    }

    renderBody() {
        if (this.props.kind == 'loginFailed') {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground
                        style={{ width: 250, height: 100 }}
                        source={require('../../../assets/modalAsset/loginFailed.png')}
                        resizeMode="center"
                    />

                    <View style={{ margin: 10 }}>
                        <Common.Text
                            fontFamily={Config.FONT_FAMILY_REGULAR}
                            fontSize={22}
                            style={{
                                color: '#38424B',
                                textAlign: 'center'
                            }}
                        >
                            Login Failed
            </Common.Text>
                        <Common.Text
                            fontFamily={Config.FONT_FAMILY_MEDIUM}
                            fontSize={12}
                            numberOfLines={10}
                            style={{
                                color: '#38424B',
                                textAlign: 'center'
                            }}
                        >
                            Please check your username and password you enter
            </Common.Text>
                    </View>

                </View>
            );
        } else if (this.props.kind == 'insufficientCredit') {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground
                        style={{ width: 250, height: 100 }}
                        source={require('../../../assets/modalAsset/loginFailed.png')}
                        resizeMode="center"
                    />

                    <View style={{ margin: 10 }}>
                        <Common.Text
                            fontFamily={Config.FONT_FAMILY_REGULAR}
                            fontSize={22}
                            style={{
                                color: '#38424B',
                                textAlign: 'center'
                            }}
                        >
                            You have insufficient medical credit in your account
            </Common.Text>
                        <Common.Text
                            fontFamily={Config.FONT_FAMILY_MEDIUM}
                            fontSize={12}
                            numberOfLines={10}
                            style={{
                                color: '#38424B',
                                textAlign: 'center'
                            }}
                        >
                            You may choose to pay directly to health provider
            </Common.Text>
                    </View>

                </View>
            );
        }
    }

    _closeSection() {
        if ((this.props.kind == 'connectionChange') || (this.props.kind == 'fail') || (!this.props.closeSection)) {
            return <View />
        } else {
            return (
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../../../assets/close.png')}
                />
            )
        }
    }

    render() {
        return (
            <Modal isVisible={this.props.isVisible}>
                <TouchableOpacity
                    onPress={() => this.props.closeSectionUpdate(false)}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginBottom: -50,
                        zIndex: 99,
                    }}
                >
                    {this._closeSection()}
                </TouchableOpacity>

                <View
                    style={{ backgroundColor: 'white', borderRadius: 10, margin: 20 }}
                >
                    <View
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 15,
                        }}
                    >
                        {this.renderBody()}
                    </View>
                </View>
            </Modal>
        );
    }
}
