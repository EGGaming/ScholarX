import React from 'react';

export interface CardProps {
  headerTitle?: React.ReactElement<any>;
  button?: boolean;
  actions?: React.ReactElement<any>[];
}

export interface CardState {
  title?: React.ReactElement<any>;
  isButton?: boolean;
  actions?: React.ReactElement<any>[];
}
