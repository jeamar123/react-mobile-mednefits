import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;
import * as Config from '../../config';

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    backgroundColor: '#0392cf',
    height: height / 3.8,
    width: width,
    alignItems: 'center',
  },
  sectionSearch: {
    backgroundColor: '#0392cf',
    height: 80,
    width: width,
    alignItems: 'center',
  },
  contain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  gridBox: {
    // width: width / 3.23,
    width: width / 4.23,
    height: height / 6,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    textAlign: 'center',
    // fontSize: RF(2.3),
    fontSize: RF(2.1),
    fontWeight: '600',
    paddingTop: 5,
    color: '#fff',
  },
  titleRegister: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    textAlign: 'center',
    // fontSize: RF(2.3),
    fontSize: RF(2.1),
    fontWeight: '600',
    paddingTop: 5,
    color: '#fff',
    marginLeft: 5,
  },
  searchtext: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
  detail: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    textAlign: 'center',
    fontSize: RF(1.7),
    color: '#fff',
  },
  DrawerContain: {
    backgroundColor: '#0392cf',
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 5,
    color: '#fff',
  },
});
