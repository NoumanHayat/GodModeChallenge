import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS, values } from '../../constants';
import { StatusBar, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import AppText from '../../components/AppText';
import LinearGradient from 'react-native-linear-gradient';
import styles from './AfterLoadSplashScreen.styles';

const slides: { key: string; title: string; text: string; image: Source; backgroundColor: string }[] = [
  {
    key: 'one',
    title: 'God Mode Challenge',
    text: "You think you are fit and what to test your limits?\n\nMaybe you've been told about this and want to give it a go?",
    image: values.splash_image,
    backgroundColor: '#59b2ab'
  },
  {
    key: 'two',
    title: 'Are you SURE?',
    text: 'Go ahead, but beware: this is not easy!! (wel, maybe at first...)',
    image: values.splash_image,
    backgroundColor: '#febe29'
  },
  {
    key: 'three',
    title: 'Bring the PAIN!',
    text: 'I take it YOU ARE READY!!\n\n(and you are refusing the possibility to blame me for anything!)',
    image: values.splash_image,
    backgroundColor: '#22bcb5'
  }
];

type AfterLoadSplashScreenProps = { onGetStarted: () => void };
const AfterLoadSplashScreen = ({ onGetStarted }: AfterLoadSplashScreenProps): JSX.Element => {
  const renderStep = ({ item }: { item: typeof slides[number] }): JSX.Element => (
    <LinearGradient
      style={styles.containerGradient}
      useAngle={true}
      angle={90}
      colors={[COLORS.lightPrimary, COLORS.primary, COLORS.primary, COLORS.lightPrimary]}
    >
      <View style={styles.mainView}>
        <StatusBar backgroundColor={COLORS.primary} />
        <View style={styles.itemsCentered}>
          <FastImage source={item.image} style={styles.imageSize} />
          <View style={styles.sliderContainer}>
            {slides.map((s) => (
              <View
                key={`slide_mark_${s.key}`}
                style={{
                  flex: s.key === item.key ? 2 : 1,
                  backgroundColor: s.key === item.key ? COLORS.white : COLORS.gray,
                  marginHorizontal: 2,
                  height: 7,
                  borderRadius: 5
                }}
              />
            ))}
          </View>
          <AppText style={styles.title} fontWeight="SemiBold">
            {item.title}
          </AppText>
          <AppText style={styles.text}>{item.text}</AppText>
        </View>
      </View>
    </LinearGradient>
  );

  return <AppIntroSlider renderItem={renderStep} data={slides} onDone={onGetStarted} showPrevButton showSkipButton />;
};

export default AfterLoadSplashScreen;
