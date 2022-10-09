/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, ScrollView, TouchableHighlight, View, TouchableNativeFeedback, TextInput, Text, Pressable, Modal, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppCardButton from '../components/AppCardButton';
import AppText from '../components/AppText';
import InfoCard from '../components/InfoCard';
import { COLORS, icons, theme, values } from '../constants';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CountUp } from 'use-count-up';
import SectionHeader from '../components/SectionHeader';
import BarStats from '../components/BarStats';
import FriendsListHorizontal from '../components/FriendsListHorizontal';
import FastImage from 'react-native-fast-image';
import { SearchBar } from '../components/SearchBar';
import { useData } from './hooks';
import auth from '@react-native-firebase/auth';
import { InAppNotification } from '../components/InAppNotification';
// import { InAppChallengeInviteNotificationComponent } from '../components/InAppChallengeInviteNotificationComponent';

// import { TouchableOpacity } from 'react-native-gesture-handler';

const friends_list = (data: any) => {
  return (
    <View>
      <Text>{data?.data.displayName}</Text>
    </View>
  )
}
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


const HomeScreen = ({ route, navigation }: any) => {


  const [profile_pic, setProfilePic] = useState(values.userProfilePic);
  const [isHellDay, setIsHellDay] = useState(false);
  const [today_reached, setTodayReached] = useState(57);
  const animationDuration = 2000;
  const { addXP, getFriends, findFriends, searchFriends, sendFriendRequest } = useData();
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [friends, setFriends] = useState([]);
  const [findFriend, setFindFriend] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [friendData, setFriendData] = useState([])
  const params = route.params;
  useEffect(() => {
    async function fetchData() {
      if (params?.action) {
        simulateActions(params.action);
      }
      getFriends().then((friend: any) => {
        friend?.data?setFriends(friend?.data):[]
      });

      findFriends().then((friend: any) => {
        
        friend?.data?setFindFriend(friend?.data):[]
         setFindFriend(friend?.data);
      });

    }
    fetchData();
  }, [params]);

  const simulateActions = (action: string) => {
    switch (action) {
      case 'showInviteNotification':
        DeviceEventEmitter.emit('showInviteNotification', null);
        break;

      case 'finished':
        setIsHellDay(true);
        break;

      case 'finished_hell_day':
        setIsHellDay(false);
        break;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
      <View
        style={{
          padding: theme.SIZES.screenPadding
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
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
                borderColor: COLORS.dark,
                marginRight: 15,
                overflow: 'hidden'
              }}
            >
              <FastImage
                source={{
                  uri: currentUser ? currentUser.photoURL : values.userProfilePic
                }}
                style={{ width: 59, height: 59 }}
              />
            </View>
            <View>
              <AppText style={{ color: COLORS.primary }}>Hello, Good Morning</AppText>
              <AppText fontWeight="Medium" style={{ fontSize: 20, color: COLORS.dark, fontWeight: '500' }}>
                {currentUser
                  ? currentUser.displayName
                  : () => {
                    return 'guest';
                  }}
              </AppText>
            </View>
          </View>
          <TouchableHighlight
            underlayColor={'#00000028'}
            onPress={() => {
              navigation.push('NotificationsScreen');
            }}
            style={{
              height: 33,
              width: 33,
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: COLORS.white
            }}
          >
            <LinearGradient colors={[COLORS.lightPrimary, COLORS.primary, COLORS.primary]} angle={90} useAngle={true}>
              <View
                style={{
                  height: 33,
                  width: 33,
                  alignContent: 'center'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FastImage source={icons.notification} tintColor={COLORS.white} style={{ width: 18, height: 18 }} />
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: COLORS.secondary,
                      borderWidth: 2,
                      borderColor: COLORS.white,
                      position: 'absolute',
                      top: 8,
                      right: 7
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableHighlight>
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          {/* <SearchBar />  */}
          <View
            style={{
              flex: 1,
              overflow: 'hidden'
            }}
          >
            <TouchableNativeFeedback
              // onPress={() => { console.log('ok') }}
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  height: 49,
                  backgroundColor: COLORS.lightGray,
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
                  onEndEditing={(value) => {
                    searchFriends(value.nativeEvent.text).then((data: any) => {

                      setModalVisible(true)
                      friends_list(data)
                      setFriendData(data.data)
                    }).catch((error: any) => { console.log(error) });
                  }}
                  autoCapitalize={'none'}
                  style={{
                    flex: 1,
                    height: 40.5,
                    fontSize: 15,
                    marginLeft: 2,
                    color: 'black'
                  }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          {/* <SearchBar />  */}
          {/* <View>
            <InAppChallengeInviteNotification {...values.invite} />
           

          </View> */}
        </View>
        <View style={{ marginTop: 20, marginBottom: 25 }}>
          <InfoCard
            title="Today's Exercises"
            subtitle="You tried 5 times!"
            leftContent={
              <View style={{}}>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignSelf: 'baseline',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <CircularProgress
                      value={today_reached}
                      showProgressValue={false}
                      radius={25}
                      duration={animationDuration}
                      rotation={-20}
                      inActiveStrokeColor={COLORS.white}
                      activeStrokeColor={COLORS.secondary}
                      progressValueColor={COLORS.white}
                      inActiveStrokeOpacity={1}
                      activeStrokeWidth={10}
                      inActiveStrokeWidth={5}
                    />
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute'
                      }}
                    >
                      <AppText
                        fontWeight="Medium"
                        style={{
                          fontSize: 10
                        }}
                      >
                        <CountUp
                          isCounting
                          easing={'easeInCubic'}
                          end={today_reached}
                          duration={animationDuration / 1000}
                        />
                        %
                      </AppText>
                    </View>
                  </View>
                  <AppText style={{ color: COLORS.white, fontSize: 12 }}>57% Reached</AppText>
                </View>
                <AppCardButton
                  style={{ marginTop: 10 }}
                  text={'Start Exercise'}
                  onPress={() => {
                    navigation.push('Exercises', {
                      params: { isHellDay: isHellDay },
                      screen: ''
                    });
                  }}
                  icon={icons.circle_right}
                />
              </View>
            }
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: -20
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  backgroundColor: COLORS.primary,
                  borderRadius: 50,
                  bottom: 0
                }}
              />
              <FastImage
                source={require('../assets/temp/girl-stretching-back-removebg-preview.png')}
                resizeMode="contain"
                style={{
                  height: 180,
                  width: '115%'
                }}
              />
            </View>
          </InfoCard>
        </View>
        <SectionHeader title="My Statistics" />
        <View style={{ marginBottom: 20 }}>
          <InfoCard
            title="My Statistics"
            subtitle="Please Review your Statistics!!"
            leftContent={
              <View style={{}}>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignSelf: 'baseline',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
                <AppCardButton
                  style={{ marginTop: 0 }}
                  text={'Goto Statistics'}
                  onPress={() => {
                    navigation.push('Tabs', {
                      params: null,
                      screen: 'Statistics'
                    });
                    // console.log("pl")
                  }}
                  icon={icons.circle_right}
                />
              </View>
            }
          >
            {/* <InAppChallengeInviteNotification /> */}

            <View style={{ paddingTop: 50 }}>
              <BarStats value={33} suffix="%" duration={animationDuration} title="Lose Weight" />
              <BarStats marginTop={10} suffix="%" duration={animationDuration} value={88} title="Height Increase" />
              <BarStats
                marginTop={10}
                suffix="%"
                duration={animationDuration}
                value={57}
                title="Muscle Mass Increase"
              />
              <BarStats marginTop={10} duration={animationDuration} value={89} suffix="%" title="Abs" />
            </View>
          </InfoCard>
        </View>
        <SectionHeader title="Friends who Completed Exercise!" />
        <View style={{ marginLeft: -20, marginRight: -20 }}>
          <FriendsListHorizontal friends={friends} />
        </View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 40
          }}
        >
          <AppCardButton
            text="See More Friends"
            icon={icons.circle_right}
            onPress={undefined}
            style={{
              alignSelf: 'center',
              borderColor: COLORS.primary
            }}
          />
          <View style={{ marginLeft: -20, marginRight: -20, marginTop:10 }}>
            <FriendsListHorizontal friends={findFriend} />
          </View>
        </View> 
        {/* ========================================================================================================= */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {

            setModalVisible(!modalVisible);
          }}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ margin: 5 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }}
                    source={require('../assets/icons/close-icon.png')}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                data={friendData}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#DCE2EF',
                        borderRadius: 15,
                        padding: 10,
                        marginBottom: 10,
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                          source={{ uri: item?.photoURL }}
                          style={{
                            width: 65,
                            height: 65,
                            borderRadius: 18,
                            backgroundColor: COLORS.gray,
                            marginRight: 10
                          }}
                        />
                        <Text style={{ color: 'black', fontSize: 20 }}>{item?.displayName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <NotificationButton
                          style={{ margin: 8 }}
                          onPress={() => {
                            sendFriendRequest(item)
                              .then((value: any) => {  Alert.alert("Friend Request Sended!");setModalVisible(false) })
                              .catch((err: any) => { console.log(err) });
                          }}
                          text="Send" />
                        <NotificationButton
                          onPress={() => {
                            setModalVisible(false)
                          }}
                          text="Decline"
                          type="secondary"
                          style={{ margin: 8 }}
                        />
                      </View>
                    </View>
                  )
                }}
                keyExtractor={item => item?.user}
              />
            </View>
          </View>


        </Modal>
        {/* ========================================================================================================= */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center"
  },

});
export default HomeScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

