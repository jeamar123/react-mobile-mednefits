import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sliderView: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'green',
    height: 50,
    width: Dimensions.width,
    position: 'absolute',
  },
  slider: {
    bottom: 0,
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    width: 200,
  },

  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
export default styles;
