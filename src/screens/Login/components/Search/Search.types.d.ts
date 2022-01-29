import React from 'react';

export interface SearchProps {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  focused: boolean;
}
