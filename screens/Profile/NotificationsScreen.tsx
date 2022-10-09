/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { SectionList, Text, TouchableNativeFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppText from '../../components/AppText';
import { InAppChallengeInviteNotificationComponent } from '../../components/InAppChallengeInviteNotificationComponent';
import ScreenWithNavHeaderLayout from '../../components/ScreenWithNavHeaderLayout';
import { COLORS, values } from '../../constants';
import { useData } from '.././hooks';

const NotificationsScreen = ({ navigation, route }: any) => {
  const notificationsData = [
    {
      title: 'Today',
      data: [
        {
          title: 'Biginner',
          type: 'invite'
        }
      ]
    },
    {
      title: 'Yesterday',
      data: [
        {
          title: 'New Workout is Available!',
          subtitle: 'Check now and practice',
          type: 'info'
        },
        {
          title: 'New Features are Available',
          subtitle: 'You can now set exercise reminder',
          type: 'info'
        }
      ]
    },
    {
      title: 'May 24, 2022',
      data: [
        {
          title: 'Verification Successful',
          subtitle: 'Account verification completed',
          type: 'info'
        },
        {
          title: 'New Features are Available',
          subtitle: 'You can now set exercise reminder',
          type: 'info'
        }
      ]
    }
  ];
  const { notification,addFriends } = useData();
  const [notificationData, setNotificationData] = useState(notificationsData);
  useEffect(() => {
    async function fetchData() {
      const noti = await notification();
      setNotificationData(noti);
    }
    fetchData();
  }, []);

  return (
    <ScreenWithNavHeaderLayout navigation={navigation} title="Notifications">
      {notificationData.map((item, index) =>{ return(<Item key={index} navigation={navigation} title={item?.title} photoUrl={item?.frinedPhotos} friendName={item?.friendName}  subtitle={item?.subtitle} type={item?.type} friendId={item?.friendId} />)})}
    </ScreenWithNavHeaderLayout>
  )
};
export default NotificationsScreen;

type Props = {
  title: string;
  subtitle?: string;
  type: string;
};

const Item = ({ title, subtitle, type ,photoUrl,friendName,friendId ,navigation}) => {
  const { notification,addFriends } = useData();

  switch (type) {
    case 'info':
      return (
        <View
          style={{
            marginBottom: 20,
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: COLORS.lightGray
          }}
        >
          <AppText fontWeight="SemiBold" style={{ fontSize: 14 }}>
            {title}
          </AppText>
          <AppText style={{ fontSize: 14, marginTop: 10 }}>{subtitle}</AppText>
        </View>
      );

    case 'invite':
      return (
        <View
          style={{
            margin: 24,
            padding: 10,
            shadowColor: '#00000060',
            backgroundColor: COLORS.white,
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 12,
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <FastImage
              source={{ uri: photoUrl }}
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
                {friendName}
              </AppText>
            </View>
            <View>
              <NotificationButton
                onPress={() => {
                  addFriends(friendId);
                  alert("Friend accepted");
                  // eslint-disable-next-line react/prop-types
                  navigation.push('Tabs')
                }}
                text="Accept" style={undefined} />
              <NotificationButton
                onPress={() => {
                  console.log("Invited you for Challenge!");
                }}
                text="Decline"
                type="secondary"
                style={{ marginTop: 8 }}
              />
            </View>
          </View>
        </View>
      );
  }
  return null;
};

const NotificationButton = ({ type = 'primary', onPress, text, style }) => {
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