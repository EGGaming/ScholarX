import React from 'react';
import { EducationImage, ErrorImage, NoAssignmentsImage, NotFoundImage, LocationImage } from './Illustration.base';
import { IllustrationProps } from './Illustration.types';

const Illustration: React.FC<IllustrationProps> = ({ type }) => {
  switch (type) {
    case 'education':
      return <EducationImage />;
    case 'error':
      return <ErrorImage />;
    case 'location':
      return <LocationImage />;
    case 'no-assignments':
      return <NoAssignmentsImage />;
    case 'not-found':
      return <NotFoundImage />;
  }
};

export default Illustration;
