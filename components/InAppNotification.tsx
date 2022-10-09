import React, {Children, FC, ReactNode, useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {COLORS} from '../constants';

interface Props {
  showNotification: Boolean;
  hideValue: number;
  children: ReactNode;
  autoHide?: Boolean;
}

export const InAppNotification: FC<Props> = ({
  showNotification = false,
  hideValue,
  children,
  autoHide = true,
}) => {
  const slideAnimation = useRef(new Animated.Value(hideValue)).current;

  const startAnimation = (show: boolean) => {
    Animated.timing(slideAnimation, {
      toValue: show ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (showNotification) {
      startAnimation(true);
      if (autoHide) {
        setTimeout(() => {
          startAnimation(false);
        }, 5000);
      }
    } else {
      startAnimation(false);
    }
  }, [showNotification]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        padding: 15,
        shadowColor: '#00000060',
        backgroundColor: COLORS.white,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        alignItems: 'center',
        transform: [
          {
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [hideValue, 0],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
};
