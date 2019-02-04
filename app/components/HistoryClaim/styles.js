import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;
import * as Config from '../../config';

export default EStyleSheet.create({
  sectionHeader: {
    justifyContent: 'space-between',
    backgroundColor: '#efeff5',
    height: height / 4,
  },
  contentHeader: {
    flex: 1,
    height: 230,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 14,
    color: '#fff',
    textAlignVertical: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '5%',
  },
  Title: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 32,
    color: '#000',
    textAlignVertical: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  details: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'center',
    paddingBottom: 5,
  },
  out_of_network: {
  	fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 12,
    color: '#c6c7cd',
    textAlignVertical: 'center',
    marginRight: 20,
    marginTop: '4%',
    marginBottom: 7,
    paddingRight: '3%',
    paddingLeft: '3%',
    borderColor: '#c6c7cd',
    borderWidth: 1,
    borderRadius: 5
  }
});
