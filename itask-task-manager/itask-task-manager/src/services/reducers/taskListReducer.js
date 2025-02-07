import taskListTypes from '../types/taskListTypes';
import { v4 as uuid } from 'uuid';
import { getDate, getDateTimeLocal } from '../../utils/dateTime';
import { toast } from 'react-toastify';

// Notifications
const notifyTaskDelete = () =>
  toast.success('Task Deleted', {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: 'dark',
  });

// Work With Data
export const taskPlaceList = [
  { value: 'Work', name: 'work' },
  { value: 'Home', name: 'home' },
  { value: 'In Street', name: 'street' },
];
export const taskStateList = [
  { value: 'Created', name: 'created', color: 'rgb(84,84,232)' },
  { value: 'In Progress', name: 'progress', color: 'rgb(255,132,1)' },
  { value: 'Finished', name: 'finished', color: 'rgb(50,174,14)' },
];

const createListItemType = (
  settings,
  name,
  create = false,
  edit = false,
  createEditField = {},
  defValue = '',
  list = null
) => ({
  settings,
  name,
  create,
  edit,
  defValue,
  createEditField,
  list,
});

export const filteringTypes = {
  SELECT_LIST: {
    name: 'select-list',
    listType: 'checkbox',
  },
};

export const listItemTypes = {
  ID: createListItemType(
    {
      showInTable: false,
      title: 'ID',
      asc: false,
      search: false,
      filters: {
        hasFilters: false,
      },
      style: {
        classes: '',
        hasColor: false,
      },
      changeData: {
        change: false,
      },
    },
    'id'
  ),
  NAME: createListItemType(
    {
      showInTable: true,
      title: 'Name',
      asc: true,
      search: true,
      filters: {
        hasFilters: false,
      },
      style: {
        classes: '',
        hasColor: false,
      },
      changeData: {
        change: false,
      },
    },
    'name',
    true,
    true,
    {
      type: 'text',
      title: 'Enter Name',
      plHolder: 'Name',
    }
  ),
  DESC: createListItemType(
    {
      showInTable: true,
      title: 'Description',
      asc: false,
      search: true,
      filters: {
        hasFilters: false,
      },
      style: {
        classes: '',
        hasColor: false,
      },
      changeData: {
        change: false,
      },
    },
    'desc',
    true,
    true,
    {
      type: 'text-area',
      title: 'Enter Description',
      plHolder: 'Description',
    }
  ),
  PLACE: createListItemType(
    {
      showInTable: true,
      title: 'Place To Do',
      asc: true,
      search: true,
      filters: {
        hasFilters: true,
        title: 'Select Place',
        filterType: filteringTypes.SELECT_LIST,
      },
      style: {
        classes: 'text-center',
        hasColor: false,
      },
      changeData: {
        change: true,
        mutateData: (data) => {
          return data.value;
        },
      },
    },
    'place',
    true,
    true,
    {
      type: 'select',
      title: 'Select Place To Do That Task',
      plHolder: '',
    },
    taskPlaceList[0],
    taskPlaceList
  ),
  FINISH_STATUS: createListItemType(
    {
      showInTable: true,
      title: 'Status',
      asc: false,
      search: true,
      filters: {
        hasFilters: true,
        title: 'Select Status',
        filterType: filteringTypes.SELECT_LIST,
      },
      style: {
        classes: 'text-center text-white font-bold',
        hasColor: true,
      },
      changeData: {
        change: true,
        mutateData: (data) => {
          return data.value;
        },
      },
    },
    'finishStatus',
    false,
    true,
    {
      type: 'select',
      title: 'Select Task Status',
      plHolder: '',
    },
    taskStateList[0],
    taskStateList
  ),
  FINISH_DATE: createListItemType(
    {
      showInTable: true,
      title: 'Finish Date',
      asc: false,
      search: true,
      filters: {
        hasFilters: false,
      },
      style: {
        classes: 'text-center',
        hasColor: false,
      },
      changeData: {
        change: true,
        mutateData: (data) => {
          return getDate(data);
        },
      },
    },
    'finishDate',
    true,
    true,
    {
      type: 'date-time',
      title: 'Choose finish date',
      plHolder: '',
    },
    getDateTimeLocal(new Date())
  ),
};

const taskListInitialState = {
  filters: {
    search: '',
    asc: { isAsc: null, field: '' },
    detail: {},
  },
  list: [],
};

export const createListItem = () => {
  const newItem = Object.fromEntries(
    Object.keys(listItemTypes)
      .slice()
      .map((type) => [listItemTypes[type].name, listItemTypes[type].defValue])
  );
  newItem[listItemTypes.ID.name] = uuid();
  return newItem;
};

// Initialize Data
const initialTaskListState = () => {
  let list = taskListInitialState;
  if (localStorage.getItem('taskList')) {
    list = JSON.parse(localStorage.getItem('taskList'));
  }
  return list;
};

const saveDataInLocalStorage = (curState) => {
  localStorage.setItem('taskList', JSON.stringify(curState));
};

// Reducers
export const taskListReducer = (state = initialTaskListState(), action) => {
  const type = action.type ?? '';
  let list = state.list;
  let filters = Object.assign({}, state.filters);
  const actionTypes = {
    // Adding New Task
    [taskListTypes.CREATE_NEW_TASK]: () => {
      let list = state.list;
      list.push(action.payload);
      saveDataInLocalStorage(state);
      return {
        ...state,
        list,
      };
    },
    // Update Task
    [taskListTypes.UPDATE_TASK_LIST_ITEM]: () => {
      const index = list.findIndex((item) => item.id === action.payload.id);
      list[index] = action.payload;
      localStorage.setItem('taskList', JSON.stringify(state));
      return {
        ...state,
        list,
      };
    },
    // Reset Task List
    [taskListTypes.DELETE_ALL_STATE]: () => {
      state = taskListInitialState;
      return state;
    },
    // Delete Task
    [taskListTypes.DELETE_TASK]: () => {
      let list = state.list;
      list = list.filter((listItem) => listItem.id !== action.payload.id);
      localStorage.setItem('taskList', JSON.stringify({ ...state, list }));
      notifyTaskDelete();
      return {
        ...state,
        list,
      };
    },
    // Search Change
    [taskListTypes.UPDATE_FILTER_SEARCH]: () => {
      filters.search = action.payload;
      saveDataInLocalStorage({ list, filters });
      return {
        ...state,
        filters,
      };
    },
    // Asc or Desc Change
    [taskListTypes.UPDATE_FILTER_ASC]: () => {
      const oldField = filters.asc.field;
      let field = action.payload;
      let isAsc = filters.asc.isAsc;
      if (field !== oldField) {
        isAsc = true;
      } else {
        if (isAsc === null) {
          isAsc = true;
        } else if (isAsc === true) {
          isAsc = !isAsc;
        } else {
          isAsc = null;
          field = '';
        }
      }
      filters.asc = { isAsc, field };
      saveDataInLocalStorage({ list, filters });
      return {
        ...state,
        filters,
      };
    },

    // Filter Detail
    [taskListTypes.UPDATE_FILTER_DETAIL]: () => {
      const { field, isChecked, value } = action.payload;
      if (filters.detail[field] === undefined) {
        filters.detail[field] = [];
      }
      if (isChecked) {
        filters.detail[field].push(value);
      } else {
        filters.detail[field] = filters.detail[field].filter(
          (el) => el !== value
        );
        if (filters.detail[field].length === 0) {
          delete filters.detail[field];
        }
      }
      saveDataInLocalStorage({ list, filters });
      return {
        ...state,
        filters,
      };
    },
  };
  return actionTypes[type] ? actionTypes[type]() : state;
};
