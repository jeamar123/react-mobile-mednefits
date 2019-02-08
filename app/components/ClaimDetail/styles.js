import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  sectionTitle: {
    justifyContent: 'space-between',
    backgroundColor: '#EFEFF4',
    height: height / 6,
    width: width,
  },
  title: {
    fontFamily: 'helvetica',
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    color: '#A5A5A5',
  },
  detail: {
    paddingLeft: 15,
    paddingBottom: 8,
    fontFamily: 'helvetica',
    fontSize: 16,
    color: '#565656',
    alignItems: 'flex-end',
  },
});
