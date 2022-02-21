import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import TextField from '@components/TextField/TextField';
import Typography from '@components/Typography/Typography';
import React from 'react';
import Icon from '@components/Icon/Icon';
import { PasswordFieldProps } from '@shared/PasswordField/PasswordField.types';
import { TextInput } from 'react-native';

const PasswordField = React.forwardRef((props: PasswordFieldProps, ref) => {
  const { passwordError, password, hidePassword, toggleHidePassword, onChangeText, onSubmit } = props;
  return (
    <Space direction='vertical' spacing={0.5}>
      <Typography>Password</Typography>
      <TextField
        ref={ref}
        error={passwordError}
        width='100%'
        value={password}
        secureTextEntry={hidePassword}
        adornmentEnd={
          <IconButton
            icon={<Icon bundle='Feather' name={hidePassword ? 'eye-off' : 'eye'} />}
            onPress={toggleHidePassword}
          />
        }
        placeholder='Password'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Space>
  );
});

export default React.memo(PasswordField);
