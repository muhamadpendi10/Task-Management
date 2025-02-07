import { checkFilters } from '../../hooks/checkFilters';
import taskListTypes from '../types/taskListTypes';
export const taskListAction = {
  // -------------- SELECTORS -----------------
  [taskListTypes.READ_ALL_STATE]: ({ taskList }) => {
    return checkFilters(taskList);
  },
  [taskListTypes.READ_TASK_LIST]: ({ taskList }) => {
    // const revList = taskList.list.slice().reverse();
    return checkFilters(taskList);
  },
  [taskListTypes.READ_FILTER_FIELD]: ({ taskList }) => {
    return taskList.filters;
  },

  // ------------ ACTION CREATORS ------------------
  // All Task State
  // Deleting All State
  [taskListTypes.DELETE_ALL_STATE]: () => {
    return {
      type: taskListTypes.DELETE_ALL_STATE,
    };
  },

  // Task Item
  // Add New Task
  [taskListTypes.CREATE_NEW_TASK]: (task) => {
    return {
      type: taskListTypes.CREATE_NEW_TASK,
      payload: task,
    };
  },
  // Update Task
  [taskListTypes.UPDATE_TASK_LIST_ITEM]: (newTask) => {
    return {
      type: taskListTypes.UPDATE_TASK_LIST_ITEM,
      payload: newTask,
    };
  },
  // Delete Task
  [taskListTypes.DELETE_TASK]: (id, status) => {
    return {
      type: taskListTypes.DELETE_TASK,
      payload: {
        id,
        status,
      },
    };
  },

  // Search Bar Change
  [taskListTypes.UPDATE_FILTER_SEARCH]: (searchText) => {
    return {
      type: taskListTypes.UPDATE_FILTER_SEARCH,
      payload: searchText,
    };
  },

  // Asc-Desc Change
  [taskListTypes.UPDATE_FILTER_ASC]: (field) => {
    return {
      type: taskListTypes.UPDATE_FILTER_ASC,
      payload: field,
    };
  },

  // Detail Filter Change
  [taskListTypes.UPDATE_FILTER_DETAIL]: (field, value, isChecked) => {
    return {
      type: taskListTypes.UPDATE_FILTER_DETAIL,
      payload: {
        field,
        value,
        isChecked,
      },
    };
  },
};
