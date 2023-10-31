import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortDriversByName, sortDriversByDob } from '../../redux/actions-types';

const Sort = () => {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState('nameAsc');

  const handleSortChange = (event) => {
    const sortType = event.target.value;
    setSelectedSort(sortType);

    if (sortType === 'nameAsc') {
      dispatch(sortDriversByName('asc'));
    } else if (sortType === 'nameDesc') {
      dispatch(sortDriversByName('desc'));
    } else if (sortType === 'dobAsc') {
      dispatch(sortDriversByDob('asc'));
    } else if (sortType === 'dobDesc') {
      dispatch(sortDriversByDob('desc'));
    }
  };

  return (
    <div>
      <label>
        Sort by:
        <select value={selectedSort} onChange={handleSortChange}>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="dobAsc">DOB (Asc)</option>
          <option value="dobDesc">DOB (Desc)</option>
        </select>
      </label>
    </div>
  );
};

export default Sort;