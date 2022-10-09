import React, {FC, ReactNode} from 'react';
import {View} from 'react-native';
import AppText from './AppText';
import {COLORS, icons} from '../constants';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  ritghContent?: ReactNode;
}

export const TabScreenHeader: FC<Props> = ({title, ritghContent}) => {
  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: 33,
            width: 33,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
            marginRight: 10,
          }}>
          <LinearGradient
            colors={[COLORS.lightPrimary, COLORS.primary, COLORS.primary]}
            angle={90}
            useAngle={true}>
            <View
              style={{
                height: 33,
                width: 33,
                alignContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.dumbbell}
                  tintColor={COLORS.white}
                  style={{width: 18, height: 18}}
                />
              </View>
            </View>
          </LinearGradient>
        </View>
        <AppText style={{color: COLORS.dark, fontSize: 22}} fontWeight="Bold">
          {title}
        </AppText>
      </View>
      <View>{ritghContent}</View>
    </View>
  );
};
