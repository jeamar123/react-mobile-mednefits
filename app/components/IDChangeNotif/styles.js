import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    // alignItems: 'flex-start',
  },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 115,
    marginLeft: -35,
    marginRight: -35,
    marginBottom: 20,
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    width: '82%',
    paddingRight: 10,
  },
  leftImage: {
    width: '50%', 
    // height: 28, 
    resizeMode: 'contain',
  },
  textInfo: {
    fontFamily: 'helvetica',
    fontSize: 14,
    color: '#fff',
  },
  textItemBreak: {
    lineHeight: 5,
  },
  textItem: {
    
  },
  textItem2: {
    
  },
  textItem3: {
    color: '#338BC2',
    textDecorationLine: 'underline'
  },
});
