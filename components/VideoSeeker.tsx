import React, { Ref, RefObject, useEffect, useRef, useState } from 'react';
import { View, ViewStyle, PanResponder, Animated, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../constants';

interface Props {
  duration: number;
  current_timer: number;
  onSeek?: void;
  style?: ViewStyle;
}

export default function VideoSeeker({ duration, current_timer, onSeek, style }: Props) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [seekerMeasurements, setSeekerMeassurements]: any = useState(null);
  const [isSeekerPointerMoving, setIsSeekerPointerMoving] = useState(false);
  const [seekerPointerPosition, setSeekerPointerPosition] = useState(0);

  let seekerRef: any = useRef();
  let seekerPointerRef = useRef();

  const pan: any = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        //setSeekerPointerPosition((current_timer / duration) * 100);
        // setIsSeekerPointerMoving(true);
      },
      onPanResponderRelease: () => {
        // setIsSeekerPointerMoving(false);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false
      })
    })
  ).current;

  useEffect(() => {
    let pos = (current_timer / duration) * 100;
    if (duration > 0) {
      setCurrentPosition(pos);
      setSeekerPointerPosition(pos);
      if (!isSeekerPointerMoving) {
        //   setSeekerPointerPosition(pos);
      }
    }
  }, [duration, current_timer]);

  useEffect(() => {
    seekerRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
      setSeekerMeassurements({
        start: x,
        end: width
      });
    });
  }, [duration]);

  return (
    <View style={{ height: 40, justifyContent: 'center', ...style }}>
      <View
        ref={seekerRef}
        style={{
          backgroundColor: COLORS.white,
          overflow: 'hidden',
          borderRadius: 20
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 10,
            width: `${currentPosition}%`
          }}
        ></View>
      </View>
      <Animated.View
        ref={seekerPointerRef}
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          height: 25,
          width: 25,
          borderRadius: 30,
          borderWidth: 5,
          marginLeft: -12.5,
          backgroundColor: COLORS.white,
          borderColor: COLORS.primary,
          left: `${seekerPointerPosition}%`,
          transform: [
            {
              translateX: pan.x.interpolate({
                inputRange: [0, seekerMeasurements ? seekerMeasurements.end : 0],
                outputRange: [0, seekerMeasurements ? seekerMeasurements.end : 0],
                extrapolate: 'clamp'
              })
            }
          ]
        }}
      />
    </View>
  );
}
