import { IS_INVALID_CLASS, CHECKMARK_CLASS, ELEMENTS } from './constants';

export const validateName = function (name) {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return '';
}

export const validatePhone = function (phone) {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }

  const validPattern = /^[\d\s\+\-\(\)\.]+$/;
  if (!validPattern.test(phone)) {
    return 'Phone must contain only digits';
  }

  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length < 10) {
    return 'Phone must contain at least 10 digits';
  }

  return '';
}

export const validateAgreement = function (checked) {
  if (!checked) {
    return 'You must agree to the terms';
  }
  return '';
};

export const showError = function (input, errorElement, message) {
  input.classList.add(IS_INVALID_CLASS);
  errorElement.textContent = message;

  if (input.type === ELEMENTS.checkbox) {
    const checkmark = input.parentElement.querySelector(CHECKMARK_CLASS);
    if (checkmark) {
      checkmark.classList.add(IS_INVALID_CLASS);
    }
  }
};

export const clearError = function (input, errorElement) {
  input.classList.remove(IS_INVALID_CLASS);
  errorElement.textContent = '';

  if (input.type === ELEMENTS.checkbox) {
    const checkmark = input.parentElement.querySelector(CHECKMARK_CLASS);
    if (checkmark) {
      checkmark.classList.remove(IS_INVALID_CLASS);
    }
  }
};

export const validateField = function (input, errorElement, validator) {
  const value = input.type === ELEMENTS.checkbox ? input.checked : input.value;
  const error = validator(value);

  if (error) {
    showError(input, errorElement, error);
    return false;
  } else {
    clearError(input, errorElement);
    return true;
  }
};
