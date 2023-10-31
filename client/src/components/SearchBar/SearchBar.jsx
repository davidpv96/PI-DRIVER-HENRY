import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDriversByName } from '../../redux/actions-types';

const SearchBar = ()=>{
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchDriversByName(searchQuery));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar conductores por nombre"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;