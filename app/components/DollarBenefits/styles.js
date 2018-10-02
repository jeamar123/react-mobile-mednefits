import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    backgroundColor: '#626E82',
    height: height / 9,
    width: width,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'helvetica',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 15,
    color: '#fff',
  },
  detail: {
    fontFamily: 'helvetica',
    fontSize: 30,
    lineHeight: 30,
    color: '#fff',
    fontWeight: '600',
  },
  detailUp: {
    fontFamily: 'helvetica',
    fontSize: 17,
    lineHeight: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
