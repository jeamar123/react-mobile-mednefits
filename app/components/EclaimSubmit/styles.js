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
    width: width
  },
  title: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%'
  },
  detail: {
    paddingLeft: '5%',
    paddingBottom: '2%',
    fontFamily: 'helvetica',
    fontSize: 18,
    fontWeight: '600',
    color: '#565656',
    alignItems: 'flex-end',
  },
});
