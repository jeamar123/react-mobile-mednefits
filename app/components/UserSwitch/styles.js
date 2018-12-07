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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#348aaf',
    height: height / 6,
    width: width,
  },
  rightSide: {
    fontFamily: 'helvetica',
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    color: '#fff',
    width: '70%',
  },
});
