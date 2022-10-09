/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { TouchableNativeFeedback, View,TextInput } from 'react-native';
import AppText from './AppText';
import { COLORS, icons } from '../constants';
import FastImage from 'react-native-fast-image';

interface Props {
  placeholder?: string;
  placeholderColor?: string;
  backgroudColor?: string;
  onPress?: any;
} 

export const SearchBar: FC<Props> = ({
  placeholder = 'Search',
  backgroudColor = COLORS.lightGray,
  placeholderColor = COLORS.primary,
  onPress
}) => {
  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden'
      }}
    >
      <TouchableNativeFeedback
        onPress={onPress}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 49,
            backgroundColor: backgroudColor,
            borderColor: COLORS.primary,
            borderWidth: 1,
            borderRadius: 10,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 18
          }}
        >
          <FastImage
            source={icons.search}
            tintColor={COLORS.primary}
            style={{
              width: 18,
              height: 18,
              marginRight: 15
            }}
          />
          {/* <AppText style={{ color: placeholderColor, fontSize: 16 }}>{placeholder}</AppText> */}
          <TextInput
                  placeholder="Enter your email or phone number..."
                  onChangeText={(value) => setEmail(value)}
                  autoCapitalize={'none'}
                  style={{
                    flex: 1,
                    height: 40.5,
                    fontSize: 15,
                    marginLeft: 2
                  }}
                />
        </View>
      </TouchableNativeFeedback> 
    </View>
  );
};
