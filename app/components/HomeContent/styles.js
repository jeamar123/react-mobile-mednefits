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
    height: height / 4.2,
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
    width: width / 3.23,
    height: height / 6,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    textAlign: 'center',
    fontSize: RF(2.3),
    fontWeight: '600',
    paddingTop: 5,
    color: '#fff',
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
    fontSize: RF(1.9),
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
