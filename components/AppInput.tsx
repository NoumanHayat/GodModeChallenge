import React, { ReactNode } from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextStyle,
  TextInput,
} from 'react-native';
import { COLORS } from '../constants';

interface Props {
  value?: string | undefined;
  defaultValue?: string | undefined;
  style?: TextStyle;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

export default function AppInput({
  value,
  defaultValue,
  onChange,
  style,
  onChangeText
}: Props) {
  return (
    <TextInput
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onChangeText={onChangeText}
      style={{
        fontSize: 14,
        color: COLORS.dark,
        ...style,
        fontFamily: `Poppins-Regular`,
      }}
    />
  );
}
