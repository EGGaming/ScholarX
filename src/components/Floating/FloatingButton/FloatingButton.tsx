import { NativeButtonBase } from '@components/Button/Button.base';
import {
  FloatingBaseButtonContainer,
  FloatingButtonContainer,
} from '@components/Floating/FloatingButton/FloatingButton.base';
import { FloatingButtonProps } from '@components/Floating/FloatingButton/FloatingButton.types';
import React from 'react';

const FloatingButton: React.FC<FloatingButtonProps> = (props) => {
  const { icon, onPress = () => void 0, color = 'primary' } = props;
  return (
    <FloatingBaseButtonContainer icon={icon} onPress={onPress} color={color}>
      <NativeButtonBase onPress={onPress}>
        <FloatingButtonContainer>{icon}</FloatingButtonContainer>
      </NativeButtonBase>
    </FloatingBaseButtonContainer>
  );
};

export default FloatingButton;
