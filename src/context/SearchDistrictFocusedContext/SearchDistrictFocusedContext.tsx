import { UseState } from '@context/helpers';
import React from 'react';

const SearchDistrictFocusedContext = React.createContext<UseState<boolean>>({} as any);

export const useSearchFocused = () => React.useContext(SearchDistrictFocusedContext);

const SearchDistrictFocusedProvider: React.FC = ({ children }) => {
  const [focused, setFocused] = React.useState<boolean>(false);

  return (
    <SearchDistrictFocusedContext.Provider value={[focused, setFocused]}>
      {children}
    </SearchDistrictFocusedContext.Provider>
  );
};

export default SearchDistrictFocusedProvider;
