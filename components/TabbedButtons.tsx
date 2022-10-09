import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { COLORS } from '../constants';
import LinearGradient from 'react-native-linear-gradient';

interface Button {
  text: string;
  onPress: any;
  id: string;
}

interface TabButton extends Button {
  selected: string;
}

interface Props {
  buttons: Array<Button>;
  selected: string;
  onTabPress: any;
}

export const TabbedButtons: FC<Props> = ({ buttons, onTabPress, selected }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGray,
        height: 60,
        borderRadius: 100
      }}
    >
      {buttons.map((button: Button, index: number) => (
        <TabButton key={index} {...button} onPress={onTabPress} selected={selected} />
      ))}
    </View>
  );
};

const TabButton: FC<TabButton> = ({ text, onPress, id, selected }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(id);
      }}
      style={{
        flex: 1,
        padding: 10
      }}
    >
      <LinearGradient
        angle={90}
        useAngle={true}
        colors={
          id === selected
            ? [COLORS.lightPrimary, COLORS.primary, COLORS.primary]
            : [COLORS.transparent, COLORS.transparent]
        }
        style={{
          height: 20,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 100,
          justifyContent: 'center'
        }}
      >
        <AppText
          fontWeight={id === selected ? 'Medium' : 'Regular'}
          style={{
            fontSize: 16,
            color: id === selected ? COLORS.white : COLORS.dark
          }}
        >
          {text}
        </AppText>
      </LinearGradient>
    </TouchableOpacity>
  );
};
