import React, { FC } from 'react';
import { TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import AppText from './AppText';
import { COLORS } from '../constants';
import FastImage from 'react-native-fast-image';

interface Props {
  name: string;
  image_url: string;
  onButtonPress?: Function;
}

export const InAppChallengeInviteNotificationComponent: FC<Props> = ({ name, image_url, onButtonPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <FastImage
        source={{ uri: image_url }}
        style={{
          width: 65,
          height: 65,
          borderRadius: 35,
          backgroundColor: COLORS.gray,
          marginRight: 10
        }}
      />
      <View style={{ flex: 1 }}>
        <AppText fontWeight="Medium" style={{ fontSize: 14 }}>
          {`${name} Invited you for Challenge`}
        </AppText>
      </View>
      <View>
        <NotificationButton
          onPress={() => {
            onButtonPress ? onButtonPress('accept') : null;
          }}
          text="Accept"
        />
        <NotificationButton
          onPress={() => {
            onButtonPress ? onButtonPress('decline') : null;
          }}
          text="Decline"
          type="secondary"
          style={{ marginTop: 8 }}
        />
      </View>
    </View>
  );
};

interface NotificationButton {
  type?: 'primary' | 'secondary';
  text: string;
  onPress?: Function;
  style?: ViewStyle;
}

const NotificationButton: FC<NotificationButton> = ({ type = 'primary', onPress, text, style }) => {
  return (
    <View
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        ...style
      }}
    >
      <TouchableNativeFeedback
        onPress={() => (onPress ? onPress() : null)}
        style={{ borderRadius: 5, overflow: 'hidden' }}
      >
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            backgroundColor: type === 'primary' ? COLORS.primary : COLORS.lightPrimary
          }}
        >
          <AppText
            style={{
              fontSize: 14,
              color: type === 'primary' ? COLORS.white : COLORS.primary
            }}
          >
            {text}
          </AppText>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
