import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const { width } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerImage: {
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth,
    height: imageWidth,
  },
  image: {
    width: imageWidth,
  },
  text: {
    fontFamily: 'helvetica',
    marginBottom: 50,
    width: width / 1.3,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
