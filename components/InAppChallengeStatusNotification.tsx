import React, {FC} from 'react';
import {View, Image} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../constants';
import {InAppNotification} from './InAppNotification';
import FastImage from 'react-native-fast-image';

interface Props {
  showNotification: Boolean;
  participants: Array<any>;
  autoHide?: Boolean;
  hideValue?: number;
}

export const InAppChallengeStatusNotification: FC<Props> = ({
  participants,
  showNotification = true,
  autoHide = true,
  hideValue = -300,
}) => {
  return (
    <InAppNotification
      hideValue={hideValue}
      autoHide={autoHide}
      showNotification={showNotification}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {participants.map((participant, index) => (
          <ChallengeParticipant key={index} {...participant} />
        ))}
      </View>
    </InAppNotification>
  );
};

const ChallengeParticipant: FC<any> = ({name, image_url, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}>
      <View style={{alignItems: 'center', marginRight: 15}}>
        <FastImage
          source={{uri: image_url}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: COLORS.gray,
          }}
        />

        <AppText
          fontWeight="Medium"
          style={{fontSize: 11, color: COLORS.primary}}>
          {name}
        </AppText>
      </View>
      <View style={{flex: 1, marginBottom: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText
            fontWeight="Medium"
            style={{fontSize: 14, color: COLORS.primary}}>
            {`${value}% `}
          </AppText>
          <AppText
            fontWeight="Medium"
            style={{fontSize: 11, color: COLORS.darkgray}}>
            Completed
          </AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 5,
            backgroundColor: COLORS.lightPrimary,
          }}>
          <View
            style={{
              height: 13,
              borderRadius: 10,
              backgroundColor: COLORS.primary,
              width: `${value}%`,
            }}></View>
        </View>
      </View>
    </View>
  );
};
