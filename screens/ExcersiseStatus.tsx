/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableNativeFeedback, TouchableOpacity, Alert } from 'react-native';
import { TabScreenHeader } from '../components/TabScreenHeader';
import { COLORS } from '../constants';
import { useData } from './hooks';
import auth from '@react-native-firebase/auth';
import AppText from '../components/AppText';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
// ExercisesStatus
const ExcersiseStatusScreen = ({ navigation }) => {
  const { ExercisesStatus, acceptChallenge, declineChallenge, startNewExcersise, resetExercise } = useData();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function fetchData() {
      ExercisesStatus().then((item: any) => {
        setData(item);
      });
    }
    fetchData();
  }, []);
  const bodyMeasurements = [
    {
      quantity: data?.data?.MyExercise ? data?.data.MyExercise.day : 0,
      // quantity:0,
      measurement: 'Day'
    },
    {
      quantity: data?.data ? data.data.User_Details.challengeWin : 0,
      //  quantity:0,
      measurement: 'Challenge Win'
    },
    {
      quantity:
        (data?.data ? data.data.User_Details.triesSuccessful : 0) +
        '/' +
        (data?.data ? data.data.User_Details.totalTries : 0),
      //  quantity:0,
      measurement: 'Tries'
    }
  ];
  return (
    <View style={{ marginTop: 20 }}>
      <TabScreenHeader title="Exercise Status" />

      <View>
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          {bodyMeasurements.map((measurement, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                marginHorizontal: 10,
                borderRadius: 16,
                paddingVertical: 15,
                alignItems: 'center',
                shadowColor: '#00000030',
                shadowOffset: {
                  width: 0,
                  height: 12
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 24
              }}
            >
              <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.primary }}>
                {measurement.quantity}
              </AppText>
              <AppText fontWeight="Regular" style={{ fontSize: 12, color: COLORS.dark, marginTop: 5 }}>
                {measurement.measurement}
              </AppText>
            </View>
          ))}
        </View>
      </View>
      {data?.data?.MyExercise?.challenge_request?.length !== 0 ? (
        <View>
          <TabScreenHeader title="Challenge Request" />
          {data?.data?.MyExercise?.challenge_request?.map((item, index) => {
            return (
              <View key={index}>
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
                    alignItems: 'center',
                    marginTop: 4,
                    paddingTop: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <FastImage
                      source={{ uri: item?.photoURL }}
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
                        {item?.displayName}
                      </AppText>
                    </View>
                    <View>
                      <NotificationButton
                        onPress={() => {
                          acceptChallenge(item)
                            .then((item) => {
                              Alert.alert(item);
                              navigation.push('Tabs');
                            })
                            .catch((err) => {
                              Alert.alert(err);
                            });
                        }}
                        text="Accept"
                        style={undefined}
                      />
                      <NotificationButton
                        onPress={() => {
                          declineChallenge(item)
                            .then((item) => {
                              Alert.alert(item);
                              navigation.push('Tabs');
                            })
                            .catch((err) => {
                              Alert.alert(err);
                            });
                        }}
                        text="Decline"
                        type="secondary"
                        style={{ marginTop: 8 }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <Text />
      )}

      {data?.data?.MyExercise?.challenge_details?.length !== 0 ? (
        <View>
          <TabScreenHeader title="Challenge Details" />
          {data?.data?.MyExercise?.challenge_details?.map((item, index) => {
            return (
              <View key={index}>
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
                    alignItems: 'center',
                    marginTop: 4,
                    paddingTop: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <FastImage
                      source={{ uri: item?.photoURL }}
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
                        {item?.displayName}
                      </AppText>
                    </View>
                  </View>

                  {/* //======================================================= */}
                  <View
                    style={{
                      margin: 10
                    }}
                  >
                    <View>
                      <AppText fontWeight="Medium" style={{ fontSize: 14 }}>
                        Challenge End:{parseInt((item?.endIn - new Date().getTime()) / (60 * 60 * 1000 * 24))} days
                      </AppText>
                    </View>
                    <View>
                      <AppText fontWeight="Medium" style={{ fontSize: 14 }}>
                        XP Earn: {item?.xp}
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <Text />
      )}

      {data?.data?.MyExercise?.day !== 0 ? (
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
          <LinearGradient
            colors={['#21D4FD', '#2152FF']}
            end={{ x: 0, y: 1 }}
            start={{ x: 1, y: 0 }}
            style={{ borderRadius: 30, width: '40%', alignItems: 'center', margin: 15 }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 10,
                flexDirection: 'row'
              }}
              onPress={() => {
                navigation.push('Exercises', {
                  params: { data: data },
                  screen: 'TodaysExcersies'
                });
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#FBCF33', '#F53939']}
            end={{ x: 0, y: 1 }}
            start={{ x: 1, y: 0 }}
            style={{ borderRadius: 30, width: '40%', alignItems: 'center', margin: 15 }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 10,
                flexDirection: 'row'
              }}
              onPress={async () => {
                resetExercise('Pressable')
                  .then((e) => {
                    Alert.alert(e.message);
                    navigation.push('Tabs');
                  })
                  .catch((e) => {
                    console.log(e);
                    Alert.alert(e.message);
                  });
                // resetExercise('Pressable')
                // .then((e) => {
                //   console.log(e);
                // })
                // .catch((e) => {
                //   console.log(e);
                // });
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Reset</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ) : (
        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <TabScreenHeader title="It's your 1st time " />
          <LinearGradient
            colors={['#98EC2D', '#17AD37']}
            end={{ x: 0, y: 1 }}
            start={{ x: 1, y: 0 }}
            style={{ borderRadius: 30, width: '80%', alignItems: 'center', margin: 15 }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 10,
                flexDirection: 'row'
              }}
              onPress={() => {
                startNewExcersise()
                  .then((item: any) => {
                    Alert.alert(item.message);
                    navigation.push('Tabs');
                  })
                  .catch((error: any) => {
                    console.log(error);
                  });
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Start Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};
export default ExcersiseStatusScreen;
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
