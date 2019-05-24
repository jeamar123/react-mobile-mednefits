import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const { width } = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: 60,
    resizeMode: 'contain',
    width: 100
  },
  text: {
    fontFamily: 'helvetica',
    marginBottom: 50,
    width: width / 1.3,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerImage: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  imageUpload: {
    width: '30%',
  },
  textUpload: {
    fontFamily: 'helvetica',
    marginBottom: 30,
    width: width / 1.3,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

});
