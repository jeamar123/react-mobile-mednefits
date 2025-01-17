import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
import * as Config from '../../config';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;
import RF from 'react-native-responsive-fontsize'

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    backgroundColor: '#f8f8fa',
    height: height / 10,
    width: width,
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'helvetica',
    fontSize: 22,
    color: '#08BB08',
  },
  detail: {
    fontFamily: Config.FONT_FAMILY_BOLD,
    fontSize: 38,
    lineHeight: 38,
    color: '#2c3e50',
    fontWeight: '600',
  },
  detailUp: {
    fontFamily: Config.FONT_FAMILY_BOLD,
    fontSize: 20,
    lineHeight: 20,
    color: '#2c3e50',
    fontWeight: '600',
    marginRight: '2%',
  },
  detail2: {
    fontFamily: Config.FONT_FAMILY_BOLD,
    fontSize: RF(5.2),
    lineHeight: 41,
    color: '#fff',
    fontWeight: '600',
  },
  detailUp2: {
    fontFamily: Config.FONT_FAMILY_BOLD,
    fontSize: RF(2.0),
    lineHeight: 20,
    color: '#fff',
    fontWeight: '600',
    marginRight: '2%',
  },

});
