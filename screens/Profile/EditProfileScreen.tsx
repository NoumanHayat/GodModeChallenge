/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import ScreenWithNavHeaderLayout from '../../components/ScreenWithNavHeaderLayout';
import { COLORS, icons, values } from '../../constants';
import { useData } from './../hooks';

const EditProfileScreen = ({ navigation, route }: any) => {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [displayName, setDisplayName] = useState(currentUser?.displayName);
  const [country, setCountry] = useState(currentUser?.country ? currentUser?.country : 'Country');
  const [dob, setDob] = useState(currentUser?.dob ? currentUser?.dob : 'mm/dd/yyyy');
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber ? currentUser?.phoneNumber : '+92300-00000000'
  );
  const [gender, setGender] = useState(currentUser?.gender ? currentUser?.gender : 'male');
  const [foot, setFoot] = useState(currentUser?.foot ? currentUser?.foot : '0');
  const [inchs, setinchs] = useState(currentUser?.inchs ? currentUser?.inchs : '0');
  const { updateProfile } = useData();
  return (
    <ScreenWithNavHeaderLayout navigation={navigation} title="Edit Profile">
      <ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior={'position'}>
          <View style={{ paddingHorizontal: 20 }}>
            <ProfileItemLayout style={{ marginTop: 20 }}>
              {/* <AppInput onChangeText={(value) => setDisplayName(value)} defaultValue={displayName} /> */}
              <AppText>{currentUser?.email}</AppText>
            </ProfileItemLayout>
            <ProfileItemLayout style={{ marginTop: 10 }}>
              <AppText>{currentUser?.displayName}</AppText>
            </ProfileItemLayout>
            <ProfileItemLayout style={{ marginTop: 10 }} icon={icons.calendar}>
              <AppInput onChangeText={(value) => setDob(value)} defaultValue={dob} />
            </ProfileItemLayout>
            <ProfileItemLayout style={{ marginTop: 10 }} icon={icons.dropdown}>
              <AppInput onChangeText={(value) => setCountry(value)} defaultValue={country} />
            </ProfileItemLayout>
            <ProfileItemLayout style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 15
                  }}
                >
                  <FastImage style={{ width: 33, height: 23 }} source={values.flag} />
                  <FastImage
                    tintColor={COLORS.dark}
                    style={{ width: 13, height: 9, marginLeft: 5 }}
                    source={icons.dropdown2}
                  />
                </View>
                <AppInput onChangeText={(value) => setPhoneNumber(value)} defaultValue={phoneNumber} />
              </View>
            </ProfileItemLayout>
            <ProfileItemLayout style={{ marginTop: 10 }} icon={icons.dropdown}>
              <AppInput onChangeText={(value) => setGender(value)} defaultValue={gender} />
            </ProfileItemLayout>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AppText style={{ flex: 1 }}>Enter your height</AppText>
              <ProfileItemLayout
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 55,
                  paddingVertical: 0
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <AppText>Foot&apos;s</AppText>
                  <AppInput
                    onChangeText={(value) => setFoot(value)}
                    defaultValue={foot}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 10,
                      shadowColor: '#00000060',
                      backgroundColor: COLORS.white,
                      shadowOffset: {
                        width: 0,
                        height: 0
                      },
                      shadowOpacity: 0.37,
                      shadowRadius: 7.49,
                      elevation: 12
                    }}
                  />
                  <AppText>Inch&apos;s</AppText>
                  <AppInput
                    onChangeText={(value) => setinchs(value)}
                    defaultValue={inchs}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 10,
                      shadowColor: '#00000060',
                      backgroundColor: COLORS.white,
                      shadowOffset: {
                        width: 0,
                        height: 0
                      },
                      shadowOpacity: 0.37,
                      shadowRadius: 7.49,
                      elevation: 12
                    }}
                  />
                </View>
              </ProfileItemLayout>
            </View>
            <AppButton
              style={{ marginTop: 40 }}
              text={'Update'}
              onPress={() => {
                updateProfile(currentUser, country, dob, phoneNumber, gender, foot, inchs)
                  .then((e: any) => {
                    navigation.goBack();
                  })
                  .catch((e: any) => {
                    alert(e);
                  });
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenWithNavHeaderLayout>
  );
};
export default EditProfileScreen;

const ProfileItemLayout = ({ children, style, icon }: any) => (
  <View
    style={{
      height: 62,
      paddingHorizontal: 15,
      flexDirection: 'row',
      shadowColor: '#00000060',
      backgroundColor: COLORS.white,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      marginBottom: 10,
      alignItems: 'center',
      ...style
    }}
  >
    <View style={{ flex: 1 }}>{children}</View>
    {icon && (
      <View
        style={{
          backgroundColor: COLORS.lightPrimary,
          height: 36,
          width: 36,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20
        }}
      >
        <FastImage tintColor={COLORS.primary} style={{ width: 20, height: 20 }} source={icon} />
      </View>
    )}
  </View>
);
