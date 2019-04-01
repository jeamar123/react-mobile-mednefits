import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RF from "react-native-responsive-fontsize";
import * as Config from '../../config';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperTop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBottom: {
    width: "100%",
    flex: 1,
    justifyContent: 'space-between'
  },
  panelBottom: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    backgroundColor: '#E8E7EE',
    height: height / 10,
    width: width,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'helvetica',
    fontSize: 22,
    color: '#08BB08',
  },
  detail: {
    fontFamily: 'helvetica',
    fontSize: 30,
    lineHeight: 30,
    color: '#000',
    fontWeight: '600',
  },
  detailUp: {
    fontFamily: 'helvetica',
    fontSize: 17,
    lineHeight: 18,
    color: '#000',
    fontWeight: '600',
  },
  ButtonStyle: {
    marginTop: 12,
    marginLeft: 15,
    marginBottom: -15,
    height: height / 7,
    width: '90%',
    backgroundColor: '#0392cf',
    borderRadius: 14,
  },
  ButtonStyle2: {
    marginLeft: 15,
    height: height / 7,
    width: '90%',
    backgroundColor: '#626E82',
    borderRadius: 14,
  },
  sectionTextPanel: {
    alignItems: 'flex-start',
    height: '50%'
  },
  spendingActive: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#0392cf",
  },
  spendingNotactive: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 15,
    paddingLeft: 15,
    color: '#A8A8A8'
  },
  sectionComponent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textActive: {
    fontSize: RF(2.2),
    fontFamily: Config.FONT_FAMILY_MEDIUM,
    marginTop: responsiveHeight(2),
    color: '#fff',
    lineHeight: 19
  },
  textNoactive: {
    fontSize: RF(2.2),
    fontFamily: Config.FONT_FAMILY_ROMAN,
    marginTop: responsiveHeight(2),
    color: '#fff',
    opacity: 0.8,
    lineHeight: 19
  },
  textRecentActive: {
    fontSize: RF(1.6),
    fontWeight: '500',
    fontFamily: Config.FONT_FAMILY_ROMAN,
    color: '#2C3E50',
    letterSpacing: 1.5,
    lineHeight: 20
  },
  textRecentNoactive: {
    fontSize: RF(1.6),
    fontWeight: '500',
    fontFamily: Config.FONT_FAMILY_ROMAN,
    color: '#A8A8A8',
    letterSpacing: 1.5,
    lineHeight: 20
  },
  walletActive: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1.2,
    marginTop: 5,
    marginBottom: 10,
  },
  walletNotactive: {
    borderBottomColor: '#0392cf',
    borderBottomWidth: 1.2,
    marginTop: 5,
    marginBottom: 10,
  },
});
