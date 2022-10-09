import React, {useState} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../constants';
import {CountUp} from 'use-count-up';

interface Props {
  title?: string;
  suffix?: string;
  value: number;
  duration?: number;
  marginTop?: number;
  titleColor?: string;
  activeBarColor?: string;
  inActiveBarColor?: string;
  textColor?: string;
  textFontSize?: number;
  titleFontSize?: number;
  barHeight?: number;
}

export default function BarStats({
  title,
  value,
  duration,
  suffix,
  marginTop = 0,
  titleColor = COLORS.white,
  textFontSize = 5,
  titleFontSize = 7,
  activeBarColor = COLORS.primary,
  inActiveBarColor = COLORS.white,
  textColor = COLORS.white,
  barHeight = 4,
}: Props) {
  const [barWidth, setBarWidth] = useState(0);

  return (
    <View style={{marginTop: marginTop}}>
      <AppText
        style={{
          fontSize: titleFontSize,
          color: titleColor,
          alignSelf: 'center',
          marginBottom: 5,
        }}>
        {title}
      </AppText>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: textFontSize * 3,
            alignItems: 'flex-end',
            marginRight: 4,
          }}>
          <AppText style={{color: textColor, fontSize: textFontSize}}>
            {duration && (
              <>
                <CountUp
                  isCounting
                  easing={'easeInCubic'}
                  end={value}
                  duration={duration / 1000}
                  onUpdate={(v: any) => {
                    setBarWidth(v);
                  }}
                />
                {suffix}
              </>
            )}
          </AppText>
        </View>
        <View
          style={{
            flex: 1,
            height: barHeight,
            backgroundColor: inActiveBarColor,
            overflow: 'hidden',
            borderRadius: 5,
          }}>
          <View
            style={{
              backgroundColor: activeBarColor,
              height: barHeight + 1,
              width: `${barWidth}%`,
            }}></View>
        </View>
        <View style={{width: textFontSize * 3, marginLeft: 4}}>
          <AppText style={{color: textColor, fontSize: textFontSize}}>
            {100 - barWidth}
            {suffix}
          </AppText>
        </View>
      </View>
    </View>
  );
}
