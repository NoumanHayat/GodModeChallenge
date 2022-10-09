import React, {ReactNode} from 'react';
import {View} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../constants';

interface Props {
  leftContent?: ReactNode;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function InfoCard({
  title,
  subtitle,
  leftContent,
  children,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.dark,
        borderRadius: 12,
        padding: 20,
      }}>
      <View style={{flex: 1.5}}>
        <AppText
          style={{color: COLORS.white, fontSize: 18}}
          fontWeight="Medium">
          {title}
        </AppText>
        <AppText style={{color: COLORS.white, fontSize: 14, marginTop: 5}}>
          {subtitle}
        </AppText>
        <View>{leftContent}</View>
      </View>
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
}
