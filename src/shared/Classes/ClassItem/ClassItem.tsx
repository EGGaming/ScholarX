import Container from '@components/Container/Container';
import ListItem from '@components/List/ListItem';
import Typography from '@components/Typography/Typography';
import { StudentClassAssignment } from '@utilities/StudentVue/types';
import { RenderItemProps } from '@utilities/TypeUtilities';
import React from 'react';
import { ListRenderItem } from 'react-native';

const ClassItem: React.FC<StudentClassAssignment> = React.memo((props) => {
  return (
    <ListItem
      expandContent={
        <Container>
          <Typography>{props.gradebookId}</Typography>
        </Container>
      }>
      <Typography>{props.name}</Typography>
    </ListItem>
  );
});

const RenderClassItem: ListRenderItem<StudentClassAssignment> = ({ item }) => {
  return <ClassItem {...item} />;
};

export default RenderClassItem;
