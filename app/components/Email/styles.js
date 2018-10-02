import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const { width } = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'helvetica',
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 120,
  },
  text: {
    fontFamily: 'helvetica',
    width: width / 1.3,
    textAlign: 'center',
  },
});
