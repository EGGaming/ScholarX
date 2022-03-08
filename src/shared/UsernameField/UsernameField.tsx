import Space from '@components/Space/Space';
import TextField from '@components/TextField/TextField';
import Typography from '@components/Typography/Typography';
import { UsernameFieldProps } from '@shared/UsernameField/UsernameField.types';
import isViewport from '@utilities/isViewport';
import React from 'react';

const UsernameField: React.FC<UsernameFieldProps> = (props) => {
  const { onChangeText, onUsernameSubmit, usernameError, username } = props;
  return (
    <Space direction='vertical' spacing={0.5}>
      <Typography>Username</Typography>
      <TextField
        size={isViewport('xs') ? 'small' : 'medium'}
        onSubmitEditing={onUsernameSubmit}
        error={usernameError}
        width='100%'
        value={username}
        placeholder='Username'
        onChangeText={onChangeText}
        blurOnSubmit={false}
      />
      ;
    </Space>
  );
};

export default React.memo(UsernameField);
