/**
 *
 * define all validation function here...
 *
 */

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

