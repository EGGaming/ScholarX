import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import Switch from '@components/Switch/Switch';
import React from 'react';

const StudentDropbox: React.FC<StudentDropboxProps> = ({ withDropbox, onChange }) => {
  return (
    <Card disableAnimation>
      <Space spacing={1} justifyContent='space-between'>
        <Flex shrink direction='column'>
          <Typography bold>Dropbox only?</Typography>
          <Typography variant='caption' color='textSecondary'>
            Only show assignments with a student dropbox.
          </Typography>
        </Flex>
        <Switch checked={withDropbox} onChange={onChange} />
      </Space>
    </Card>
  );
};

export default React.memo(StudentDropbox);
