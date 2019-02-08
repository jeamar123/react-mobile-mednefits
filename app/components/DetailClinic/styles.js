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
    height: height / 4.5,
  },
  contentHeader: {
    flex: 1,
    height: 230,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%'
  },
  sectionDetail: {
    backgroundColor: '#7bd3f7',
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
    fontSize: 13,
    color: '#fff',
    textAlignVertical: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '5%',
  },
  Title: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 18,
    color: '#fff',
    textAlignVertical: 'top',
  },
  details: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 12,
    color: '#fff',
    textAlignVertical: 'center',
    paddingBottom: 5,
  },
  HeaderContain: {
    backgroundColor: '#1b9bda',
    width: '100%',
    height: '100%',
  },
  imageHeader: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: '3%'
  },
  statusCLinic: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 13,
    color: '#182690',
    textAlignVertical: 'center',
    paddingTop: 5,
    paddingRight: '5%',
  },
  like: {
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
    marginLeft: '4%',
    marginTop: '4%'
  }
});
