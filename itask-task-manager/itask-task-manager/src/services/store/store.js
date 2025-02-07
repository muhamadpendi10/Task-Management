import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskListReducer } from '../reducers/taskListReducer';
import { userReducer } from '../reducers/userReducer';

const store = createStore(
  combineReducers({
    user: userReducer,
    taskList: taskListReducer,
  }),
  {},
  applyMiddleware()
);

export default store;
