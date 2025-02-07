import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSessionState,
  getSessionState,
} from '../../services/actions/userAction';
import { taskListAction } from '../../services/actions/taskListAction';
import taskListTypes from '../../services/types/taskListTypes';
const Header = () => {
  const isActiveUser = useSelector(getSessionState);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = location;
  const checkPath = () => {
    const path = pathname.split('/');
    if (path[1] !== undefined) return path[1];
    return null;
  };
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(taskListAction[taskListTypes.DELETE_ALL_STATE]);
    dispatch(changeSessionState(false));
    navigate('/login');
  };
  return (
    <div className="flex flex-row w-[100%] h-20 bg-custom-white justify-between items-center px-5 shadow-[0_0_10px_0_black]">
      <div className="logo w-20">
        <img src={logo} alt="logo" />
      </div>
      {isActiveUser ? (
        <div>
          {/* <div className="burger-menu md:hidden"> */}
          <div className="hidden">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="flex flex-row gap-3 font-bold hover:[&>a]:bg-primary-color hover:[&>a]:text-white hover:[&>a]:shadow-[0_0_5px_0_gray] [&>a]:px-3 cursor-pointer">
            {checkPath() === 'tasks' || (checkPath() === '' && isActiveUser) ? (
              <>
                <NavLink to="/create" state={{ isValid: true, page: 'create' }}>
                  Create New Task
                </NavLink>
                <span>|</span>
              </>
            ) : checkPath() === 'create' || checkPath() === 'edit' ? (
              <>
                <NavLink to="/tasks">Back</NavLink>
                <span>|</span>
              </>
            ) : null}
            <NavLink onClick={handleLogOut}>Log Out</NavLink>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
