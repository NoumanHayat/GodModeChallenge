import React from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../components/AppText';
import ScreenWithNavHeaderLayout from '../components/ScreenWithNavHeaderLayout';
import { COLORS } from '../constants';

const AboutScreen = ({ navigation, route }: any) => (
  <ScreenWithNavHeaderLayout navigation={navigation} title="About Us">
    <ScrollView>
      <LinearGradient
        useAngle={true}
        angle={45}
        style={{
          paddingVertical: 80,
          alignItems: 'center'
        }}
        colors={[COLORS.lightPrimary, COLORS.primary]}
      >
        <AppText fontWeight="Bold" style={{ fontSize: 24, color: COLORS.white }}>
          App logo here
        </AppText>
      </LinearGradient>
      <View style={{ marginHorizontal: 20, marginTop: 40 }}>
        <AppText fontWeight="SemiBold" style={{ fontSize: 18, marginBottom: 10 }}>
          Fitness App
        </AppText>
        <AppText style={{ fontSize: 12, lineHeight: 20 }}>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual
          form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a
          placeholder before the final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate
        </AppText>
        <AppText
          fontWeight="SemiBold"
          style={{
            fontSize: 18,

            marginBottom: 10,
            marginTop: 30
          }}
        >
          Version
        </AppText>
        <AppText style={{ fontSize: 12 }}>Lorem ipsum is a Fitness App 1.01</AppText>
      </View>
    </ScrollView>
  </ScreenWithNavHeaderLayout>
);
export default AboutScreen;
