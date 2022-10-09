import React, { FC } from 'react';
import { Modal, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppText from '../../components/AppText';
import ModalLayout from '../../components/ModalLayout';
import { COLORS, values } from '../../constants';

interface ModalProps {
  visible: boolean;
  participants: Array<any>;
  onRequestClose: () => any;
}

export const ChallengeCompleteModal: FC<ModalProps> = ({ visible = false, participants, onRequestClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => {
      onRequestClose();
    }}
  >
    <ModalLayout
      onClose={() => {
        onRequestClose();
      }}
    >
      <View
        style={{
          height: 150,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FastImage style={{ width: 99, height: 99 }} source={values.trophyImage} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <AppText fontWeight="SemiBold" style={{ fontSize: 28, color: COLORS.primary }}>
          Bravo! 🎉
        </AppText>
        <AppText fontWeight="Medium" style={{ fontSize: 14, color: COLORS.dark }}>
          You’ve won the Challenge with Sara
        </AppText>
      </View>
      <View
        style={{
          paddingTop: 20
        }}
      >
        {participants.map((participant: any, index: number) => (
          <ChallengeParticipantsResutls
            isWinner={!!index}
            key={`ChallengeParticipantsResutls_${index}`}
            {...participant}
          />
        ))}
      </View>
    </ModalLayout>
  </Modal>
);

export const ChallengeParticipantsResutls: FC<any> = ({ name, duration, image_url, isWinner }) => {
  return (
    <View
      style={{
        padding: 15,
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
        marginBottom: 10,
        alignItems: 'center'
      }}
    >
      <FastImage
        source={{ uri: image_url }}
        style={{
          width: 45,
          height: 45,
          borderRadius: 25,
          backgroundColor: COLORS.gray,
          marginRight: 10
        }}
      />

      <AppText fontWeight="SemiBold" style={{ fontSize: 11, flex: 1 }}>
        {name}
      </AppText>
      <AppText fontWeight="SemiBold" style={{ fontSize: 16 }}>
        {duration}
      </AppText>
      {isWinner && (
        <View
          style={{
            position: 'absolute',
            left: 5,
            top: 5,
            width: 25,
            height: 25,
            borderRadius: 25,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFEFCC'
          }}
        >
          <FastImage
            source={values.trophyImage}
            style={{
              width: 15,
              height: 15
            }}
          />
        </View>
      )}
    </View>
  );
};
