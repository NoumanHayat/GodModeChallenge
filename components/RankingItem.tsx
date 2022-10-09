import React, { FC, ReactNode, useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, Modal, Text, Image } from 'react-native';
import AppText from './AppText';
import { COLORS, icons } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { Menu, MenuItem } from 'react-native-material-menu';
import { SafeAreaView } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import { useData } from '../screens/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface MenuItem {
  name: string;
  id: string;
}

interface Props {
  name: string;
  points: string;
  image_url: string;
  // user: Array<MenuItem>;
  onMenuItemPress?: Function;
  menu_items?: Array<MenuItem>;
}

export const RankingItem: FC<Props> = (
  { displayName, photoURL, menu_items, rank, totalXp, onMenuItemPress, phoneNumber, email, gender, foot, inchs, user },
  fr
) => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { ChellangeFriends } = useData();

  return (
    <View
      style={{
        padding: 15,
        flex: 1,
        flexDirection: 'row',
        shadowColor: '#00000060',
        backgroundColor: COLORS.white,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginBottom: 20,
        borderRadius: 7
      }}
    >
      <FastImage
        source={{ uri: photoURL }}
        style={{
          width: 45,
          height: 45,
          borderRadius: 25,
          backgroundColor: COLORS.gray,
          marginRight: 10
        }}
      />
      <View style={{ flex: 1 }}>
        <AppText fontWeight="Medium" style={{ fontSize: 18 }}>
          {displayName}
        </AppText>
        <AppText>{totalXp} XP</AppText>
      </View>
      <LinearGradient
        angle={90}
        useAngle={true}
        colors={[COLORS.lightPrimary, COLORS.primary, COLORS.primary]}
        style={{
          width: 45,
          height: 45,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.white }}>
          {rank}
        </AppText>
      </LinearGradient>
      {menu_items && (
        <View
          style={{
            width: 20,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight: -10
          }}
        >
          <Menu
            style={{ marginTop: -7 }}
            visible={visible}
            anchor={
              <TouchableOpacity onPress={showMenu}>
                <FastImage
                  source={icons.vertical_menu}
                  tintColor={COLORS.dark}
                  style={{
                    width: 14,
                    height: 14,
                    color: 'black'
                  }}
                />
              </TouchableOpacity>
            }
            onRequestClose={hideMenu}
          >
            {menu_items.map((menu, index) => (
              <MenuItem
                style={{ height: 30 }}
                key={index}
                onPress={async () => {
                  if (menu.name == 'View Profile') {
                    setModalVisible(true);
                  } else {
                    ChellangeFriends(user)
                      .then((res) => {
                        if (res.status === 'success') {
                          Alert.alert('Challenge Sended Successfully!');
                        } else {
                          Alert.alert(res.data);
                        }
                      })
                      .catch((error) => {
                        console.log(error.message);
                        alert(error.message);
                      });
                  }
                  // hideMenu();
                  // onMenuItemPress ? onMenuItemPress(menu.id) : null;
                }}
              >
                <AppText style={{ fontSize: 12 }}>{menu.name}</AppText>
              </MenuItem>
            ))}
          </Menu>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ margin: 5 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10
                  }}
                  source={require('../assets/icons/close-icon.png')}
                />
              </TouchableOpacity>
            </View>
            {/* ====================================================================================== */}
            <View style={styles.container}>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Avatar.Image
                    source={{
                      uri: photoURL
                    }}
                    size={80}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Title
                      style={[
                        styles.title,
                        {
                          marginTop: 15,
                          marginBottom: 5
                        }
                      ]}
                    >
                      {displayName}
                    </Title>
                  </View>
                </View>
              </View>

              <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <Icon name="map-marker-radius" color="#777777" size={20} />
                  <Text style={{ color: '#777777', marginLeft: 20 }}>Kolkata, India</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="phone" color="#777777" size={20} />
                  <Text style={{ color: '#777777', marginLeft: 20 }}>{phoneNumber}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="email" color="#777777" size={20} />
                  <Text style={{ color: '#777777', marginLeft: 20 }}>{email}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="gender-male-female-variant" color="#777777" size={20} />
                  <Text style={{ color: '#777777', marginLeft: 20 }}>{gender}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="resize" color="#777777" size={20} />
                  <Text style={{ color: '#777777', marginLeft: 20 }}>
                    {foot}' {inchs} ''
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View
                  style={[
                    styles.infoBox,
                    {
                      borderRightColor: '#dddddd',
                      borderRightWidth: 1
                    }
                  ]}
                >
                  <Title>Total XP</Title>
                </View>
                <View style={styles.infoBox}>
                  <Title>{totalXp}</Title>
                </View>
              </View>
            </View>
            {/* ====================================================================================== */}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  // =============================================================
  userInfoSection: {
    marginTop: 20
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
