import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TabbedButtons } from '../components/TabbedButtons';
import { TabScreenHeader } from '../components/TabScreenHeader';
import { COLORS } from '../constants';
import RankingFragment from './Fragments/RankingFragment';
import StatsFragment from './Fragments/StatsFragment';
import { useData } from './hooks';
import auth from '@react-native-firebase/auth';

const Statistics = ({ navigation }: any) => {

  const [activeTab, setActiveTab] = useState('ranking');
  const buttons = [
    {
      text: 'Ranking',
      id: 'ranking',
      onPress: undefined
    },
    {
      text: 'Statistics',
      id: 'stats',
      onPress: undefined
    }
  ];
  const { Statistics } = useData();

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      Statistics().then((item: any) => {
        setData(item);
      });
    }
    fetchData();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: COLORS.white }}>
      <TabScreenHeader title="My Statistics" />
      <View
        style={{
          paddingHorizontal: '15%'
        }}
      >
        <TabbedButtons
          buttons={buttons}
          selected={activeTab}
          onTabPress={(id: string) => {
            setActiveTab(id);
          }}
        />
        {/* <TabbedButtons
          buttons={buttons}
          selected={activeTab}
          onTabPress={(id: string) => {
            setActiveTab(id);
          }}
        /> */}
      </View>
      <View>
        {activeTab === 'stats' && <StatsFragment data={data} />}
        {activeTab === 'ranking' && (
          <RankingFragment
            friendRank={data?.data?.friend}
            myFriendRank={data?.data?.myFriendRank}
            golbalRank={data?.data?.global}
            myGlobalRank={data?.data?.myGlobalRank}
            userDetail={data?.data?.userDetail}
            myRankingNumber={data?.data?.myRankingNumber}
            myGlobalRankingNumber={data?.data?.myGlobalRankingNumber}
            navigation={navigation}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default Statistics;
