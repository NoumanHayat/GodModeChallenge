import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AppText from '../../components/AppText';
import BarStats from '../../components/BarStats';
import { COLORS } from '../../constants';
import { TabbedButtons } from '../../components/TabbedButtons';
import { Title } from 'react-native-paper';

const StatsFragment = ({ data }) => {
  const bodyMeasurements = [
    {
      quantity: data?.data.userDetail.totalXp,
      // quantity:0,
      measurement: 'XP'
    },
    {
      quantity: data?.data.userDetail.challengeWin,
      //  quantity:0,
      measurement: 'Challenge Win'
    },
    {
      quantity: data?.data.userDetail.triesSuccessful + '/' + data?.data.userDetail.totalTries,
      //  quantity:0,
      measurement: 'Tries'
    }
  ];

  const statsGlobal = [
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.PushUps) * 100) / data?.data.globalLength
      ),
      name: 'PushUps'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.PullUps) * 100) / data?.data.globalLength
      ),
      name: 'PullUps'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.Squats) * 100) / data?.data.globalLength
      ),
      name: 'Squats'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.SitUps) * 100) / data?.data.globalLength
      ),
      name: 'SitUps'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.Lunges) * 100) / data?.data.globalLength
      ),
      name: 'Lunges'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.JumpingJacks) * 100) / data?.data.globalLength
      ),
      name: 'JumpingJacks'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.Planks) * 100) / data?.data.globalLength
      ),
      name: 'Planks'
    },
    {
      value: parseInt(
        ((data?.data.globalLength / data?.data?.globalExerciseRanking.Burpees) * 100) / data?.data.globalLength
      ),
      name: 'Burpees'
    }
  ];
  const statsFriend = [
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.PushUps) * 100) / data?.data.friendLength
      ),
      name: 'PushUps'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.PullUps) * 100) / data?.data.friendLength
      ),
      name: 'PullUps'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.Squats) * 100) / data?.data.friendLength
      ),
      name: 'Squats'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.SitUps) * 100) / data?.data.friendLength
      ),
      name: 'SitUps'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.Lunges) * 100) / data?.data.friendLength
      ),
      name: 'Lunges'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.JumpingJacks) * 100) / data?.data.friendLength
      ),
      name: 'JumpingJacks'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.Planks) * 100) / data?.data.friendLength
      ),
      name: 'Planks'
    },
    {
      value: parseInt(
        ((data?.data.friendLength / data?.data?.friendExerciseRanking.Burpees) * 100) / data?.data.friendLength
      ),
      name: 'Burpees'
    }
  ];
  const [activeTab, setActiveTab] = useState('global');

  const buttons = [
    {
      text: 'Friend',
      id: 'friend',
      onPress: undefined
    },
    {
      text: 'Global',
      id: 'global',
      onPress: undefined
    }
  ];

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View>
        <View
          style={{
            marginTop: 20,
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
        <View style={{ marginTop: 40 }}>
          <TabbedButtons
            buttons={buttons}
            selected={activeTab}
            onTabPress={(id: string) => {
              setActiveTab(id);
            }}
          />

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
              <Title>Chellange Ranking </Title>
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Title>{activeTab === 'friend' ? <Text>{data?.data.myChellangeWinRankingNumber}</Text> : <Text>{data?.data.myGlobalChellangeWinRankingNumber}</Text>}</Title>
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
              <Title>Tries Ranking </Title>
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Title>450</Title>
            </View>
          </View>

          <View>
            {activeTab === 'friend' ? (
              statsFriend.map((stat, index) => (
                <BarStats
                  key={`barstats_${index}`}
                  title={stat.name}
                  value={stat.value}
                  titleColor={COLORS.dark}
                  activeBarColor={COLORS.primary}
                  inActiveBarColor={COLORS.secondary}
                  textColor={COLORS.dark}
                  textFontSize={12}
                  titleFontSize={14}
                  barHeight={10}
                  marginTop={20}
                  suffix={'%'}
                  duration={1}
                />
              ))
            ) : (
              <Text></Text>
            )}
            {activeTab === 'global' ? (
              statsGlobal.map((stat, index) => (
                <BarStats
                  key={`barstats_${index}`}
                  title={stat.name}
                  value={stat.value}
                  titleColor={COLORS.dark}
                  activeBarColor={COLORS.primary}
                  inActiveBarColor={COLORS.secondary}
                  textColor={COLORS.dark}
                  textFontSize={12}
                  titleFontSize={14}
                  barHeight={10}
                  marginTop={20}
                  suffix={'%'}
                  duration={1}
                />
              ))
            ) : (
              <Text></Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default StatsFragment;
