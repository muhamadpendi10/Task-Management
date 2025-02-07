import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../../components/Input/LoginInput';
import LoginSubmit from '../../components/Submit/LoginSubmit';
import {
  changeEmail,
  changePassword,
  changeSessionState,
  changeUsername,
  getEmail,
  getPassword,
  getUsername,
} from '../../services/actions/userAction';
import Validation from '../../utils/Validation';

const Login = () => {
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  // eslint-disable-next-line
  const enterKeyClick = useCallback((e) => {
    if (e.keyCode === 13) {
      handleSignInClick();
    }
  });
  useEffect(() => {
    window.addEventListener('keydown', enterKeyClick);
    return () => {
      window.removeEventListener('keydown', enterKeyClick);
    };
  }, [enterKeyClick]);
  const inputList = [
    {
      name: 'username',
      plHolder: 'Username',
      type: 'text',
      dispatch: (value) => changeUsername(value),
    },
    {
      name: 'email',
      plHolder: 'Email',
      type: 'email',
      dispatch: (value) => changeEmail(value),
    },
    {
      name: 'password',
      plHolder: 'Password',
      type: 'password',
      dispatch: (value) => changePassword(value),
    },
  ];
  const dispatch = useDispatch();
  const { username, email, password } = {
    username: useSelector(getUsername),
    email: useSelector(getEmail),
    password: useSelector(getPassword),
  };
  const handleInputChange = (e, item) => {
    dispatch(item.dispatch(e.target.value));
    if (validationErrors[item.name].length > 0)
      handleInputFieldsCheck(item.name, true, e.target.value);
  };
  const handleInputFieldsCheck = (inputType, isCustom = false, val = '') => {
    const input = new Validation();
    let returnText = '';
    let returnValue = true;
    let validate = {};
    if (inputType === 'username') {
      validate = input.validateSimpleInput(isCustom ? val : username, true);
    } else if (inputType === 'password') {
      validate = input.validatePassword(isCustom ? val : password);
    } else if (inputType === 'email') {
      validate = input.validateEmail(isCustom ? val : email);
    }
    if (validate.type.length > 0) {
      returnValue = false;
      returnText = validate.type[0];
    }
    setValidationErrors((validationErrors) => {
      return {
        ...validationErrors,
        [inputType]: returnText,
      };
    });
    return returnValue;
  };
  const handleSignInClick = () => {
    let canLogIn = true;
    const checkList = ['email', 'username', 'password'];
    for (let i = 0; i < checkList.length; i++) {
      if (!handleInputFieldsCheck(checkList[i])) {
        canLogIn = false;
      }
    }
    if (canLogIn) {
      localStorage.setItem(
        'user',
        JSON.stringify({ username, password, email })
      );
      dispatch(changeSessionState(true));
      navigate('/tasks');
    }
  };

  return (
    <div className="w-[90%] sm:w-[50%] h-[100%] m-auto flex flex-col justify-center items-center transition-all absolute left-0 top-0 bottom-0 right-0">
      <div className="w-[100%] flex flex-col items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-lg shadow-sec-color">
        <div>
          <p className="text-2xl text-center font-bold font-mono">Sign In</p>
        </div>
        {inputList.map((item, index) => (
          <LoginInput
            key={index}
            props={{
              type: item.type,
              placeholder: item.plHolder,
              onChange: (e) => {
                handleInputChange(e, item);
              },
              onBlur: () => handleInputFieldsCheck(item.name),
            }}
            msg={validationErrors[item.name]}
          />
        ))}
        <LoginSubmit handleClick={handleSignInClick} />
      </div>
    </div>
  );
};

export default Login;
