import React, {FC, ReactNode} from 'react';
import {View} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../constants';

interface Props {
  text: string;
}

export const ExcersiseInfoTags: FC<Props> = ({text}) => {
  return (
    <View
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 30,
      }}>
      <AppText
        style={{color: COLORS.primary, fontSize: 14}}
        fontWeight="Medium">
        {text}
      </AppText>
    </View>
  );
};
