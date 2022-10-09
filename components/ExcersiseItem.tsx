import React, {ReactNode} from 'react';
import {View} from 'react-native';
import AppText from './AppText';
import {COLORS, icons} from '../constants';
import FastImage from 'react-native-fast-image';

interface Props {
  title?: string;
  subtitle?: string;
  image: any;
  isDone: boolean;
}

export default function ExcersiseItem({title, isDone, subtitle, image}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        borderRadius: 6,
        marginTop: 12,
        marginBottom: 12,
        overflow: 'hidden',
      }}>
      <View style={{width: 115, height: 115}}>
        <FastImage
          style={{width: 115, height: 115, backgroundColor: COLORS.gray}}
          source={image}
        />
      </View>
      <View style={{flex: 1, padding: 20}}>
        <AppText
          fontWeight="SemiBold"
          style={{fontSize: 16, color: COLORS.black}}>
          {title}
        </AppText>
        <AppText style={{fontSize: 16, color: COLORS.grayText}}>
          {subtitle}
        </AppText>
      </View>
      {isDone && (
        <View
          style={{
            width: 20,
            position: 'absolute',
            right: 5,
            top: 5,
            height: 20,
            backgroundColor: COLORS.green,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            tintColor={COLORS.white}
            style={{
              width: 12,
              height: 12,
            }}
            source={icons.check}
          />
        </View>
      )}
    </View>
  );
}
