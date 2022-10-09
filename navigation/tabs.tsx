import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableHighlight, View } from 'react-native';
import { COLORS, icons } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import AppText from '../components/AppText';
import FastImage from 'react-native-fast-image';
import Statistics from '../screens/Statistics';
import Suggestions from '../screens/Suggestions';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const TabBar = ({ state, descriptors, navigation }: any) => (
  <View
    style={{
      flexDirection: 'row',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 24
    }}
  >
    {state.routes.map((route: any, index: number) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel || options.title || route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key
        });
      };

      return (
        <View
          key={index}
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.lightGray,
            borderTopWidth: 1
          }}
        >
          <TouchableHighlight
            underlayColor={'#00000010'}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',

                paddingVertical: 10
              }}
            >
              <FastImage
                source={options.icon}
                resizeMode="contain"
                tintColor={isFocused ? COLORS.primary : COLORS.darkgray}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <AppText
                style={{
                  fontSize: 11,
                  color: isFocused ? COLORS.primary : COLORS.darkgray
                }}
              >
                {label}
              </AppText>
            </View>
          </TouchableHighlight>
        </View>
      );
    })}
  </View>
);

const Tabs = () => (
  <Tab.Navigator
    initialRouteName={'HomeScreen'}
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24
      }
    }}
    tabBar={(props) => <TabBar {...props} />}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: icons.home,
        tabBarActiveTintColor: COLORS.primary
      }}
    />
    {/*<Tab.Screen*/}
    {/*  name="SignIn"*/}
    {/*  component={SignIn}*/}
    {/*  options={{*/}
    {/*    tabBarIcon: icons.home,*/}
    {/*    tabBarActiveTintColor: COLORS.primary*/}
    {/*  }}*/}
    {/*/>*/}
    <Tab.Screen
      name="Statistics"
      component={Statistics}
      options={{
        tabBarIcon: icons.stats,
        tabBarActiveTintColor: COLORS.primary
      }}
    />
    <Tab.Screen
      name="Suggestions"
      component={Suggestions}
      options={{
        tabBarIcon: icons.suggestions,
        tabBarActiveTintColor: COLORS.primary
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: icons.profile,
        tabBarActiveTintColor: COLORS.primary
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
