/* eslint-disable react/prop-types */
import React, { FC, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Modal, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { ExcersiseInfoTags } from '../components/ExcersiseInfoTags';
import ExcersiseItem from '../components/ExcersiseItem';
import ModalLayout from '../components/ModalLayout';
import { COLORS, icons, values } from '../constants';
import { useData } from './hooks';

const TodaysExercisescreen = (props) => {
  const navigation = props.navigation;
  const route = props.route;
  const { restartExercise } = useData();
  // const exercises= props.route.params.data.data.MyExercise.today_exercise;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isHellDay, setIsHellDay] = useState(props?.route?.params?.data?.data?.MyExercise?.today_exercise[0].hell_day);
  const modal_hide_wait_time = 300;
  const [finishedExcersiseActivityModalVisible, setFinishedExcersiseActivityModalVisible] = useState(false);
  const [finishedExercisesModalVisible, setFinishedExercisesModalVisible] = useState(
    props?.route?.params?.data?.data?.doneToday
  );
  const [hellDayModalVisible, setHellDayModalVisible] = useState(
    props?.route?.params?.data?.data?.MyExercise?.today_exercise[0].hell_day
  );
  const HEADER_HEIGHT = 250;
  const params = route.params;
  const [exercises, setExcersise] = useState([
    {
      title: "Todays's Exercise",
      sub_title: "You've to complete whole set twice",
      type: 'header',
      image: require('../assets/temp/excercise-banner.png'),
      data: [
        {
          title: 'Biginner',
          type: 'header_item'
        },
        {
          title: '10 minutes',
          type: 'header_item'
        },
        {
          title: '8 Exercises',
          type: 'header_item'
        }
      ]
    },
    {
      title: 'Exercise Activity',
      type: 'exercises',
      data: props?.route?.params?.data?.data?.MyExercise?.today_exercise
    }
  ]);

  useEffect(() => {
    async function fetchData() {
      if (params?.action) {
        simulateActions(params.action);
      }
    }
    fetchData();
  }, [params]);

  function simulateActions(action: string) {
    switch (action) {
      case 'excersiseCompleted':
        setFinishedExcersiseActivityModalVisible(true);
        // addXP(100);
        // console.log('Xp add');
        break;

      case 'exerciseskipped':
        setFinishedExercisesModalVisible(true);
        break;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingBottom: 0
      }}
    >
      <Animated.SectionList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        sections={exercises}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyExtractor={(item, index: number) => item.title + index}
        renderItem={
          ({ item, index }) => {
            return (
              item.type === 'excersise_item' && (
                <View style={{ marginHorizontal: 20 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Exercises', {
                        params: { data: item, index: index },
                        screen: 'ExcersiseTimeAndGuideScreen'
                      });
                    }}
                  >
                    <ExcersiseItem
                      title={item.title}
                      subtitle={item.subtitle}
                      image={{ uri: item.image }}
                      isDone={item.isDone}
                    />
                  </TouchableOpacity>
                </View>
              )
            );
          }
          // <Item {...item} type={item.type} />
        }
        renderSectionHeader={({ section }) => {
          return section.type === 'exercises' ? (
            <TouchableOpacity onPress={() => Alert.alert('ok')}>
              <AppText
                fontWeight="SemiBold"
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  color: COLORS.dark,
                  marginHorizontal: 20
                }}
              >
                {section.title}
              </AppText>
            </TouchableOpacity>
          ) : (
            <View style={{ marginTop: -10 }}>
              <View
                style={{
                  overflow: 'hidden',
                  marginTop: -1010,
                  paddingTop: 1010,
                  alignItems: 'center'
                }}
              >
                <Animated.Image
                  resizeMode="contain"
                  style={{
                    height: HEADER_HEIGHT,
                    width: '100%',
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                          outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                        })
                      },
                      {
                        scale: scrollY.interpolate({
                          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                          outputRange: [2, 1, 1.2]
                        })
                      }
                    ]
                  }}
                  source={section.image}
                />
              </View>
              <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <AppText fontWeight="SemiBold" style={{ fontSize: 28, marginTop: 10, color: COLORS.dark }}>
                      {section.title}
                    </AppText>
                    {isHellDay && section.sub_title && (
                      <AppText style={{ fontSize: 16, color: COLORS.dark }}>{section.sub_title}</AppText>
                    )}
                  </View>
                  {isHellDay && (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.lightPrimary,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <AppText fontWeight={'SemiBold'} style={{ fontSize: 18, color: COLORS.primary }}>
                        1/2
                      </AppText>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20
                  }}
                >
                  {section.data.map((tag, index) => {
                    return <ExcersiseInfoTags key={index} text={tag.title} />;
                  })}
                </View>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,

          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0.3,
          shadowRadius: 10
        }}
      >
        {/* <AppButton
          text="Start now"
          onPress={() => {
            navigation.navigate('Exercises', {
              params: { excersise: 1 },
              screen: 'ExcersiseTimeAndGuideScreen'
            });
          }}
        /> */}
      </View>
      <View
        style={{
          position: 'absolute',
          height: 55,
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.white,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
              outputRange: [0, 1]
            })
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            height: 45,
            width: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Animated.Image
            source={icons.back}
            style={{
              tintColor: COLORS.white,
              height: 24,
              width: 24,
              position: 'absolute',
              opacity: scrollY.interpolate({
                inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
                outputRange: [1, 0]
              })
            }}
          />
          <Animated.Image
            source={icons.back}
            style={{
              tintColor: COLORS.dark,
              height: 24,
              width: 24,
              position: 'absolute',
              opacity: scrollY.interpolate({
                inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
                outputRange: [0, 1]
              })
            }}
          />
        </TouchableOpacity>
        <Animated.View
          style={{
            alignItems: 'center',
            marginLeft: -45,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
              outputRange: [0, 1]
            })
          }}
        >
          <AppText fontWeight="Bold" style={{ fontSize: 20, color: COLORS.primary }}>
            Today&apos;s Exercises
          </AppText>
        </Animated.View>
        <View />
      </View>

      {/* //================================================================================ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={finishedExcersiseActivityModalVisible}
        onRequestClose={() => setFinishedExcersiseActivityModalVisible(!finishedExcersiseActivityModalVisible)}
      >
        <ModalLayout onClose={() => setFinishedExcersiseActivityModalVisible(!finishedExcersiseActivityModalVisible)}>
          <View style={{ alignItems: 'center' }}>
            <AppText fontWeight="SemiBold" style={{ fontSize: 28, color: COLORS.primary }}>
              You’re doing great! 😀
            </AppText>
            <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.dark }}>
              Just a little bit more and we’re done
            </AppText>
          </View>
          <View style={{ marginTop: 20 }}>
            <ExcersiseItem
              image={exercises[1]?.data[0].image}
              title={exercises[1]?.data[0].title}
              subtitle={exercises[1]?.data[0].subtitle}
              isDone={false}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <AppButton
              text="Start exercise-2"
              onPress={() => {
                setFinishedExcersiseActivityModalVisible(false);

                setTimeout(() => {
                  navigation.navigate('Exercises', {
                    params: { excersise: 2 },
                    screen: 'ExcersiseTimeAndGuideScreen'
                  });
                }, modal_hide_wait_time);
              }}
            />
            <AppButton
              style={{ marginTop: '5%', backgroundColor: COLORS.lightPrimary }}
              textStyle={{ color: COLORS.primary }}
              text="Restart  Exercise-1"
              onPress={() => {
                setFinishedExcersiseActivityModalVisible(false);
                setTimeout(() => {
                  navigation.navigate('Exercises', {
                    params: { excersise: 1 },
                    screen: 'ExcersiseTimeAndGuideScreen'
                  });
                }, modal_hide_wait_time);
              }}
            />
          </View>
        </ModalLayout>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={finishedExercisesModalVisible}
        onRequestClose={() => {
          setFinishedExercisesModalVisible(!finishedExercisesModalVisible);
        }}
      >
        <ModalLayout
          onClose={() => {
            setFinishedExercisesModalVisible(!finishedExercisesModalVisible);
          }}
        >
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FastImage style={{ width: 115, height: 115 }} source={values.trophyImage} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <AppText fontWeight="SemiBold" style={{ fontSize: 28, color: COLORS.primary }}>
              Congratulation!
            </AppText>
            <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.dark }}>
              You have completed the Today’s exercise!
            </AppText>
          </View>
          <View style={{ marginTop: 20 }}>
            <AppButton
              text="Restart Today’s exercise"
              onPress={() => {
                setFinishedExercisesModalVisible(false);
                restartExercise()
                  .then((e) => {
                    Alert.alert(e.message);
                    navigation.push('Tabs');
                  })
                  .catch((err) => {
                    console.log(err);
                    navigation.push('Exercises');
                  });
              }}
            />
            <AppButton
              style={{ marginTop: '5%', backgroundColor: COLORS.lightPrimary }}
              textStyle={{ color: COLORS.primary }}
              text="Home"
              onPress={() => {
                setFinishedExercisesModalVisible(false);
                navigation.navigate('Tabs');
              }}
            />
          </View>
        </ModalLayout>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={hellDayModalVisible}
        onRequestClose={() => {
          setHellDayModalVisible(!hellDayModalVisible);
        }}
      >
        <ModalLayout
          onClose={() => {
            setHellDayModalVisible(!hellDayModalVisible);
            !hellDayModalVisible;
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <AppText fontWeight="SemiBold" style={{ fontSize: 28, color: COLORS.primary }}>
              Hell Day!
            </AppText>
            <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.dark }}>
              Today is hellday you’ve to do whole set twice
            </AppText>
          </View>
          <View
            style={{
              marginTop: 25,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <FastImage resizeMode="contain" style={{ flex: 1, height: 150 }} source={values.exerciseImage} />
          </View>
          <View style={{ marginTop: 25 }}>
            <AppButton
              text="Let’s begin"
              onPress={() => {
                setHellDayModalVisible(false);
              }}
            />
          </View>
        </ModalLayout>
      </Modal>
    </SafeAreaView>
  );
};
export default TodaysExercisescreen;

type Props = {
  title: string;
  subtitle?: string;
  image: any;
  isDone: boolean;
  type: string;
};

const Item: FC<Props> = ({ title, subtitle, image, isDone, type, xp, videoUrl }) =>
  (type === 'excersise_item' && (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity>
        <ExcersiseItem title={title} subtitle={subtitle} image={{ uri: image }} isDone={isDone} />
      </TouchableOpacity>
    </View>
  )) ||
  null;
