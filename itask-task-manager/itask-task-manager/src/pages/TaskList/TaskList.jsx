import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import TaskListTable from '../../layouts/TaskListTable/TaskListTable';
import { taskListAction } from '../../services/actions/taskListAction';
import { listItemTypes } from '../../services/reducers/taskListReducer';
import taskListTypes from '../../services/types/taskListTypes';
import deleteImage from '../../assets/images/actions/delete.png';
import editImage from '../../assets/images/actions/edit.png';
import { useNavigate } from 'react-router-dom';
import Filters from '../../components/Filters/Filters';
import { pageMaxLimit } from '../../config/Constants';
const TaskList = () => {
  // Navigation
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const taskList = useSelector(taskListAction[taskListTypes.READ_TASK_LIST]);
  const filters = useSelector(taskListAction[taskListTypes.READ_FILTER_FIELD]);
  // Task Types that Will Be shown in table
  const showInTableTaskTypes = useMemo(() => {
    return Object.values(listItemTypes).filter(
      (item) => item.settings.showInTable
    );
  }, []);

  // Getting list length
  const taskListLength = useMemo(() => taskList.length, [taskList]);

  // Pagination Part
  const [page, setPage] = useState(0);
  const showList = useMemo(() => {
    const revList = taskList.slice();
    const newList = [];
    for (
      let j = 0, i = page * pageMaxLimit + j;
      j < pageMaxLimit;
      j++, i = page * pageMaxLimit + j
    ) {
      revList[i] ? newList.push(revList[i]) : (j = pageMaxLimit);
    }
    return newList;
  }, [page, taskList]);
  const pageCount = Math.ceil(taskList.length / pageMaxLimit);
  const pageArr = new Array(pageCount).fill(0);
  const handlePageChange = (pg) => {
    if (pg !== page) setPage(pg);
  };

  // Getting Table Head Row
  const getTableHeadRow = (item, index) => {
    const isAvailableAsc = item.settings.asc;
    const { isAsc, field } = filters.asc;
    return (
      <th
        className={`p-2 whitespace-nowrap cursor-default min-w-max ${
          isAvailableAsc ? 'hover:bg-blue-800 hover:cursor-pointer' : ''
        }`}
        onClick={isAvailableAsc ? () => handleAscBtn(item) : null}
        key={index}
      >
        {item.settings.title}
        {isAvailableAsc ? (
          typeof isAsc === 'boolean' && field === item.name ? (
            isAsc ? (
              <span> &#8595;</span>
            ) : (
              <span> &#8593;</span>
            )
          ) : (
            <span> &#8593;&#8595;</span>
          )
        ) : null}
      </th>
    );
  };
  // Getting Table Row
  const getTableRow = (task, item, index) => {
    const settings = item.settings;
    let data = task[item.name];
    if (settings.changeData.change) {
      data = settings.changeData.mutateData(data);
    }
    return (
      <td
        key={index + index * 3}
        className={`min-w-max ${settings.style.classes} ${
          filters.asc.field === item.name ? 'bg-custom-gray font-bold' : ''
        }`}
        style={
          settings.style.hasColor
            ? { backgroundColor: task[item.name].color }
            : {}
        }
      >
        {data}
      </td>
    );
  };

  // Use Effects To Save Page
  useEffect(() => {
    setPage(0);
  }, [taskListLength]);
  useEffect(() => {
    setPage(localStorage.getItem('page') ? +localStorage.getItem('page') : 0);
  }, []);
  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page, taskListLength]);

  // Handle Functions
  const handleTaskEdit = (taskInfo) => {
    navigate('/edit/' + taskInfo.id, {
      state: { task: taskInfo, isValid: true, page: 'edit' },
    });
  };
  const handleTaskDelete = (taskInfo) => {
    dispatch(
      taskListAction[taskListTypes.DELETE_TASK](
        taskInfo.id,
        !taskInfo.finishStatus
      )
    );
  };
  const handleAscBtn = (typeInfo) => {
    dispatch(taskListAction[taskListTypes.UPDATE_FILTER_ASC](typeInfo.name));
  };

  return (
    <div className="mx-5 my-5">
      <div className="mb-2">
        <Filters filters={filters.detail} />
        <Search text={filters.search} />
      </div>
      <TaskListTable>
        <thead className="text-center bg-primary-color text-white font-bold">
          <tr>
            <th className="p-2 cursor-default whitespace-nowrap min-w-max">
              №
            </th>
            {showInTableTaskTypes.map((item, index) => {
              return getTableHeadRow(item, index);
            })}
            <th className="p-2 cursor-default whitespace-nowrap min-w-max">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="cursor-default bg-white [&>*>td]:py-2 [&>*>td]:px-3">
          {showList.map((task, index) => {
            return (
              <tr key={index} className="hover:bg-custom-white cursor-pointer">
                <td className="font-bold">{index + 1}</td>
                {showInTableTaskTypes.map((item, index) => {
                  return getTableRow(task, item, index);
                })}
                <td className="min-w-max min-h-max hover-animate-action">
                  <div className="flex sm:flex-row flex-wrap flex-col justify-center items-center gap-2 [&>img]:h-[30px] [&>img]:cursor-pointer">
                    <img
                      src={editImage}
                      alt="edit"
                      onClick={() => handleTaskEdit(task)}
                    />
                    <img
                      src={deleteImage}
                      alt="delete"
                      onClick={() => handleTaskDelete(task)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TaskListTable>
      <div className="flex justify-center gap-2 w-[100%] mt-3">
        {pageArr.map((_, index) => (
          <div
            onClick={() => handlePageChange(index)}
            key={index}
            className={`px-2 py-1 cursor-pointer rounded border font-bold text-white bg-primary-color transition-all shadow-lg ${
              page === index
                ? 'text-white bg-sec-color'
                : 'hover:bg-white hover:text-black'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
