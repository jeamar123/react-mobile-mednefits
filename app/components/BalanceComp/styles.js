import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#0392cf",
  },
  spendingNotactive: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  sectionComponent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
});
