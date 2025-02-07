import { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import filtersLogo from '../../assets/images/actions/filters.png';
import { taskListAction } from '../../services/actions/taskListAction';
import {
  filteringTypes,
  listItemTypes,
} from '../../services/reducers/taskListReducer';
import taskListTypes from '../../services/types/taskListTypes';
import FilterChBx from '../Checkbox/FilterChBx';

const Filters = ({ filters }) => {
  const dispatch = useDispatch();
  const checkFilterList = useMemo(
    () => Object.values(filters).flat(),
    [filters]
  );
  const detailFilterList = useMemo(() => {
    return Object.values(listItemTypes).filter(
      (el) => el.settings.filters.hasFilters === true
    );
  }, []);
  // Filter Spring Animation
  const [filterSpringToggle, setFilterSpringToggle] = useState(false);
  const filterSpringRef = useRef();
  const filterSpring = useSpring({
    from: {
      transform: 'translateX(-200%)',
      height: 0,
    },
    config: {
      tension: 150,
    },
    to: {
      height: filterSpringToggle ? filterSpringRef.current.scrollHeight : 0,
      transform: filterSpringToggle ? 'translateX(0)' : 'translateX(-200%)',
    },
  });
  const handleFiltersOpenClose = () => {
    setFilterSpringToggle(!filterSpringToggle);
  };
  const handleCheckBoxClick = (e, name, value) => {
    dispatch(
      taskListAction[taskListTypes.UPDATE_FILTER_DETAIL](
        name,
        value,
        e.target.checked
      )
    );
  };
  return (
    <div className="my-2">
      <button
        onClick={handleFiltersOpenClose}
        className="flex items-center justify-between w-[100%] h-[30px] bg-primary-color p-5 rounded-xl hover:shadow-black-custom transition-all hover:bg-white"
      >
        <img
          src={filtersLogo}
          alt="filters"
          className="h-[30px] w-[30px] mr-2"
        />
        <p className="text-lg font-bold">Filters</p>
      </button>
      <animated.div
        style={filterSpring}
        className="mt-2 w-[100%] bg-custom-white rounded-xl shadow-black-custom overflow-hidden"
        ref={filterSpringRef}
      >
        <div className="p-2 flex gap-3 justify-evenly">
          {detailFilterList.map((item, index) => {
            const detailFilter = item.settings.filters;
            return (
              <div key={index}>
                <div>
                  <ul>
                    <li>{detailFilter.title}</li>
                    {detailFilter.filterType.name ===
                    filteringTypes.SELECT_LIST.name
                      ? item.list.map((listItem) => {
                          return (
                            <li key={listItem.value}>
                              <FilterChBx
                                labelName={listItem.value}
                                value={listItem.name}
                                checked={
                                  checkFilterList.some(
                                    (el) => el === listItem.value
                                  )
                                    ? true
                                    : false
                                }
                                onClick={(e) =>
                                  handleCheckBoxClick(
                                    e,
                                    item.name,
                                    listItem.value
                                  )
                                }
                              />
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </animated.div>
    </div>
  );
};

export default Filters;
