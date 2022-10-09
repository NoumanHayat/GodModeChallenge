import React from 'react';
import {TextStyle, View, ViewStyle, TouchableHighlight} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../constants';
import FastImage, {ImageStyle} from 'react-native-fast-image';

interface Props {
  text: string;
  icon?: any;
  onPress: any;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
}

export default function AppButton({
  text,
  icon,
  onPress,
  style,
  textStyle,
  iconStyle,
}: Props) {
  return (
    <View
      style={{
        overflow: 'hidden',
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        ...style,
      }}>
      <TouchableHighlight
        underlayColor={'#00000008'}
        onPress={() => {
          onPress();
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 35,
            paddingVertical: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText
            fontWeight="Medium"
            style={{color: COLORS.white, fontSize: 14, ...textStyle}}>
            {text}
          </AppText>
          {icon && (
            <FastImage
              source={icon}
              tintColor={COLORS.primary}
              style={{
                width: 12,
                height: 12,
                marginLeft: 10,
                ...iconStyle,
              }}
            />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
}
