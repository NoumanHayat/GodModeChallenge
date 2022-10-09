import React from 'react';
import { StatusBar, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { COLORS, values } from '../constants';

type AfterLoadSplashScreenProps = { onGetStarted: () => void };
const AfterLoadSplashScreen = ({ onGetStarted }: AfterLoadSplashScreenProps): JSX.Element => (
  <LinearGradient
    style={{ flex: 1, padding: 20 }}
    useAngle={true}
    angle={60 * 1.5}
    colors={[COLORS.lightPrimary, COLORS.primary, COLORS.primary, COLORS.lightPrimary]}
  >
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <FastImage source={values.splash_image} style={{ width: 250, height: 250 }} />
        <View style={{ width: 120, flexDirection: 'row', marginTop: 30 }}>
          <View
            style={{
              flex: 2,
              backgroundColor: COLORS.white,
              marginHorizontal: 2,
              height: 7,
              borderRadius: 5
            }}
          />
          <View
            style={{
              flex: 1.3,
              backgroundColor: COLORS.lightPrimary,
              marginHorizontal: 2,
              height: 7,
              borderRadius: 5
            }}
          />
          <View
            style={{
              flex: 2,
              backgroundColor: COLORS.lightPrimary,
              marginHorizontal: 2,
              height: 7,
              borderRadius: 5
            }}
          />
        </View>
        <AppText style={{ color: COLORS.white, fontSize: 20, marginTop: 30 }} fontWeight="SemiBold">
          God Mode Challenge
        </AppText>
        <AppText
          style={{
            color: COLORS.white,
            fontSize: 14,
            textAlign: 'center',
            marginTop: 20
          }}
        >
          You think you are fit and what to test your limits?
        </AppText>
        <AppText
          style={{
            color: COLORS.white,
            fontSize: 14,
            textAlign: 'center',
            marginTop: 20
          }}
        >
          Maybe you've been told about this and want to give it a go?
        </AppText>

        <AppButton
          onPress={onGetStarted}
          text="Get Started"
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            marginTop: 40
          }}
          textStyle={{ color: COLORS.primary, letterSpacing: 2 }}
        />
      </View>
    </View>
  </LinearGradient>
);

export default AfterLoadSplashScreen;
