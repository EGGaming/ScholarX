import React from 'react';

export interface SearchProps {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  focused: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}
