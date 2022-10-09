import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  containerGradient: { flex: 1, padding: 20 },
  mainView: { flex: 1, justifyContent: 'center' },
  itemsCentered: {
    alignItems: 'center'
  },
  imageSize: { width: 250, height: 250 },
  sliderContainer: { width: 120, flexDirection: 'row', marginTop: 30 },
  title: { color: COLORS.white, fontSize: 20, marginTop: 30 },
  text: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20
  }
});

export default styles;
