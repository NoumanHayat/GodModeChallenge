import React from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppText from '../components/AppText';
import { TabScreenHeader } from '../components/TabScreenHeader';
import { COLORS, icons, values } from '../constants';

const Suggestions = () => (
  <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <TabScreenHeader
      title="Suggestions"
      ritghContent={
        <TouchableHighlight underlayColor={'#00000028'} onPress={undefined}>
          <FastImage
            source={icons.search}
            tintColor={COLORS.dark}
            style={{
              width: 22,
              height: 22
            }}
          />
        </TouchableHighlight>
      }
    />
    <View style={{ paddingHorizontal: 20 }}>
      {values.suggestionItems.map((item, index) => (
        <SuggestionItem key={index} {...item} />
      ))}
    </View>
    <Ad image={values.ad} />
  </ScrollView>
);
export default Suggestions;

const SuggestionItem = ({ title, subtitle, body }: any) => (
  <View style={{ marginVertical: 20 }}>
    <AppText fontWeight="Medium" style={{ color: COLORS.primary, fontSize: 16, marginBottom: 15 }}>
      {title}
    </AppText>
    <View style={{ padding: 20, backgroundColor: COLORS.lightGray }}>
      <AppText fontWeight="Medium" style={{ color: COLORS.dark, fontSize: 14, marginBottom: 10 }}>
        {subtitle}
      </AppText>
      <AppText
        style={{
          color: COLORS.dark,
          fontSize: 12,
          lineHeight: 25,
          marginBottom: 10
        }}
      >
        {body}
      </AppText>
    </View>
  </View>
);

const Ad = ({ image }: any) => (
  <View
    style={{
      marginHorizontal: 20,
      marginBottom: 40,
      borderRadius: 5,
      overflow: 'hidden'
    }}
  >
    <FastImage source={image} style={{ width: '100%', height: 150 }} />
    <View
      style={{
        height: 13,
        width: 13,
        backgroundColor: COLORS.lightPrimary,
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FastImage source={icons.close} tintColor={COLORS.primary} style={{ width: 7, height: 7 }} />
    </View>
  </View>
);
