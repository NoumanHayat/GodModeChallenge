/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Modal, Image, TextInput, Alert } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { COLORS, icons } from '../constants';
import Video from 'react-native-video';
import VideoSeeker from '../components/VideoSeeker';
import { useData } from './hooks';
import VideoPlayer from 'react-native-video-player';
import { Title } from 'react-native-paper';
import ModalLayout from '../components/ModalLayout';
import { SIZES } from '../constants';

const ExcersiseTimeAndGuideScreen = (props) => {
  const exercises = props?.route.params.data;
  const { completeExcersise } = useData();
  const navigation = props.navigation;
  const ExcersiseIndex = props.route.params.index;
  const [startExcersise, setStartExcersise] = useState(false);
  const [videoViewHeight, setVideoViewHeight] = useState(250);
  const windowWidth = Dimensions.get('window').width;
  const [start_timer_value, setStartTimerValue] = useState(5);
  const [start, setStart] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [setNumbers, setSetNumbers] = useState(0);

  useEffect(() => {
    if (!start) {
      setTimeout(() => {
        setStart(true);
      }, 200);
    }
  }, [start]);

  if (!start) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingBottom: 0
      }}
    >
      {!startExcersise && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AppText
              fontWeight="Bold"
              style={{
                color: COLORS.primary,
                fontSize: 40,
                marginBottom: '20%'
              }}
            >
              Get Ready!
            </AppText>
            <CircularProgress
              value={0}
              initialValue={start_timer_value}
              radius={100}
              maxValue={start_timer_value}
              duration={start_timer_value * 1000}
              inActiveStrokeColor={COLORS.gray}
              activeStrokeColor={COLORS.primary}
              progressValueColor={COLORS.dark}
              inActiveStrokeOpacity={1}
              activeStrokeWidth={20}
              inActiveStrokeWidth={20}
              onAnimationComplete={() => {
                setStartExcersise(true);
              }}
            />
            {/* <AppButton
              style={{ marginTop: '20%', width: '100%' }}
              text="Start Over"
              onPress={() => {
                setStart(false);
              }}
            /> */}
          </View>
        </View>
      )}
      {startExcersise && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <View style={{ height: videoViewHeight, backgroundColor: COLORS.black }}>
            <VideoPlayer
              video={{ uri: exercises?.videoUrl }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{
                uri: exercises?.image
              }}
            />
          </View>

          {/* ======================================================================== */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 30,
              marginRight: 30
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <AppText
                fontWeight="Bold"
                style={{
                  color: COLORS.dark,
                  fontSize: 35,
                  marginBottom: '10%',
                  marginTop: '10%'
                }}
              >
                {exercises.title}
              </AppText>
              {/* ================================================================== */}
              <View
                style={{
                  borderBottomColor: '#dddddd',
                  borderBottomWidth: 1,
                  borderTopColor: '#dddddd',
                  borderTopWidth: 1,
                  flexDirection: 'row',
                  height: 100,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Title>Day </Title>
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Title>{exercises.Day}</Title>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#dddddd',
                  borderBottomWidth: 1,
                  borderTopColor: '#dddddd',
                  borderTopWidth: 1,
                  flexDirection: 'row',
                  height: 100,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Title>Minimum Set </Title>
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {exercises?.hell_day ? (
                    <Title style={{ color: 'red' }}>
                      {exercises.minimum_set}*2={exercises.minimum_set * 2}
                    </Title>
                  ) : (
                    <Title>{exercises.minimum_set}</Title>
                  )}
                </View>
              </View>
              {/* ================================================================== */}

              <AppButton
                style={{ marginTop: '5%', backgroundColor: COLORS.lightPrimary }}
                textStyle={{ color: COLORS.primary }}
                text="END"
                onPress={() => {
                  setInputVisible(true);
                }}
                icon={icons.right_arrow}
              />
            </View>
          </View>
          {/* ======================================================================== */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={inputVisible}
            onRequestClose={() => {
              setInputVisible(!inputVisible);
            }}
          >
            <ModalLayout
              onClose={() => {
                setInputVisible(!inputVisible);
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <AppText fontWeight="SemiBold" style={{ fontSize: 28, color: COLORS.primary }}>
                  Done with exercise!
                </AppText>
                <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.dark }}>
                  Please Provide Details
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
                <View
                  style={{
                    height: 45,
                    marginHorizontal: 5,
                    marginTop: 5,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray,
                    elevation: 2
                  }}
                >
                  <TextInput
                    placeholder="Please enter Number of set"
                    onChangeText={(value) => setSetNumbers(parseInt(value))}
                    autoCapitalize={'none'}
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      height: 40.5,
                      fontSize: 15,
                      marginLeft: 2
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 25 }}>
                <AppButton
                  text="Let’s begin"
                  onPress={() => {
                    if (exercises?.hell_day) {
                      if (setNumbers >= exercises.minimum_set * 2) {
                        completeExcersise(exercises, setNumbers);
                        // Alert.alert('Exercises Completed!');
                        navigation.push('Tabs');
                      } else {
                        alert('Today is hell day minimum set are not enough.');
                      }
                    } else {
                      if (setNumbers >= exercises.minimum_set) {
                        completeExcersise(exercises, setNumbers);
                        // Alert.alert('Exercises Completed!');
                        navigation.push('Tabs');
                        //next screen
                      } else {
                        alert(' minimum set are not enough.');
                      }
                    }
                    // setInputVisible(false);
                  }}
                />
              </View>
            </ModalLayout>
          </Modal>

          {/* ============================================================================== */}
        </View>
      )}
    </SafeAreaView>
  );
};
export default ExcersiseTimeAndGuideScreen;
