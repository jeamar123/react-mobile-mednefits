import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const { width } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth,
    height: imageWidth,
  },
  image: {
    width: imageWidth,
  },
  textThanks: {
    fontFamily: 'helvetica',
    fontSize: 26,
    fontWeight: '600',
    color: '#0392cf',
    marginBottom: 30,
  },
  text: {
    fontFamily: 'helvetica',
    width: width / 1.3,
    textAlign: 'center',
  },
});
