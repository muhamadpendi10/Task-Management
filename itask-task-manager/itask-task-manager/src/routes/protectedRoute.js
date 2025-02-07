import { Navigate, Outlet } from 'react-router-dom';

export const ProtectSignInRoute = ({ isActive }) => {
  if (!isActive) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
