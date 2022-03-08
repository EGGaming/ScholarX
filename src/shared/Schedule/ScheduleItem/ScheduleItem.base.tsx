import Card from '@components/Card/Card';
import { ScheduleItemCardProps } from '@shared/Schedule/ScheduleItem/ScheduleItem.types';
import styled, { css } from 'styled-components/native';

export const ScheduleItemCard = styled(Card)<ScheduleItemCardProps>`
  ${(props) => {
    if (props.isOccuring)
      return css`
        border-left-color: ${props.theme.palette.success.main};
        border-left-width: 5px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      `;
  }}
`;
