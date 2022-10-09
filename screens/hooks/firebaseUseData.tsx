/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';

export const currentUser = auth().currentUser;
export const Google_Signin = GoogleSignin;
export const onSignUp = async (email: string, password: string, displayName: string) => {
  let returnResponse;
  console.log("Sign Up");
  await auth().createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      await auth().currentUser.updateProfile({
        displayName: displayName,
        photoURL: "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg",
      })
      console.log('Check 1');

      await newAccountBasicOperation(auth()?.currentUser);
      console.log('Check 2');
      returnResponse = ({ status: 'success', message: 'User Added Successfully!' })
    }).catch(err => {
      returnResponse = ({ status: 'fail', message: err })
    });
  return returnResponse;
}
export const onSignIn = async (email: string, password: string) => {
  let response;
  try {
    response = await auth().signInWithEmailAndPassword(email, password);
    return { status: 'success', message: 'Login successful' };
  } catch (error) {
    return { status: 'fail', message: error };
  }
};
export const updateProfile = async (user: any, user_country: string, user_dob: string, user_phoneNumber: string, user_gender: string, user_foot: string, user_inchs: string) => {
  firestore().collection('Users').where('user', '==', user?.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          country: user_country,
          dob: user_dob,
          phoneNumber: user_phoneNumber,
          gender: user_gender,
          foot: user_foot,
          inchs: user_inchs,
        })//not doc.update({foo: "bar"})
      });
      // console.log({ status: 'success', message: 'User Updated Successfully!' })
      return ({ status: 'success', message: 'User Updated Successfully!' })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
    }).catch(function (err) {
      // console.log({ status: 'success', message: err })
      return ({ status: 'fail', message: Error })
    })
}
export const onGoogleButtonPress = async () => {
  // Get the users ID token
  // console.log('Getting users ID token')
  await GoogleSignin.hasPlayServices();
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  const result = await auth().signInWithCredential(googleCredential);
  // console.log(result.user)
  await newAccountBasicOperation(result.user);
  return result;
};
export const onFacebookButtonPress = async () => {
  console.log("Testing")
  const tes = await analytics().logSelectContent({
    content_type: 'clothing',
    item_id: '455'
  })
  console.log(tes)
  // Attempt login with permissions
  // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  // if (result.isCancelled) {
  //   throw 'User cancelled the login process';
  // }

  // // Once signed in, get the users AccesToken
  // const data = await AccessToken.getCurrentAccessToken();

  // if (!data) {
  //   throw 'Something went wrong obtaining access token';
  // }

  // // Create a Firebase credential with the AccessToken
  // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // // Sign-in the user with the credential
  // return auth().signInWithCredential(facebookCredential);
  return true;

}
export const newAccountBasicOperation = async (user: any) => {
  console.log("user.uid")
  const userExist = await firestore().collection('Users').where('user', '==', user.uid)
    .get();

  let isEmpty;
  userExist.forEach(user => {
    isEmpty = user.data();
  });

  if (isEmpty === undefined) {
    firestore().collection('Friends').add({
      friends_list: [],
      user: user?.uid
    }).then(function () {
      // console.log({ status: 'success', message: 'Friends Added successfully!' })
    }).catch((Error) => {
      console.log({ status: 'fail', message: Error });
    })


    await firestore().collection('Users').add({
      email: user.email,
      displayName: user.displayName,
      totalXp: 0,
      country: 'USA',
      dob: '12/12/2017',
      phoneNumber: '+92305-6719020',
      gender: 'male',
      foot: '6',
      inchs: '3',
      photoURL: user.photoURL,
      user: user.uid,
      challengeWin: 0,
      triesSuccessful: 0,
      totalTries: 0,
      PushUps: 0,
      PullUps: 0,
      Squats: 0,
      SitUps: 0,
      Lunges: 0,
      JumpingJacks: 0,
      Planks: 0,
      Burpees: 0,
      exerciseDayTime: 0
    }).then(function () {
      console.log({ status: 'success', message: 'User Added Successfully!' })
    }).catch((Error) => {
      console.log({ status: 'fail', message: Error });
    })
    await firestore().collection('MyExercise').add({
      user: user.uid,
      day: 0,
      today_exercise: [],
      challenge_request: [],
      challenge_details: [],
    }).then(function () {
      console.log({ status: 'success', message: 'User Added Successfully!' })
    }).catch((Error) => {
      console.log({ status: 'fail', message: Error });
    })
  }
  // ===========================================================================

}
export const addXP = async (value_1: number) => {
  try {
    const userRank = await firestore().collection('Users').where('user', '==', auth()?.currentUser?.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ totalXp: parseInt(doc.data().totalXp, 10) + value_1 })//not doc.update({foo: "bar"})
        });
      })
    return ({ status: 'success', message: 'XP Added successfully!' })
  } catch (error) {
    console.log({ status: 'fail', message: error })
    return ({ status: 'fail', message: error })
  }
}
export const notification = async () => {
  let response;
  try {
    response = await firestore().collection('notification').where('user', 'in', [auth()?.currentUser?.uid, 'any']).get();
    const data = await response.docs.map(doc => doc.data());
    return (data)
  } catch (error) {
    console.log({ status: 'fail', message: error })
    return ({ status: 'fail', message: error })
  }
}
export const addFriends = async (userID: string) => {

  try {
    firestore().collection('Friends').where('user', '==', auth()?.currentUser?.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ friends_list: [...doc.data().friends_list, userID] })
        });
      })

    firestore().collection('Friends').where('user', '==', userID)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ friends_list: [...doc.data().friends_list, auth()?.currentUser?.uid] })
        });
      })
    const removeNotifaction = await firestore().collection('notification').where('user', '==', auth().currentUser?.uid).where("friendId", '==', userID).get().then(
      function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      }
    ).catch((err) => {
      console.log({ status: 'success', message: err });
    });
    return ({ status: 'success', message: 'Friend Added successfully!' })
  } catch (error) {
    return ({ status: 'fail', message: error })
  }
};
// const friendsList: any = [];
export const getFriends = async () => {
  try {
    const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth()?.currentUser?.uid)
      .get();
    const friendsListID: any = [];
    const friendsList: any = [];
    await friends_list_IDS.forEach(async function (doc) {
      friendsListID.push(doc.data().friends_list)
    });
    const friends_details = await firestore().collection('Users').where('user', 'in', friendsListID[0]).get()

    await friends_details.forEach(async function (doc) {
      friendsList.push(doc.data())
    });







    return ({ status: 'success', data: friendsList })
  } catch {
    (err: any) => {
      console.log(err);
    }
  }
}
export const getRanking = async () => {
  const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth()?.currentUser?.uid)
    .get();
  const friendsListID: any = [];
  const friendsList: any = [];
  await friends_list_IDS.forEach(async function (doc) {
    friendsListID.push(doc.data().friends_list)
  });
  friendsListID[0].push(auth()?.currentUser.uid)
  const friends_details = await firestore().collection('Users').where('user', 'in', friendsListID[0]).get()
  await friends_details.forEach(async function (doc) {
    friendsList.push(doc.data())
  });

  friendsList.sort(function (a: number, b: number) { return b.totalXp - a.totalXp });

  // =============================================================================================================
  const globalList: any = [];

  const global_details = await firestore().collection('Users').get()
  await global_details.forEach(async function (doc) {
    globalList.push(doc.data())
  });

  globalList.sort(function (a: number, b: number) { return b.totalXp - a.totalXp });

  const data = {
    friend: friendsList,
    global: globalList
  }


  return ({ status: 'success', data: data })
}
export const findFriends = async () => {
  try {
    const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth().currentUser?.uid)
      .get();
    const friendsListID: any = [];
    const friendsList: any = [];
    await friends_list_IDS.forEach(async function (doc) {
      friendsListID.push(doc.data().friends_list)
    });
    friendsListID[0].push(auth().currentUser?.uid)
    const friends_details = await firestore().collection('Users').where('user', 'not-in', friendsListID[0]).get()

    await friends_details.forEach(async function (doc) {
      friendsList.push(doc.data())
    });

    return ({ status: 'success', data: friendsList })
  } catch {
    (err: any) => {
      console.log(err);
    }
  }
}
export const searchFriends = async (input: string) => {
  try {
    const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth().currentUser?.uid)
      .get();
    const friendsListID: any = [];
    const friendsList: any = [];
    await friends_list_IDS.forEach(async function (doc) {
      friendsListID.push(doc.data().friends_list)
    });
    friendsListID[0].push(auth().currentUser?.uid)
    const friends_details = await firestore().collection('Users').where('user', 'not-in', friendsListID[0]).get()

    await friends_details.forEach(async function (doc) {
      if (doc.data().email === input || doc.data().displayName === input) {
        friendsList.push(doc.data())
      }

    });

    // console.log(friendsList)
    return ({ status: 'success', data: friendsList })
  } catch {
    (err: any) => {
      console.log(err);
    }
  }

}
export const sendFriendRequest = async (friend: any) => {
  await firestore().collection('notification').add({
    user: friend.user,
    type: 'invite',
    friendId: auth()?.currentUser?.uid,
    friendName: auth()?.currentUser?.displayName,
    frinedPhotos: auth()?.currentUser?.photoURL,
    title: new Date().toString(),
  }).then(function (m) {
    return ({ status: 'success', message: "Friend Added successfully" });
  }).catch((Error) => {
    return ({ status: 'fail', message: Error });
  })
}
export const getExercises = async () => {
  try {
    const friends_list_IDS = await firestore().collection('Exercise').get();
    const response = [];
    await friends_list_IDS.forEach(async function (doc) {
      response.push(doc.data())
    });
    return ({ status: 'success', data: response })
  } catch {
    (err: any) => {
      console.log(err);
    }
  }
}
export const Statistics = async () => {
  const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth()?.currentUser?.uid)
    .get();
  const friendsListID: any = [];
  const friendsList: any = [];
  await friends_list_IDS.forEach(async function (doc) {
    friendsListID.push(doc.data().friends_list)
  });
  friendsListID[0].push(auth()?.currentUser.uid)
  const friends_details = await firestore().collection('Users').where('user', 'in', friendsListID[0]).get()
  await friends_details?.forEach(async function (doc) {
    friendsList.push(doc.data())
  });
  friendsList.sort(function (a: number, b: number) { return b.totalXp - a.totalXp });
  // =============================================================================================================
  const globalList: any = [];
  const global_details = await firestore().collection('Users').get()
  await global_details?.forEach(async function (doc) {
    globalList.push(doc.data())
  });
  globalList?.sort(function (a: number, b: number) { return b.totalXp - a.totalXp });

  let myRankingNumber = 0;
  let userDetail;
  friendsList?.find(function checkMyRank(ranking) {
    // console.log(ranking)
    myRankingNumber = myRankingNumber + 1;
    userDetail = ranking;
    return ranking.user === auth()?.currentUser.uid;
  });
  let myGlobalRankingNumber = 0;
  globalList?.find(function checkMyRank(ranking) {
    // console.log(ranking)
    myGlobalRankingNumber = myGlobalRankingNumber + 1;
    return ranking.user === auth().currentUser.uid;
  });


  //==========================================================================================
  //Chellange Win Ranking
  const tempChellangeWin = friendsList;
  tempChellangeWin.sort(function (a: number, b: number) { return b.challengeWin - a.challengeWin });
  let myChellangeWinRankingNumber = 0;
  tempChellangeWin?.find(function checkMyRank(ranking) {
    myChellangeWinRankingNumber = myChellangeWinRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================
  //Golbal Chellange Win Ranking
  const tempGlobalChellangeWin = globalList;
  tempGlobalChellangeWin.sort(function (a: number, b: number) { return b.challengeWin - a.challengeWin });
  let myGlobalChellangeWinRankingNumber = 0;
  tempGlobalChellangeWin?.find(function checkMyRank(ranking) {
    myGlobalChellangeWinRankingNumber = myGlobalChellangeWinRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================
  //==========================================================================================1
  const tempPushUps = friendsList;
  tempPushUps.sort(function (a: number, b: number) { return b.pushUps - a.pushUps });
  let myPushUpsRankingNumber = 0;
  tempPushUps?.find(function checkMyRank(ranking) {
    myPushUpsRankingNumber = myPushUpsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================2
  const tempPullUps = friendsList;
  tempPullUps.sort(function (a: number, b: number) { return b.pullUps - a.pullUps });
  let myPullUpsRankingNumber = 0;
  tempPullUps?.find(function checkMyRank(ranking) {
    myPullUpsRankingNumber = myPullUpsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================3
  const tempsitUps = friendsList;
  tempsitUps.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let mySitUpsRankingNumber = 0;
  tempsitUps?.find(function checkMyRank(ranking) {
    mySitUpsRankingNumber = mySitUpsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================4
  const tempsquats = friendsList;
  tempsquats.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let mySquatsRankingNumber = 0;
  tempsquats?.find(function checkMyRank(ranking) {
    mySquatsRankingNumber = mySquatsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================5
  const tempplanks = friendsList;
  tempplanks.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myPlanksRankingNumber = 0;
  tempplanks?.find(function checkMyRank(ranking) {
    myPlanksRankingNumber = myPlanksRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================6
  const tempJumpingJacks = friendsList;
  tempJumpingJacks.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myJumpingJacksRankingNumber = 0;
  tempJumpingJacks?.find(function checkMyRank(ranking) {
    myJumpingJacksRankingNumber = myJumpingJacksRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================7
  const tempburpees = friendsList;
  tempburpees.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myBurpeesRankingNumber = 0;
  tempburpees?.find(function checkMyRank(ranking) {
    myBurpeesRankingNumber = myBurpeesRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================
  const templunges = friendsList;
  templunges.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myLungesRankingNumber = 0;
  templunges?.find(function checkMyRank(ranking) {
    myLungesRankingNumber = myLungesRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================
  //==========================================================================================
  // Global Exercise
  const tempGlobalPushUps = globalList;
  tempGlobalPushUps.sort(function (a: number, b: number) { return b.pushUps - a.pushUps });
  let myGlobalPushUpsRankingNumber = 0;
  tempGlobalPushUps?.find(function checkMyRank(ranking) {
    myGlobalPushUpsRankingNumber = myGlobalPushUpsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================2
  const tempGlobalPullUps = globalList;
  tempGlobalPullUps.sort(function (a: number, b: number) { return b.pullUps - a.pullUps });
  let myGlobalPullUpsRankingNumber = 0;
  tempGlobalPullUps?.find(function checkMyRank(ranking) {
    myGlobalPullUpsRankingNumber = myGlobalPullUpsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================3
  const tempGlobalsitUps = globalList;
  tempGlobalsitUps.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myGlobalSitUpsRankingNumber = 0;
  tempGlobalsitUps?.find(function checkMyRank(ranking) {
    myGlobalSitUpsRankingNumber = myGlobalSitUpsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================4
  const tempGlobalsquats = globalList;
  tempGlobalsquats.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myGlobalSquatsRankingNumber = 0;
  tempGlobalsquats?.find(function checkMyRank(ranking) {
    myGlobalSquatsRankingNumber = myGlobalSquatsRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================5
  const tempGlobalplanks = globalList;
  tempGlobalplanks.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myGlobalPlanksRankingNumber = 0;
  tempGlobalplanks?.find(function checkMyRank(ranking) {
    myGlobalPlanksRankingNumber = myGlobalPlanksRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================6
  const tempGlobalJumpingJacks = globalList;
  tempGlobalJumpingJacks.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myGlobalJumpingJacksRankingNumber = 0;
  tempGlobalJumpingJacks?.find(function checkMyRank(ranking) {
    myGlobalJumpingJacksRankingNumber = myGlobalJumpingJacksRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================7
  const tempGlobalburpees = globalList;
  tempGlobalburpees.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myGlobalBurpeesRankingNumber = 0;
  tempGlobalburpees?.find(function checkMyRank(ranking) {
    myGlobalBurpeesRankingNumber = myGlobalBurpeesRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });
  //==========================================================================================
  const tempGloballunges = globalList;
  tempGloballunges.sort(function (a: number, b: number) { return b.sitUps - a.sitUps });
  let myGlobalLungesRankingNumber = 0;
  tempGloballunges?.find(function checkMyRank(ranking) {
    myGlobalLungesRankingNumber = myGlobalLungesRankingNumber + 1;
    return ranking.user === auth()?.currentUser.uid;
  });


  //==========================================================================================
  const friendExerciseRanking = {
    PushUps: myPushUpsRankingNumber,
    PullUps: myPullUpsRankingNumber,
    SitUps: mySitUpsRankingNumber,
    Squats: mySquatsRankingNumber,
    Planks: myPlanksRankingNumber,
    JumpingJacks: myJumpingJacksRankingNumber,
    Burpees: myBurpeesRankingNumber,
    Lunges: myLungesRankingNumber,
    // friendLength: friendsList.length
  }
  const globalExerciseRanking = {
    PushUps: myGlobalPushUpsRankingNumber,
    PullUps: myGlobalPullUpsRankingNumber,
    SitUps: myGlobalSitUpsRankingNumber,
    Squats: myGlobalSquatsRankingNumber,
    Planks: myGlobalPlanksRankingNumber,
    JumpingJacks: myGlobalJumpingJacksRankingNumber,
    Burpees: myGlobalBurpeesRankingNumber,
    Lunges: myGlobalLungesRankingNumber,
    // globalLength:globalList.length
  }
  const data = {
    friend: friendsList,
    global: globalList,
    userDetail: userDetail,
    myRankingNumber: myRankingNumber,
    myGlobalRankingNumber: myGlobalRankingNumber,
    friendExerciseRanking: friendExerciseRanking,
    globalExerciseRanking: globalExerciseRanking,
    friendLength: friendsList.length,
    globalLength: globalList.length,
    myGlobalChellangeWinRankingNumber: myGlobalChellangeWinRankingNumber,
    myChellangeWinRankingNumber: myChellangeWinRankingNumber,

  }
  return ({ status: 'success', data: data })
}
export const ExercisesStatus = async () => {
  const dateNow = new Date().getTime();
  let doneToday = true;
  let User_Details_list;
  let MyExercise_list;
  await firestore().collection('MyExercise').where('user', '==', auth()?.currentUser?.uid).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        MyExercise_list = doc.data();
        doc.data().today_exercise.forEach(element => {
          if (!element.isDone) {
            doneToday = false
          }
        });
      });
    }).catch(function (err) {
      console.log(err);
    });
  await firestore().collection('Users').where('user', '==', auth()?.currentUser?.uid).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        User_Details_list = doc.data()
      });
    }).catch(function (err) {
      console.log(err);
    });
  let checkDate = parseInt((dateNow - User_Details_list.exerciseDayTime) / 86400000);
  // change here for new day
  // checkDate = 1;
  // doneToday = true;
  console.log(checkDate)
  if (checkDate < 1) {
    console.log("Continue")
    return return_today_Exercise(User_Details_list, MyExercise_list, doneToday)
  } else {

    if (checkDate > 1 || !doneToday) {
      return return_loose_Exercise(User_Details_list, MyExercise_list, doneToday)
      // return ({ status: 'success', message: "You loose and you have to start again" });
    } else {
      return return_NewDay(User_Details_list, MyExercise_list, doneToday)
    }
  }
}
const return_today_Exercise = async (User_Details_list: undefined, MyExercise_list: undefined, doneToday: boolean) => {
  const data = {
    User_Details: User_Details_list,
    MyExercise: MyExercise_list,
    doneToday: doneToday
  }
  return ({ status: 'success', data: data })
}
const return_loose_Exercise = async (User_Details_list: undefined, MyExercise_list: undefined, doneToday: boolean) => {
  console.log("You Fail")
  const friendsListID: any = [];
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          challenge_details: []
        })
      })
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
  const challengeWinner = MyExercise_list?.challenge_details?.map((e) => {
    return e.user;
  })
  // eslint-disable-next-line eqeqeq
  if (challengeWinner[0] !== undefined) {
    await firestore().collection('Users').where('user', 'in', challengeWinner).get().then(
      function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            challengeWin: doc.data().challengeWin + 1
          });
        })
      }
    ).catch((err) => {
      console.log({ status: 'success', message: err });
    });
  }
  //   // --------------------------------------------------------------------------------------------------------------
  const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth()?.currentUser?.uid)
    .get();
  // const friendsListID: any = [];

  await friends_list_IDS.forEach(async function (doc) {
    friendsListID.push(doc.data().friends_list)
  });
  //  // --------------------------------------------------------------------------------------------------------------
  if (challengeWinner[0] !== undefined) {
    await firestore().collection('MyExercise').where('user', 'in', friendsListID[0]).get().then(
      function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let temp = []
          temp = doc.data().challenge_details.map(element => {
            if (element.user !== auth()?.currentUser.uid) {
              return element
            }
            // element
          });
          if (temp[0] == undefined) {
            temp = []
          }
          doc.ref.update({
            challenge_details: temp
          })
        })
      })
  }

  const Exercise = []
  await firestore().collection('Exercise').where('Day', '==', 1).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      Exercise.push(doc.data())
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
  }).catch(function (err) {
    return ({ status: 'fail', message: Error })
  })
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          day: 1,
          today_exercise: Exercise,
        })
      });
    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  await firestore().collection('Users').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          exerciseDayTime: new Date().getTime()
        })
      });

    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  // console.log({ status: 'success', message: "Workout initialize" })
  let MyExercise_list_temp = MyExercise_list;
  MyExercise_list_temp.day = 1;
  MyExercise_list_temp.today_exercise = Exercise;
  const data = {
    User_Details: User_Details_list,
    MyExercise: MyExercise_list_temp,
    doneToday: false
  }
  return ({ status: 'success', data: data })
}
const return_NewDay = async (User_Details_list: undefined, MyExercise_list: undefined, doneToday: boolean) => {
  console.log("Update today")
  //cleck challenge details
  // console.log("=================================================")
  MyExercise_list.challenge_details.forEach(async element => {
    // change here 
    if (((element.endIn - new Date().getTime()) / 86400000) < 0) {
      console.log("Challenge End");
      await firestore().collection('MyExercise').where('user', '==', element.user).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const NewChallenge_details: any[] = []
            // console.log(doc.data().challenge_details[0]);
            // doc.data()?.challenge_details?.forEach(function (challenge){console.log(challenge)});
            doc.data()?.challenge_details?.forEach(async function (challenge: { user: string; xp: number; }) {
              console.log(challenge);
              if (challenge.user == auth()?.currentUser.uid) {
                if (challenge.xp > element.xp) {
                  //update  element.user
                  console.log("Update element.user");
                  await firestore().collection('Users').where('user', '==', element.user).get()
                  .then(function (querySnapshot2) {
                    querySnapshot2.forEach(function (doc2) {
                      doc2.ref.update({
                        challengeWin: doc2.data().challengeWin+1,
                      })
                    });
                  }).catch(function (err) {
                    console.log(err);
                  });
                  console.log("You loose")
                } else {
                  console.log("You win");
                  //update auth()?.currentUser?.uid
                  console.log("Update auth()?.currentUser.uid");
                  await firestore().collection('Users').where('user', '==', auth()?.currentUser?.uid).get()
                  .then(function (querySnapshot2) {
                    querySnapshot2.forEach(function (doc2) {
                      doc2.ref.update({
                        challengeWin: doc2.data().challengeWin+1,
                      })
                    });
                  }).catch(function (err) {
                    console.log(err);
                  });
                }
              } else {
                NewChallenge_details.push(challenge);
              }
            });
            console.log(NewChallenge_details);
            // NewChallenge_details[0] == undefined ? NewChallenge_details = [] : NewChallenge_details = NewChallenge_details;
            console.log("NewChallenge_details");
            doc.ref.update({
              challenge_details: NewChallenge_details,
            })
            // console.log(doc.data().challenge_details.xp>element.xp);
          });
        }).catch(function (err) {
          console.log(err);
        });
    } else {
      console.log("Challenge Not End");
    }
  });
  // =================================================================================
  let newExercise = [];
  await firestore().collection('Exercise').where('Day', '==', (MyExercise_list.day + 1)%30).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      newExercise.push(doc.data());
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
  }).catch(function (err) {
    return ({ status: 'fail', message: Error })
  })
  let new_challenge_details = undefined;
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        new_challenge_details = doc.data().challenge_details?.map(el => {
          //change needed
          if (((el.endIn - new Date().getTime()) / 86400000) > 0) {
            return el;
          }
        });
        new_challenge_details[0] == undefined ? new_challenge_details = [] : new_challenge_details = new_challenge_details;
        doc.ref.update({
          day: (MyExercise_list.day + 1)%30,
          today_exercise: newExercise,
          challenge_details: new_challenge_details
        })
      });
    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  // if()
  let MyExercise_list_temp = MyExercise_list;
  MyExercise_list_temp.day = (MyExercise_list.day + 1)%30;
  MyExercise_list_temp.today_exercise = newExercise;
  MyExercise_list_temp.challenge_details = new_challenge_details;
  const data = {
    User_Details: User_Details_list,
    MyExercise: MyExercise_list_temp,
    doneToday: false
  }
  return ({ status: 'success', data: data })
}
export const ChellangeFriends = async (frinedId) => {
  if (frinedId !== auth()?.currentUser?.uid) {
    const res = await firestore().collection('MyExercise').where('user', '==', frinedId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const check = doc.data().challenge_request.map(e => e.user).indexOf(auth().currentUser?.uid);
          const check2 = doc.data().challenge_details.map(e => e.user).indexOf(auth().currentUser?.uid);
          if (check == -1 && check2 == -1) {
            doc.ref.update({
              challenge_request: [...doc.data().challenge_request, { user: auth()?.currentUser?.uid, displayName: auth()?.currentUser?.displayName, photoURL: auth()?.currentUser?.photoURL }],
            })
          } else {
            return ({ status: 'fail', data: "Already Invite send" })
          }

        })
        return ({ status: 'success', data: "success" })
      }).catch(function (error) {
        console.log(error.message)
        return ({ status: 'fail', data: error })
      })
    return (res)
  } else {
    return ({ status: 'fail', data: "Can not invite " })
  }
};
export const acceptChallenge = async (props) => {
  const Challenge = await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const check = doc.data().challenge_request.map(e => e.user).indexOf(props.user);
        if (check > -1) {
          const temp = doc.data().challenge_request;
          temp.splice(check, 1);
          doc.ref.update({
            challenge_request: temp,
          })
        }
        const check2 = doc.data().challenge_details.map(e => e.user).indexOf(props.user);
        if (check2 == -1) {
          doc.ref.update({
            challenge_details: [...doc.data().challenge_details, { user: props.user, displayName: props.displayName, photoURL: props.photoURL, endIn: (new Date().getTime() + 1296000000), xp: 0 }],
          })
          //==================================================================================
          firestore().collection('MyExercise').where('user', '==', props.user).get().then(
            function (querySnapshot2) {
              querySnapshot2.forEach(function (doc) {
                doc.ref.update({
                  challenge_details: [...doc.data().challenge_details, { user: auth()?.currentUser?.uid, displayName: auth()?.currentUser?.displayName, photoURL: auth()?.currentUser?.photoURL, endIn: (new Date().getTime() + 1296000000), xp: 0 }],
                })
              })
            })

          //======================================================================================== 
        }

      });
      return ({ status: 'success', data: "Request Decline" });
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
}
export const declineChallenge = async (props) => {
  const removeChallenge = await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.ref.delete();
        const check = doc.data().challenge_request.map(e => e.user).indexOf(props.user);
        if (check > -1) {
          const temp = doc.data().challenge_request;
          temp.splice(check, 1);
          doc.ref.update({
            challenge_request: temp,
          })
        }
      });
      return ({ status: 'success', data: "Request Decline" });
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
}
export const startNewExcersise = async () => {
  // await auth().currentUser.updateProfile({
  //   exerciseDayTime: new Date().getTime()
  // })
  const Exercise = []
  await firestore().collection('Exercise').where('Day', '==', 1).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      Exercise.push(doc.data())
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
  }).catch(function (err) {
    return ({ status: 'fail', message: Error })
  })
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          day: 1,
          today_exercise: Exercise,
        })
      });
    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  await firestore().collection('Users').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          exerciseDayTime: new Date().getTime()
        })
      });
    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  // console.log({ status: 'success', message: "Workout initialize" })
  return ({ status: 'success', message: "Workout initialize" });
}
export const completeExcersise = async (exercises, setNumbers) => {
  let MyExercise = []
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        MyExercise = doc.data();
        // doc.ref.update({
        //   isDone:true,
        // })
      })
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
  const temp = MyExercise.today_exercise.map((e) => {
    if (e.title == exercises.title) {
      e.isDone = true;
    }
    return e;
  })
  const temp2 = MyExercise.challenge_details.map((e) => {
    e.xp = e.xp + (exercises.xp * setNumbers);
    return e;
  });
  // MyExercise.today_exercise=temp;
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          today_exercise: temp,
          challenge_details: temp2
        })
      })
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });

  await firestore().collection('Users').where('user', '==', auth().currentUser?.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          totalXp: doc.data().totalXp + (exercises.xp * setNumbers),
          PushUps: exercises.title == 'PushUps' ? doc.data().PushUps + setNumbers : doc.data().PushUps,
          PullUps: exercises.title == 'PullUps' ? doc.data().PullUps + setNumbers : doc.data().PullUps,
          Squats: exercises.title == 'Squats' ? doc.data().Squats + setNumbers : doc.data().Squats,
          SitUps: exercises.title == 'SitUps' ? doc.data().SitUps + setNumbers : doc.data().SitUps,
          Lunges: exercises.title == 'Lunges' ? doc.data().Lunges + setNumbers : doc.data().Lunges,
          JumpingJacks: exercises.title == 'JumpingJacks' ? doc.data().JumpingJacks + setNumbers : doc.data().JumpingJacks,
          Planks: exercises.title == 'Planks' ? doc.data().Planks + setNumbers : doc.data().Planks,
          Burpees: exercises.title == 'Burpees' ? doc.data().Burpees + setNumbers : doc.data().Burpees,
        })//not doc.update({foo: "bar"})
      });
      // console.log({ status: 'success', message: 'User Updated Successfully!' })
      return ({ status: 'success', message: 'User Updated Successfully!' })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
    }).catch(function (err) {
      // console.log({ status: 'success', message: err })
      return ({ status: 'fail', message: Error })
    })
  // console.log(MyExercise);

}
export const restartExercise = async () => {
  let MyExercise = []
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        MyExercise = doc.data();
      })
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
  const temp = MyExercise.today_exercise.map((e) => {
    e.isDone = false;
    return e;
  })
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          today_exercise: temp,
        })
      })
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
  return ({ status: 'success', message: "Reset Exercise!" })
}
export const resetExercise = async () => {
  console.log("resetExercise")
  // console.log({ status: 'success', message: "Reset Exercise!"});
  const friendsListID: any = [];
  let MyExercise = [];
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        MyExercise = doc.data();
        doc.ref.update({
          challenge_details: []
        })
      })
    }
  ).catch((err) => {
    console.log({ status: 'success', message: err });
  });
  const challengeWinner = MyExercise.challenge_details.map((e) => {
    return e.user;
  })
  // eslint-disable-next-line eqeqeq
  if (challengeWinner[0] !== undefined) {
    await firestore().collection('Users').where('user', 'in', challengeWinner).get().then(
      function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            challengeWin: doc.data().challengeWin + 1
          });
        })
      }
    ).catch((err) => {
      console.log({ status: 'success', message: err });
    });
  }
  //   // --------------------------------------------------------------------------------------------------------------
  const friends_list_IDS = await firestore().collection('Friends').where('user', '==', auth()?.currentUser?.uid)
    .get();
  // const friendsListID: any = [];

  await friends_list_IDS.forEach(async function (doc) {
    friendsListID.push(doc.data().friends_list)
  });
  //  // --------------------------------------------------------------------------------------------------------------
  await firestore().collection('MyExercise').where('user', 'in', friendsListID[0]).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let temp = []
        temp = doc.data().challenge_details.map(element => {
          if (element.user !== auth()?.currentUser.uid) {
            return element
          }
          // element
        });
        if (temp[0] == undefined) {
          temp = []
        }
        doc.ref.update({
          challenge_details: temp
        })
      })
    })
  const Exercise = []
  await firestore().collection('Exercise').where('Day', '==', 1).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      Exercise.push(doc.data())
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
  }).catch(function (err) {
    return ({ status: 'fail', message: Error })
  })
  await firestore().collection('MyExercise').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          day: 1,
          today_exercise: Exercise,
        })
      });
    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  await firestore().collection('Users').where('user', '==', auth().currentUser?.uid).get().then(
    function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          exerciseDayTime: new Date().getTime()
        })
      });
    }
  ).catch((err) => {
    return ({ status: 'fail', message: err });
  });
  // console.log({ status: 'success', message: "Workout initialize" })
  return ({ status: 'success', message: "Workout initialize" });
}
export const resetExercise2 = async () => {
  const dateNow = new Date().getTime();
  let doneToday = true;
  let User_Details_list;
  let MyExercise_list;
  await firestore().collection('MyExercise').where('user', '==', auth()?.currentUser?.uid).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        MyExercise_list = doc.data();
        doc.data().today_exercise.forEach(element => {
          if (!element.isDone) {
            doneToday = false
          }
        });
      });
    }).catch(function (err) {
      console.log(err);
    });

  await firestore().collection('Users').where('user', '==', auth()?.currentUser?.uid).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        User_Details_list = doc.data()
      });
    }).catch(function (err) {
      console.log(err);
    });
  const checkDate = parseInt((dateNow - User_Details_list.exerciseDayTime) / 86400000);

  if (checkDate > 1) {
    const data = {
      User_Details: User_Details_list,
      MyExercise: MyExercise_list,
      doneToday: doneToday
    }
    return ({ status: 'success', data: data })
  } else {
    if (checkDate > 1 || doneToday) {
      console.log("You Fail")
    } else {
      console.log("Update today")
    }

  }
}