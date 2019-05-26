import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const uploadReceipt = () => (
    <View style={styles.container}>
        <ImageBackground resizeMode="contain" style={styles.containerImage}>
            <Image
                resizeMode="contain"
                style={styles.imageUpload}
                source={require('../../../assets/apps/Verification.png')}
            />
        </ImageBackground>
        <Text style={styles.textUpload}>
            Snap a photo of your physical receipt given by the health provider
            for your company HR verification.
    </Text>
    </View>
);

export default uploadReceipt;
