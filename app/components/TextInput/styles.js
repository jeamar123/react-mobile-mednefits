import EStyleSheet from 'react-native-extended-stylesheet';
import * as Config from '../../config';

const INPUT_HEIGHT = 70;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    width: '80%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11,
  },
  input: {
    fontFamily: Config.FONT_FAMILY_LIGHT,
    flex: 1,
    height: 48,
    paddingHorizontal: 8,
    color: '$inputText',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb'
  },
  containerPay: {
    backgroundColor: '$white',
    width: '35%',
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11,
  },
  inputPay: {
    fontFamily: Config.FONT_FAMILY_LIGHT,
    flex: 1,
    height: INPUT_HEIGHT,
    paddingHorizontal: 8,
    color: '$inputText',
    fontSize: 46,
    width: '80%'
  },
});
