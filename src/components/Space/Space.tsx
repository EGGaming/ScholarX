import { SpaceBase, SpaceBaseContainer } from '@components/Space/Space.base';
import { SpaceProps } from '@components/Space/Space.types';
import React from 'react';

const Space: React.FC<SpaceProps> = (props) => {
  const { spacing, children, direction = 'horizontal', justifyContent = 'flex-start', alignItems = 'stretch' } = props;

  return (
    <SpaceBaseContainer
      direction={direction}
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      style={{ justifyContent }}>
      {React.Children.map(children, (child, index) => {
        switch (index) {
          default:
            return (
              <React.Fragment>
                {child}
                <SpaceBase
                  spacing={spacing}
                  direction={direction}
                  justifyContent={justifyContent}
                  alignItems={alignItems}
                />
              </React.Fragment>
            );
          case React.Children.count(children) - 1:
            return <React.Fragment>{child}</React.Fragment>;
        }
      })}
    </SpaceBaseContainer>
  );
};

export default Space;
