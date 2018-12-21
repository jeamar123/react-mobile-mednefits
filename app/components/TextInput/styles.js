import EStyleSheet from 'react-native-extended-stylesheet';

const INPUT_HEIGHT = 48;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    width: '100%',
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11,
  },
  input: {
    fontFamily: 'helvetica',
    flex: 1,
    height: INPUT_HEIGHT,
    paddingHorizontal: 8,
    color: '$inputText',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
});
