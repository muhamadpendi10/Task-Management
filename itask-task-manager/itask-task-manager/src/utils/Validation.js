import { passwordCorrectLength } from '../config/Constants';
import { errorTypes } from './errorTypes';
class Validation {
  #validationTemplateInitialState = { type: [], status: true };
  constructor() {
    this.validateTemplate = this.#validationTemplateInitialState;
  }
  makeTemplate() {
    this.validateTemplate = this.#validationTemplateInitialState;
  }
  checkValidation() {
    if (this.validateTemplate.type.length > 0) {
      return errorTypes.makeError(this.validateTemplate.type);
    }
    return this.validateTemplate;
  }
  checkTextSpaces(text) {
    if (/\s/.test(text))
      this.validateTemplate.type.push(errorTypes.spacesError);
  }
  checkIsEmpty(text) {
    if (text !== undefined && text.trim().length === 0)
      this.validateTemplate.type.push(errorTypes.blankError);
  }
  checkPasswordLength(password) {
    if (
      password !== undefined &&
      password.trim().length < passwordCorrectLength
    )
      this.validateTemplate.type.push(errorTypes.passwordLengthError);
  }
  checkMail(mail) {
    //eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      this.validateTemplate.type.push(errorTypes.emailError);
    }
  }
  validateSimpleInput(text, checkSpaces) {
    this.makeTemplate();
    if (checkSpaces) this.checkTextSpaces(text);
    this.checkIsEmpty(text);
    return this.checkValidation();
  }
  validatePassword(password) {
    this.makeTemplate();
    this.checkTextSpaces(password);
    this.checkPasswordLength(password);
    return this.checkValidation();
  }
  validateEmail(mail) {
    this.makeTemplate();
    this.checkMail(mail);
    return this.checkValidation();
  }
}

export default Validation;
