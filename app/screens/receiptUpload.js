import React, { Component } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { UploadReceipt } from '../components/VericicationReceipt';
import { Buttons } from '../components/common';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/NavbarGrey';
import * as Core from '../core';
import * as Config from '../config';

const options = {
    title: 'Upload Receipt',
    takePhotoButtonTitle: 'Take a Photo',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
    quality: 1,
};

class receiptUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    selectPhoto() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({ imageSource: source, photo_url: response.uri, isLoading: true });

                const file = {
                    uri: response.uri,
                    name: 'receipt',
                    type: 'image/jpeg',
                };

                Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
                    let myHeaders = new Headers();
                    let formdata = new FormData();

                    myHeaders.append('Authorization', result);
                    myHeaders.append('Content-Type', 'multipart/form-data');
                    formdata.append("file", file)
                    formdata.append("transaction_id", this.props.transactionID)

                    params = {
                        url: Config.USER_UPLOAD_IN_NETWORK_RECEIPT,
                        method: 'POST',
                        header: myHeaders,
                        body: formdata,
                    };

                    fetch(Config.USER_UPLOAD_IN_NETWORK_RECEIPT, {
                        method: 'POST',
                        headers: myHeaders,
                        body: formdata,
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.warn(JSON.stringify(response, null, 4))
                            Core.getNotify('', response.message);
                            Actions.Home();
                            this.setState({ isLoading: false });
                        })
                        .catch(error => {
                            console.warn('error fetching', error.message);
                        });
                });
            }
        });
    }

    customLoader() {
        return (
            <View>
                <Modal
                    isVisible={this.state.isLoading}
                    backdropTransitionOutTiming={0}
                    hideModalContentWhileAnimating={true}
                    onModalHide={this.statusModal}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator color="#fff" size="large" />
                    <Texti
                        fontColor="#FFFFFF"
                    >Uploading</Texti>
                </Modal>
            </View>
        );
    }

    render() {
        console.warn("props: " + JSON.stringify(this.props))
        return (
            <View style={{ flex: 1, backgroundColor: '#efeff4' }}>
                {this.customLoader()}
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Navbar
                    leftNav="null"
                    title="Receipt Verification"
                    subtitle="In-Network"
                    rightNav="skip"
                />
                <UploadReceipt />
                <Buttons onPress={() => this.selectPhoto()}>
                    <Icon name="camera" style={{ color: '#fff', fontSize: 36 }} />
                </Buttons>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'helvetica',
                            marginBottom: 30,
                            width: '70%',
                            textAlign: 'center',
                            marginTop: '10%',
                            fontSize: 16,
                        }}>
                        if you skip this step, you may still do so
						under your History Tab
    				</Text>
                </View>
            </View>
        );
    }
}

export default receiptUpload;
