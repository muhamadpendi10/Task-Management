import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateEdit from '../pages/CreateEdit/CreateEdit';
import Login from '../pages/Login/Login';
import TaskList from '../pages/TaskList/TaskList';
import { getSessionState } from '../services/actions/userAction';
import { ProtectSignInRoute } from './protectedRoute';
export const AllRoutes = () => {
  const isActiveUser = useSelector(getSessionState);
  return (
    <Routes>
      <Route path="/" element={!isActiveUser ? <Login /> : <TaskList />} />
      <Route element={<ProtectSignInRoute isActive={isActiveUser} />}>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create" element={<CreateEdit />} />
        <Route path="/edit/:id" element={<CreateEdit />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
