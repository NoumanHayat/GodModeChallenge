import React from 'react';
import { ScrollView, View } from 'react-native';
import AppText from './AppText';
import { COLORS } from '../constants';
import FastImage from 'react-native-fast-image';

interface Props {
  friends: any;
}

export default function FriendsListHorizontal({ friends }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row'
      }}
    >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20
          }}
        >
          {friends?.map((friend: any, index: number) => (
            <Friend key={index} friend={friend} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Friend(friends) {
  return (
    <View
      style={{
        width: 59,
        marginRight: 20,
        alignItems: 'center'
      }}
    >
      <View
        style={{
          width: 59,
          height: 59,
          borderWidth: 3,
          borderRadius: 50,
          backgroundColor: COLORS.lightGray,
          borderColor: COLORS.primary,

          overflow: 'hidden'
        }}
      >
        <FastImage source={{ uri: friends.friend?.photoURL }} style={{ width: 59, height: 59 }} />
      </View>
      <AppText fontWeight="SemiBold" style={{ fontSize: 12, marginTop: 10, color: COLORS.dark }}>
        {friends.friend?.displayName}
      </AppText>
    </View>
  );
}
