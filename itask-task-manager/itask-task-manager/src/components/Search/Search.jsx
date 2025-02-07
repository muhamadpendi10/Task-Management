import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';

const Search = ({ text }) => {
  const [search, setSearch] = useState(text);
  const dispatch = useDispatch();
  const handleSearchBarChange = (e) => {
    setSearch(e.target.value);
    dispatch(
      taskListAction[taskListTypes.UPDATE_FILTER_SEARCH](e.target.value)
    );
  };
  return (
    <div className="w-[100%] mb-2">
      <input
        type="text"
        className="w-[100%] p-2 shadow-black-custom rounded-xl font-bold"
        value={search}
        onChange={handleSearchBarChange}
        placeholder="Search Task..."
      />
    </div>
  );
};

export default Search;
