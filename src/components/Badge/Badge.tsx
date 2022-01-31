import { BadgeBase, BadgeBaseContainer, BadgeText } from '@components/Badge/Badge.base';
import { BadgeProps } from '@components/Badge/Badge.types';
import Typography from '@components/Typography/Typography';
import React from 'react';

const Badge: React.FC<BadgeProps> = (props) => {
  const { badgeCount, color = 'primary', hexColor = '', children } = props;

  if (badgeCount === 0) return <React.Fragment>{children}</React.Fragment>;

  return (
    <BadgeBaseContainer>
      {children}
      <BadgeBase badgeCount={badgeCount} color={color} hexColor={hexColor} />
    </BadgeBaseContainer>
  );
};

export default Badge;
