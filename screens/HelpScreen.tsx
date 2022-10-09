import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import AppText from '../components/AppText';
import ScreenWithNavHeaderLayout from '../components/ScreenWithNavHeaderLayout';
import { COLORS } from '../constants';

const HelpScreen = ({ navigation, route }: any) => (
  <ScreenWithNavHeaderLayout navigation={navigation} title="Help">
    <View style={{ marginTop: 40 }}>
      <Item title="FAQ" />
      <Item title="Terms and conditions" />
      <Item title="Contact Us" />
    </View>
  </ScreenWithNavHeaderLayout>
);
export default HelpScreen;

const Item = ({ title, onPress }: any) => (
  <TouchableHighlight underlayColor={'#00000008'} onPress={() => {}}>
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <AppText
        style={{
          fontSize: 15,
          color: COLORS.dark
        }}
      >
        {title}
      </AppText>
    </View>
  </TouchableHighlight>
);
