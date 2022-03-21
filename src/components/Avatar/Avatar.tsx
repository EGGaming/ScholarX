import { AvatarBase, AvatarContainer } from '@components/Avatar/Avatar.base';
import { AvatarProps } from '@components/Avatar/Avatar.types';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import { useStudentInfo } from '@context/StudentInfoContext/StudentInfoContext';
import { useBottomTabNavigation } from '@navigators/BottomTab/BottomTab';
import React from 'react';
import { Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Avatar: React.FC<AvatarProps> = (props) => {
  const { size = 'medium' } = props;
  const navigation = useBottomTabNavigation();
  const [studentInfo] = useStudentInfo();
  function handleOnPress() {
    navigation.navigate('Profile');
  }

  if (studentInfo)
    return (
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <AvatarContainer size={size}>
          <AvatarBase base64={studentInfo.photo} size={size} source={{}} />
        </AvatarContainer>
      </TouchableWithoutFeedback>
    );

  return null;
};

export default Avatar;
