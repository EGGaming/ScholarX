import { ButtonBase } from '@components/Button/Button.base';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  ChipBaseContainer,
  ChipBaseText,
  ChipBaseFeedbackContainer,
  ChipBaseButtonRemoveContainer,
  ChipBaseButtonBaseRemoveContainer,
} from './Chip.base';
import { ChipProps } from './Chip.types';

const Chip: React.FC<ChipProps> = (props) => {
  const { onPress = () => void 0, title, color = 'primary', hexColor = '', onRemove } = props;
  const theme = useAppTheme();

  return (
    <>
      <ChipBaseFeedbackContainer>
        <ButtonBase round color={color} hexColor={hexColor}>
          <ChipBaseContainer color={color} hexColor={hexColor}>
            <Space spacing={1} justifyContent='space-between' alignItems='center'>
              <ChipBaseText color={color} hexColor={hexColor}>
                {title}
              </ChipBaseText>
              {onRemove && (
                <ChipBaseButtonRemoveContainer>
                  <ButtonBase onPress={onRemove}>
                    <ChipBaseButtonBaseRemoveContainer color={color} hexColor={hexColor}>
                      <Icon
                        bundle='AntDesign'
                        name='close'
                        color='inherit'
                        hexColor={theme.palette.getContrastText(theme.palette.toColorValue(color))}
                      />
                    </ChipBaseButtonBaseRemoveContainer>
                  </ButtonBase>
                </ChipBaseButtonRemoveContainer>
              )}
            </Space>
          </ChipBaseContainer>
        </ButtonBase>
      </ChipBaseFeedbackContainer>
    </>
  );
};

export default Chip;
