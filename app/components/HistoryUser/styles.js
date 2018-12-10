import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;
import * as Config from '../../config';

export default EStyleSheet.create({
  sectionHeader: {
    justifyContent: 'space-between',
    backgroundColor: '#0392cf',
    height: height / 4,
    width: width,
  },
  contentHeader: {
    flex: 1,
    height: 230,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '7%',
    marginRight: '7%',
  },
  imageHeader: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
  },
  sectionDetail: {
    backgroundColor: '#666666',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  amount: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 16,
    color: '#fff',
    textAlignVertical: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: '5%',
  },
  detail: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 12,
    color: '#fff',
    textAlignVertical: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '5%',
  },
});
