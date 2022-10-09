import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {COLORS} from '../constants';
import ScreenHeader from './ScreenHader';

export default function ScreenWithNavHeaderLayout({
  navigation,
  children,
  title,
}: any) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <ScreenHeader navigation={navigation} title={title} />
        <View style={{flex: 1}}>{children}</View>
      </View>
    </SafeAreaView>
  );
}
