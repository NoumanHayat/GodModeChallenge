import React, {ReactNode} from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import AppText from './AppText';
import {COLORS, theme, icons} from '../constants';
import FastImage from 'react-native-fast-image';

interface Props {
  text: string;
  icon?: any;
  onPress: any;
  style?: any;
}

export default function AppCardButton({text, icon, onPress, style}: Props) {
  return (
    <View
      style={{
        overflow: 'hidden',
        alignSelf: 'baseline',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 5,
        ...style,
      }}>
      <TouchableHighlight underlayColor={'#00000028'} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText fontWeight="Bold" style={{color: COLORS.dark, fontSize: 12}}>
            {text}
          </AppText>
          {icon && (
            <FastImage
              source={icon}
              style={{
                width: 12,
                height: 12,
                tintColor: COLORS.primary,
                marginLeft: 10,
              }}
            />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
}
