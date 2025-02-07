import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TaskInput from '../../components/Input/TaskInput';
import SelectOption from '../../components/Select/SelectOption';
import CreateEdit from '../../layouts/CreateEdit/CreateEdit';
import {
  createListItem,
  listItemTypes,
} from '../../services/reducers/taskListReducer';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
import { useState } from 'react';
import TaskSubmit from '../../components/Input/TaskSubmit';
import validation from '../../hooks/validation';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DateTimeLocal from '../../components/Input/DateTimeLocal';

function checkPage(page, item) {
  if ((page === 'edit' && !item.edit) || (page === 'create' && !item.create))
    return false;
  return true;
}

const Create = () => {
  // Get Location Part
  const navigate = useNavigate();
  const { state } = useLocation();
  const page =
    useMemo(() => {
      if (state && state.isValid) {
        return state.page;
      }
      return null;
    }, [state]) ?? '';
  // Redux Hooks For Dispatch
  const dispatch = useDispatch();
  // Creating or Getting Task
  const task = useMemo(
    () => (page && state.task ? state.task : createListItem()),
    [page, state]
  );
  const [values, setValues] = useState(() => {
    const obj = {};
    Object.values(listItemTypes).forEach((listItem) => {
      if (checkPage(page, listItem)) {
        obj[listItem.name] = { value: task[listItem.name], errorList: [] };
      }
    });
    return obj;
  });
  if (!page) {
    return <Navigate to="-1" />;
  }
  const handleTextInputChange = (e, name) => {
    task[name] = e.target.value;
    setValues((values) => ({
      ...values,
      [name]: { ...values[name], value: task[name] },
    }));
  };
  const handleSelectChange = (e, listItem) => {
    const list = listItem.list;
    const name = listItem.name;
    const newSelect = list.find((el) => el.name === e.target.value);
    task[name] = newSelect;
    setValues((values) => ({
      ...values,
      [name]: { ...values[name], value: task[name] },
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    let errorCount = 0;
    Object.keys(values)
      .filter((el) => typeof values[el].value !== 'object')
      .forEach((key) => {
        const check = validation(values[key].value, false);
        if (check.type.length > 0) {
          errorCount++;
        }
        setValues((values) => ({
          ...values,
          [key]: { ...values[key], errorList: check.type },
        }));
      });
    if (errorCount === 0) {
      if (page === 'edit') {
        dispatch(taskListAction[taskListTypes.UPDATE_TASK_LIST_ITEM](task));
      } else {
        dispatch(taskListAction[taskListTypes.CREATE_NEW_TASK](task));
      }
      navigate(-1);
    }
  };

  return (
    <CreateEdit header={`${page === 'edit' ? 'Edit Task' : 'Create New Task'}`}>
      {Object.values(listItemTypes).map((listItem, index) => {
        if (!checkPage(page, listItem)) return null;
        let fieldType = listItem.createEditField.type;
        let currentValue = values[listItem.name];
        if (fieldType === 'text' || fieldType === 'text-area') {
          return (
            <TaskInput
              key={index}
              settings={listItem}
              options={{
                placeholder: listItem.createEditField.plHolder,
                value: currentValue.value,
                onChange: (e) => handleTextInputChange(e, listItem.name),
              }}
              validationErrors={currentValue.errorList}
            />
          );
        } else if (fieldType === 'select') {
          return (
            <SelectOption
              key={index}
              name={listItem.name}
              options={{ settings: listItem }}
              stateOptions={{
                value: task[listItem.name].name,
                onChange: (e) => {
                  handleSelectChange(e, listItem);
                },
              }}
            />
          );
        } else if (fieldType === 'date-time') {
          return (
            <DateTimeLocal
              settings={listItem}
              options={{
                value: currentValue.value,
                onChange: (e) => handleTextInputChange(e, listItem.name),
              }}
              key={index}
            />
          );
        }
        return null;
      })}
      <TaskSubmit
        options={{
          value: `${page === 'edit' ? 'Save Changes' : 'Save'}`,
          onClick: handleSave,
        }}
      />
    </CreateEdit>
  );
};

export default Create;
