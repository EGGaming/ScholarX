import Chip from '@components/Chip/Chip';
import Flex from '@components/Flex/Flex';
import Typography from '@components/Typography/Typography';
import { useViewingClass } from '@context/ViewingClassContext/ViewingClassContext';
import _ from 'lodash';
import React from 'react';

const ShowOnlyCategories: React.FC = () => {
  const [studentClass] = useViewingClass();
  const availableCategories: string[] = (() => {
    const allCategories = studentClass?.assignments.map((assignment) => assignment.type);
    const categories = _.uniq(allCategories) ?? [];
    return categories;
  })();

  return (
    <Flex direction='column'>
      {availableCategories.map((category) => (
        <Chip title={category} onRemove={() => {}} />
      ))}
    </Flex>
  );
};

export default React.memo(ShowOnlyCategories);
