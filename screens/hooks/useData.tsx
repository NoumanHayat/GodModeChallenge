import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  onSignUp,
  onSignIn,
  onGoogleButtonPress,
  Google_Signin,
  currentUser,
  onFacebookButtonPress,
  addXP,
  updateProfile,
  newAccountBasicOperation,
  getFriends,
  getRanking,
  findFriends,
  searchFriends,
  sendFriendRequest,
  notification,
  addFriends,
  getExercises,
  Statistics,
  ExercisesStatus,
  ChellangeFriends,
  acceptChallenge,
  declineChallenge,
  startNewExcersise,
  completeExcersise,
  restartExercise,
  resetExercise
} from './firebaseUseData';
import { COLORS, icons, values } from '../../constants';

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  // eslint-disable-next-line react-hooks/exhaustive-deps
const [exercises, setExcersise] = useState([
    {
      title: "Todays's Exercise",
      sub_title: "You've to complete whole set twice",
      type: 'header',
      image: require('../../assets/temp/excercise-banner.png'),
      data: [
        {
          title: 'Biginner',
          type: 'header_item'
        },
        {
          title: '10 minutes',
          type: 'header_item'
        },
        {
          title: '8 Exercises',
          type: 'header_item'
        }
      ]
    },
    {
      title: 'Exercise Activity',
      type: 'exercises',
      data: values.exercises
    }
  ]);
  const contextValue = {
    onSignUp,
    onSignIn,
    onGoogleButtonPress,
    Google_Signin,
    getFriends,
    currentUser,
    addXP,
    updateProfile,
    onFacebookButtonPress,
    newAccountBasicOperation,
    getRanking,
    findFriends,
    searchFriends,
    sendFriendRequest,
    notification,
    addFriends,
    getExercises,
    exercises,
    setExcersise,
    Statistics,
    ExercisesStatus,
    ChellangeFriends,
    acceptChallenge,
    declineChallenge,
    startNewExcersise,
    completeExcersise,
    restartExercise,
    resetExercise
  };
  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
