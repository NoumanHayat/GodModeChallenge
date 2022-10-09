import React, {ReactNode} from 'react';
import {View} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../constants';
import {TabScreenHeader} from './TabScreenHeader';

interface Props {
  title: string;
}

export default function SectionHeader({title}: Props) {
  return (
    <View style={{marginBottom: 20}}>
      <AppText style={{color: COLORS.dark, fontSize: 18}} fontWeight="Medium">
        {title}
      </AppText>
    </View>
  );
}
