import { passwordCorrectLength } from '../config/Constants';
export const errorTypes = {
  blankError: 'Input is empty',
  spacesError: 'There must be no spaces',
  emailError: 'Email is incorrect',
  passwordLengthError: `Password must be minimum ${passwordCorrectLength} character length`,
  makeError: (...type) => {
    return {
      type,
      status: false,
    };
  },
};
