import { BadgeBase, BadgeBaseContainer } from '@components/Badge/Badge.base';
import { BadgeProps } from '@components/Badge/Badge.types';
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
