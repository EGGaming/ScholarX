import Typography from '@components/Typography/Typography';
import React from 'react';
import { ChipBase, ChipBaseContainer } from './Chip.base';
import { ChipProps } from './Chip.types';

const Chip: React.FC<ChipProps> = (props) => {
  const { onPress = () => void 0, title, color } = props;

  return (
    <ChipBase color={color}>
      <ChipBaseContainer color={color}>
        <Typography>{title}</Typography>
      </ChipBaseContainer>
    </ChipBase>
  );
};
