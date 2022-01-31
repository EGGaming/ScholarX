import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { FieldProps } from '@shared/Field/Field.types';
import React from 'react';

const Field: React.FC<FieldProps> = (props) => {
  const { reveal, hint, text, title } = props;
  const [visible, toggle] = React.useReducer((s) => !s, false);
  const visibleText = React.useMemo(() => {
    if (reveal) {
      if (hint) {
        const hintText = (hint.exec(text) ?? [''])[0];
        const hiddenText = text.replace(/\w/g, '*');
        return visible ? text : hiddenText.substring(0, hiddenText.length - hintText.length) + hintText;
      }
      return visible ? text : text.replace(/\w/g, '*');
    }
    return text;
  }, [text, reveal, visible]);
  function onPress() {
    toggle();
  }
  return (
    <Flex direction='column'>
      {reveal ? (
        <Space spacing={1} alignItems='center'>
          <Typography variant='body2' color='textSecondary'>
            {title}
          </Typography>
          <IconButton
            icon={visible ? <Icon bundle='Feather' name='eye' /> : <Icon bundle='Feather' name='eye-off' />}
            onPress={onPress}
          />
        </Space>
      ) : (
        <Typography variant='body2' color='textSecondary'>
          {title}
        </Typography>
      )}
      <Typography>{visibleText}</Typography>
    </Flex>
  );
};

export default React.memo(Field);
