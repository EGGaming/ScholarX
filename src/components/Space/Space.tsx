import { SpaceBase, SpaceBaseContainer } from '@components/Space/Space.base';
import { SpaceProps } from '@components/Space/Space.types';
import React from 'react';

const Space: React.FC<SpaceProps> = (props) => {
  const {
    spacing,
    children,
    direction = 'horizontal',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    container = false,
    grow = false,
    shrink = false,
    divider = false,
    containerProps = {},
  } = props;

  return (
    <SpaceBaseContainer
      container={container}
      containerProps={containerProps}
      grow={grow}
      shrink={shrink}
      direction={direction}
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      divider={divider}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          switch (index) {
            default:
              return (
                <React.Fragment>
                  {child}
                  <SpaceBase
                    containerProps={containerProps}
                    grow={grow}
                    shrink={shrink}
                    container={container}
                    spacing={spacing}
                    direction={direction}
                    justifyContent={justifyContent}
                    alignItems={alignItems}
                    divider={divider}
                  />
                </React.Fragment>
              );
            case React.Children.count(children) - 1:
              return <React.Fragment>{child}</React.Fragment>;
          }
        }
      })}
    </SpaceBaseContainer>
  );
};

export default Space;
