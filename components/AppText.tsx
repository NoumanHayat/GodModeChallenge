import React, {ReactNode} from 'react';
import {Text, TextStyle} from 'react-native';
import {COLORS} from '../constants';

interface Props {
  children?: ReactNode;
  style?: TextStyle;
  fontWeight?:
    | 'Regular'
    | 'BoldItalic'
    | 'Italic'
    | 'Medium'
    | 'SemiBold'
    | 'Bold'
    | 'MediumItalic'
    | 'Regular';
}

export default function AppText({
  children,
  style,
  fontWeight = 'Regular',
}: Props) {
  return (
    <Text
      style={{
        fontSize: 14,
        color: COLORS.dark,
        ...style,
        fontFamily: `Poppins-${fontWeight}`,
      }}>
      {children}
    </Text>
  );
}
