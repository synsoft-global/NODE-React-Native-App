/**
 *
 * define all validation function here...
 *
 */
import * as Yup from 'yup';
import * as Constants from '@utils/constants';

//validate for empty value
export function emptyTextValidation(inputs: string) {
  if (
    inputs === '' ||
    inputs === undefined ||
    inputs === null ||
    inputs === 'null' ||
    inputs.trim() === ''
  ) {
    return true;
  }
  return false;
}

//validate email id
export function validateEmail(email: string) {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}

//Validate Email
export function emailValidation() {
  return Yup.string()
    .trim()
    .email(Constants.VALID_EMAIL_MSG)
    .required(Constants.REQUIRED_EMAIL_MSG);
}

