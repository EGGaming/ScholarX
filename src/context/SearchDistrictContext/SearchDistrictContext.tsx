import { UseState } from '@context/helpers';
import React from 'react';

const SearchDistrictContext = React.createContext<UseState<string>>({} as any);

export const useSearch = () => React.useContext(SearchDistrictContext);

const SearchDistrictProvider: React.FC = ({ children }) => {
  const [search, setSearch] = React.useState('');

  return <SearchDistrictContext.Provider value={[search, setSearch]}>{children}</SearchDistrictContext.Provider>;
};

export default SearchDistrictProvider;
