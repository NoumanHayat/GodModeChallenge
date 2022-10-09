import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {COLORS, icons} from '../constants';
import AppText from './AppText';

export default function ScreenHeader({navigation, title}: any) {
  return (
    <View
      style={{
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          height: 45,
          width: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={icons.back}
          style={{
            tintColor: COLORS.dark,
            height: 20,
            width: 20,
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          marginLeft: -45,
        }}>
        <AppText
          fontWeight="Bold"
          style={{fontSize: 18, color: COLORS.primary}}>
          {title}
        </AppText>
      </View>
      <View></View>
    </View>
  );
}
