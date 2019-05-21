import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import {
	Container,
	Header,
	Button,
	Left,
	Right,
	Body,
	Text,
} from 'native-base';
import { UploadReceipt } from '../components/VericicationReceipt';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/common/NavbarGrey';
import Icon from 'react-native-vector-icons/Feather';

class receiptUpload extends Component {
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#efeff4' }}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				<Navbar
					leftNav="null"
					title="Receipt Verification"
					subtitle="In-Network"
					rightNav="skip"
				/>
				<UploadReceipt />
				<Buttons>
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
