import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  sectionComponent: {
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 25,
  },
  sectionSpending: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginLeft: "5%",
    marginRight: "5%",
  },
  dividerDetail: {
    padding: 8,
    backgroundColor: "#EFEFF4"
  },
  sectionTitleComponent: {
    backgroundColor: "#CECED0"
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#919191'
  },
  detailsTitle: {
    fontSize: 8,
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#919191",
    marginLeft: '3%'
  },
  spendingActive: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#0392cf",
    alignItems: 'center'
  },
  spendingNotactive: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#dbdbdb",
    alignItems: 'center'
  },
  inputClaimType: {
    fontSize: 16,
    color: 'black',
    width: "100%"
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  fieldStyleNoPadding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
