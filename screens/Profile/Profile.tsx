import React, { useRef, useState } from 'react';
import { Alert, ScrollView, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import { TabScreenHeader } from '../../components/TabScreenHeader';
import { COLORS, icons, values } from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useData } from './../hooks';
import auth from '@react-native-firebase/auth';

const Profile = ({ navigation, route }: any) => {
  const refRBSheet: any = useRef();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { currentUser } = useData();

  const profileItems = [
    {
      title: 'Edit Profile',
      icon: icons.profile2,
      type: 'screen',
      id: 'edit_profile',
      screen: 'EditProfileScreen'
    },
    {
      title: 'Dark Theme',
      icon: icons.eye,
      type: 'shitch',
      id: 'theme_switch'
    },
    {
      title: 'Notification',
      icon: icons.notification2,
      type: 'screen',
      id: 'notification',
      screen: 'NotificationsScreen'
    },
    {
      title: 'Help',
      icon: icons.help,
      type: 'screen',
      id: 'help',
      screen: 'HelpScreen'
    },
    {
      title: 'About ',
      icon: icons.about,
      type: 'screen',
      id: 'about ',
      screen: 'AboutScreen'
    }
  ];

  const onProfileItemPress = (payload: any) => {
    if (payload.type === 'screen') {
      navigation.navigate(payload.screen);
    } else {
      setIsDarkTheme(!isDarkTheme);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <TabScreenHeader title="My Profile" />
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            padding: 10,
            backgroundColor: COLORS.lightPrimary,
            borderRadius: 10,
            marginTop: 20
          }}
        >
          <FastImage
            source={{ uri: auth().currentUser ? auth().currentUser.photoURL : values.userProfilePic }}
            style={{
              width: 65,
              height: 65,
              borderRadius: 35,
              backgroundColor: COLORS.lightGray,
              marginRight: 20
            }}
          />
          <View>
            <AppText fontWeight="Medium" style={{ fontSize: 18, color: COLORS.dark }}>
              {auth()?.currentUser ? auth().currentUser.displayName : 'Guest'}
            </AppText>
            <AppText style={{ fontSize: 12 }}> {auth().currentUser ? auth().currentUser.email : 'Guest'}</AppText>
          </View>
        </View>
        <View
          style={{
            width: '80%',
            height: 1,
            backgroundColor: COLORS.gray,
            alignSelf: 'center',
            marginTop: 25,
            marginBottom: 25
          }}
        />
        <View style={{ marginHorizontal: -20 }}>
          {profileItems.map((item: any, index: number) => (
            <ProfileItem
              key={index}
              {...item}
              isDarkTheme={isDarkTheme}
              onPress={(payload: any) => {
                onProfileItemPress(payload);
              }}
            />
          ))}
        </View>
        <View style={{ marginTop: 60 }}>
          <AppButton
            text={'Log Out'}
            textStyle={{ color: COLORS.primary }}
            style={{ backgroundColor: COLORS.lightPrimary }}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask
        height={380}
        customStyles={{
          container: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50
          }
        }}
      >
        <View>
          <AppText
            fontWeight="SemiBold"
            style={{
              fontSize: 20,
              marginTop: 20,
              alignSelf: 'center',
              color: COLORS.red
            }}
          >
            Logout
          </AppText>
          <View
            style={{
              width: '85%',
              height: 1,
              backgroundColor: COLORS.gray,
              alignSelf: 'center',
              marginTop: 25,
              marginBottom: 15
            }}
          />
          <AppText style={{ fontSize: 16, alignSelf: 'center', marginBottom: 30 }}>
            Are you sure you want to log out?
          </AppText>
          <View style={{ paddingHorizontal: 40 }}>
            <AppButton
              text={'Yes, Logout'}
              onPress={() => {
                refRBSheet.current.close();
                auth()
                  .signOut()
                  .then(
                    function (e) {
                      navigation.navigate('SignIn');
                    },
                    function (error) {
                      Alert.alert('Sign Out Error');
                    }
                  );
              }}
            />
            <AppButton
              text={'Cancel'}
              textStyle={{ color: COLORS.primary }}
              style={{ backgroundColor: COLORS.lightPrimary, marginTop: 20 }}
              onPress={() => {
                refRBSheet.current.close();
              }}
            />
          </View>
        </View>
      </RBSheet>
    </ScrollView>
  );
};
export default Profile;

const ProfileItem = ({ title, icon, type, screen, isDarkTheme, id, onPress }: any) => (
  <TouchableHighlight
    underlayColor={'#00000008'}
    onPress={() => {
      onPress({ screen, type });
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
        paddingHorizontal: 20
      }}
    >
      <View
        style={{
          height: 27,
          width: 27,
          borderRadius: 9,
          backgroundColor: COLORS.lightPrimary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20
        }}
      >
        <FastImage tintColor={COLORS.primary} source={icon} style={{ height: 16, width: 16 }} />
      </View>
      <AppText style={{ flex: 1, fontSize: 15, color: COLORS.dark }}>{title}</AppText>
      <View>
        {type === 'screen' ? (
          <FastImage tintColor={COLORS.dark} style={{ height: 14, width: 14 }} source={icons.right_arrow} />
        ) : (
          <SlideSwitch isActive={isDarkTheme} />
        )}
      </View>
    </View>
  </TouchableHighlight>
);

const SlideSwitch = ({ isActive }: any) => (
  <View
    style={{
      height: 19,
      width: 38,
      backgroundColor: isActive ? COLORS.lightPrimary : COLORS.gray,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <View
      style={{
        width: 26,
        height: 19,

        justifyContent: 'center'
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: isActive ? undefined : 0,
          right: isActive ? 0 : undefined,
          width: 11,
          height: 11,
          borderRadius: 6,
          backgroundColor: isActive ? COLORS.primary : COLORS.white
        }}
      />
    </View>
  </View>
);
