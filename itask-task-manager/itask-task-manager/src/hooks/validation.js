import { errorTypes } from '../utils/errorTypes';
let template = {};
const makeTemplate = () => ({ type: [], status: true });
const checkValidation = () => {
  if (template.length > 0) {
    return errorTypes.makeError(template.type);
  }
  return template;
};
const checkTextSpaces = (text) => {
  if (/\s/.test(text)) template.type.push(errorTypes.spacesError);
};
const checkIsEmpty = (text) => {
  if (text !== undefined && text.trim().length === 0)
    template.type.push(errorTypes.blankError);
};

const validation = (value, checkSpaces) => {
  template = makeTemplate();
  if (checkSpaces) checkTextSpaces(value);
  checkIsEmpty(value);
  return checkValidation();
};

export default validation;
