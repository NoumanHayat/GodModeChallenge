import React, { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar';
import AppText from '../../components/AppText';
import { RankingItem } from '../../components/RankingItem';
import { COLORS } from '../../constants';
import { useData } from './../hooks';
import auth from '@react-native-firebase/auth';
import { View, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import { TabbedButtons } from '../../components/TabbedButtons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const RankingFragment = ({
  navigation,
  myFriendRank,
  friendRank,
  golbalRank,
  myGlobalRank,
  userDetail,
  myRankingNumber,
  myGlobalRankingNumber
}: any) => {
  const [activeTab, setActiveTab] = useState('friend');

  const buttons = [
    {
      text: 'Friend',
      id: 'friend',
      onPress: undefined
    },
    {
      text: 'Global',
      id: 'global',
      onPress: undefined
    }
  ];
  const menus = [
    {
      name: 'Invite for Challenge',
      id: 'invite'
    },
    {
      name: 'View Profile',
      id: 'profile'
    }
  ];
  function onMenuItemPress(id: string) {
    navigation.navigate('Tabs', {
      params: { action: 'showInviteNotification' },
      screen: 'Home'
    });
  }
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        borderTopColor: COLORS.gray,
        paddingTop: 20,
        borderTopWidth: 1
      }}
    >
      <AppText fontWeight="SemiBold" style={{ fontSize: 18, marginBottom: 10 }}>
        Your Ranking
      </AppText>
      {activeTab == 'friend' ? (
        <RankingItem {...userDetail} rank={myRankingNumber} />
      ) : (
        <RankingItem {...userDetail} rank={myGlobalRankingNumber} />
      )}
      <AppText fontWeight="SemiBold" style={{ fontSize: 18, marginBottom: 10, marginTop: 10 }}>
        Your Ranking
      </AppText>
      <TabbedButtons
        buttons={buttons}
        selected={activeTab}
        onTabPress={(id: string) => {
          setActiveTab(id);
        }}
      />
      <View
        style={{
          marginTop: 10,
          marginBottom: 25
        }}
      >
        {/* <SearchBar backgroudColor={COLORS.lightGray} placeholderColor={COLORS.dark} /> */}
      </View>
      <View>
        {activeTab == 'friend'
          ? friendRank?.map((fr, index: React.Key | null | undefined) => {
              return (
                <RankingItem
                  key={index}
                  rank={index + 1}
                  onMenuItemPress={(id: string) => onMenuItemPress(id)}
                  menu_items={menus}
                  {...fr}
                />
              );
            })
          : golbalRank?.map((fr, index: React.Key | null | undefined) => {
              return (
                <RankingItem
                  key={index}
                  rank={index + 1}
                  onMenuItemPress={(id: string) => onMenuItemPress(id)}
                  menu_items={menus}
                  {...fr}
                />
              );
            })}
      </View>
    </View>
  );
};

export default RankingFragment;
