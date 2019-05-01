import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Left } from 'native-base';
const { width, height } = Dimensions.get('window');
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    paddingTop: '4.3%',
    paddingBottom: '4.3%',
    backgroundColor: "#EFEFF4",
  },
  stepContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bulletActive: {
    backgroundColor: '#fff',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderWidth: 2,
    borderColor: "#0392cf",
    borderRightColor: 'black',
    borderRightWidth: 2,
  },
  bulletNotActive: {
    backgroundColor: '#CECED0',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  line: {
    backgroundColor: 'red',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
});
