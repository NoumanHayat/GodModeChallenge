import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './navigation/tabs';
import { DeviceEventEmitter, LogBox, SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, values } from './constants';
import TodaysExercisescreen from './screens/TodaysExcersiseScreen';
import ExerciseStatus from './screens/ExcersiseStatus';
import ExcersiseTimeAndGuideScreen from './screens/ExcersiseTimeAndGuideScreen';
import { InAppChallengeInviteNotification } from './components/InAppChallengeInviteNotification';
import { InAppChallengeStatusNotification } from './components/InAppChallengeStatusNotification';
import { ChallengeCompleteModal } from './screens/modals/ChallengeCompleteModal';
import EditProfileScreen from './screens/Profile/EditProfileScreen';
import NotificationsScreen from './screens/Profile/NotificationsScreen';
import AboutScreen from './screens/AboutScreen';
import HelpScreen from './screens/HelpScreen';
import SplashScreen from 'react-native-splash-screen';
import AfterLoadSplashScreen from './screens/AfterLoadSplashScreen/AfterLoadSplashScreen';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignIn/SignUp';
import { DataProvider, useData } from './screens/hooks';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."
]);
LogBox.ignoreLogs(['Sending']);

const Stack = createStackNavigator();

const AppStarting = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDarkMode = useColorScheme() !== 'light';

  const [getStarted, setGetStarted] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [showChallengeStatusNotification, setShowChallengeStatusNotification] = useState(false);

  const [finishedExercisesModalVisible, setFinishedExercisesModalVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();

    DeviceEventEmitter.addListener('showInviteNotification', (_data) => {
      setTimeout(() => {
        toggleNotification(1);
      }, 1000);
    });
    DeviceEventEmitter.addListener('showChallengeStatus', (_data) => null);
    return () => {
      DeviceEventEmitter.removeAllListeners('showInviteNotification');
      DeviceEventEmitter.removeAllListeners('showChallengeStatus');
    };
  });

  function toggleNotification(value: number) {
    if (value) {
      setShowNotification(false);
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }

  function simulateChallengeStatus() {
    setTimeout(() => {
      setShowChallengeStatusNotification(false);
      setShowChallengeStatusNotification(true);
    }, 2000);

    setTimeout(() => {
      setFinishedExercisesModalVisible(true);
    }, 6000);
  }

  return !getStarted ? (
    <AfterLoadSplashScreen onGetStarted={() => setGetStarted(true)} />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingBottom: 0
      }}
    >
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName="SignIn"
          >
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Exercises" component={Exercises} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileNav} />
            <Stack.Screen name="AboutScreen" component={AboutNav} />
            <Stack.Screen name="HelpScreen" component={HelpNav} />
            <Stack.Screen name="NotificationsScreen" component={NotificationsNav} />
          </Stack.Navigator>
        </NavigationContainer>
        <InAppChallengeInviteNotification
          onButtonPress={(button_id: string) => {

            toggleNotification(0);

            if (button_id === 'accept') {
              simulateChallengeStatus();
            }
          }}
          showNotification={showNotification}
          {...values.invite}
        />
        <InAppChallengeStatusNotification
          hideValue={-300}
          participants={values.challengeParticipants}
          autoHide={true}
          showNotification={showChallengeStatusNotification}
          {...values.invite}
        />
        <ChallengeCompleteModal
          visible={finishedExercisesModalVisible}
          onRequestClose={() => {
            setFinishedExercisesModalVisible(false);
          }}
          participants={values.challengeParticipantsResults}
        />
      </View>
    </SafeAreaView>
  );
};

function Exercises() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={'ExerciseStatus'}
    >
      {/* ExerciseStatus */}
      <Stack.Screen
        name="ExerciseStatus"
        component={ExerciseStatus}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name="TodaysExcersies"
        component={TodaysExercisescreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name="ExcersiseTimeAndGuideScreen"
        component={ExcersiseTimeAndGuideScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  );
}

function EditProfileNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  );
}

function NotificationsNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  );
}

function AboutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  );
}

function HelpNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  );
}

// export default App;
export default function App() {
  return (
    <DataProvider>
      <AppStarting />
    </DataProvider>
  );
}
