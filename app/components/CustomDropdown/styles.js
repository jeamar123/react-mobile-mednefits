import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
import * as Config from '../../config';
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
  	height: 38,
  	justifyContent: 'center',
  	alignItems: 'center',
  	flexDirection: 'row',
  	width: '100%',
  	borderWidth: 1,
  	borderColor: '#fff',
  	zIndex: 10,
  },
  labelStyle: {
  	padding: 10,
  	flexDirection: 'row',
  	alignItems: 'center',
  },
  customArrow:{
  	height: 10,
  	width: 10,
  	backgroundColor: '#fff',
  	transform: [ { rotate: '45deg' } ],
  	position: 'absolute',
  	top: 50,
  	right: 18.5,
  },
  dropContainer: {
  	position: 'absolute',
  	backgroundColor: '#fff',
  	top: 55,
  	width: '100%',
  	paddingVertical: 10,
  	zIndex: 10,
  },
  selectValue: {
  	paddingHorizontal: 10,
  	paddingVertical: 5,
  	fontWeight: "normal",
  },
  dropArrowIcon: {
  	color: '#fff',
  	fontSize: 20, 
  	width: 25,
  	textAlign: 'center',
  },
  labelText: {
  	flex: 1,
  	fontWeight: "500",
  },
  textWhite: {
  	color: '#fff',
  },

});
