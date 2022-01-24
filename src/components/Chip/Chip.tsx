import Typography from '@components/Typography/Typography';
import React from 'react';
import { ChipBase, ChipBaseContainer, ChipBaseText, ChipBaseFeedbackContainer } from './Chip.base';
import { ChipProps } from './Chip.types';

const Chip: React.FC<ChipProps> = (props) => {
  const { onPress = () => void 0, title, color = 'primary', hexColor = '' } = props;

  return (
    <ChipBaseFeedbackContainer>
      <ChipBase color={color} hexColor={hexColor}>
        <ChipBaseContainer color={color} hexColor={hexColor}>
          <ChipBaseText color={color} hexColor={hexColor}>
            {title}
          </ChipBaseText>
        </ChipBaseContainer>
      </ChipBase>
    </ChipBaseFeedbackContainer>
  );
};

export default Chip;
