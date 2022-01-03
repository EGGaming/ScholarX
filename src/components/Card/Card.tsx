import { CardActionsContainer, CardContainer } from '@components/Card/Card.base';
import { CardProps, CardState } from '@components/Card/Card.types';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { View } from 'react-native';

class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      isButton: props.button,
      title: props.headerTitle,
      actions: props.actions,
    };
  }
  render() {
    return (
      <CardContainer>
        <Space direction='vertical' spacing={1}>
          {this.state.title && this.state.title}
          {this.props.children}
          {this.state.actions && (
            <CardActionsContainer>
              <Space spacing={2}>{this.state.actions}</Space>
            </CardActionsContainer>
          )}
        </Space>
      </CardContainer>
    );
  }

  public static Body: React.FC = ({ children }) => {
    return <View>{children}</View>;
  };
}

export default Card;
