import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    flex: 1,
    margin: '5%'
  },
  sectionComponent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spendingActive: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#0392cf",
  },
  spendingNotactive: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  inputClaimType: {
    fontSize: 16,
    color: 'black',
    width: "100%"
  }
});
