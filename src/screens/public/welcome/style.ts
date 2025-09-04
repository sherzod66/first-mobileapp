import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  circle: {
    width: 7.7,
    height: 7.7,
    marginLeft: 6,
    borderRadius: 12,
  },
  bgLight1: {
    backgroundColor: COLORS.GREY,
  },
  bgLight2: {
    backgroundColor: COLORS.WHITE,
  },
  main: {},
  bottom: {
    alignItems: 'center',
    marginTop: 10,
  },
  imageBack: {
    width: Width,
    height: Height / 1.5,
    justifyContent: 'flex-end',
  },
  imageBackMy: {
    width: Width,
    height: Height,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: COLORS.RED,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    color: COLORS.WHITE,
  },
  textOne: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  fit: {
    color: COLORS.RED2,
    fontSize: 15,
    fontWeight: 'bold',
  },
  me: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textImage: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: '400',
  },
});
