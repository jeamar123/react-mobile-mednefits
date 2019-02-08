import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  sectionHeader: {
    justifyContent: 'space-between',
    backgroundColor: '#dbdbdb',
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
  textHeader: {
    fontFamily: 'HelveticaNeue-Bold',
    textAlign: 'center', // <-- the magic
    fontSize: 26,
  },
  text: {
    fontFamily: 'helvetica',
    textAlign: 'center', // <-- the magic
    fontSize: 20,
  },
  sectionDetail: {
    backgroundColor: '#666666',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  amount: {
    fontFamily: 'helvetica',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlignVertical: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: '5%',
  },
  detail: {
    fontFamily: 'helvetica',
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlignVertical: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '5%',
  },
});
