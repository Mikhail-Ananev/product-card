import {
  clearError,
  showError,
  validateName,
  validatePhone,
  validateAgreement,
  validateField,
} from './validate';
import * as CONSTANTS from './constants'

import './style.css';

const form = document.getElementById(CONSTANTS.ELEMENTS.orderForm);
const nameInput = document.getElementById(CONSTANTS.ELEMENTS.name);
const phoneInput = document.getElementById(CONSTANTS.ELEMENTS.phone);
const agreementInput = document.getElementById(CONSTANTS.ELEMENTS.agreement);
const successMessage = document.getElementById(CONSTANTS.ELEMENTS.successMessage);

const nameError = document.getElementById(CONSTANTS.ELEMENTS.nameError);
const phoneError = document.getElementById(CONSTANTS.ELEMENTS.phoneError);
const agreementError = document.getElementById(CONSTANTS.ELEMENTS.agreementError);

function resetForm() {
  form.reset();
  clearError(nameInput, nameError);
  clearError(phoneInput, phoneError);
  clearError(agreementInput, agreementError);
}

function showSuccess() {
  form.style.display = 'none';
  successMessage.classList.add('show');
}

nameInput.addEventListener(CONSTANTS.EVENT.input, () => {
  if (nameInput.classList.contains(CONSTANTS.IS_INVALID_CLASS)) {
    validateField(nameInput, nameError, validateName);
  }
});

phoneInput.addEventListener(CONSTANTS.EVENT.input, () => {
  if (phoneInput.classList.contains(CONSTANTS.IS_INVALID_CLASS)) {
    validateField(phoneInput, phoneError, validatePhone);
  }
});

phoneInput.addEventListener(CONSTANTS.EVENT.keypress, (e) => {
  const allowedChars = /[\d\s\+\-\(\)\.]/;
  if (!allowedChars.test(e.key)) {
    e.preventDefault();
    showError(phoneInput, phoneError, 'Phone must contain only digits');
  }
});

agreementInput.addEventListener(CONSTANTS.EVENT.change, () => {
  if (agreementInput.classList.contains(CONSTANTS.IS_INVALID_CLASS)) {
    validateField(agreementInput, agreementError, validateAgreement);
  }
});

form.addEventListener(CONSTANTS.EVENT.submit, (e) => {
  e.preventDefault();

  const isNameValid = validateField(nameInput, nameError, validateName);
  const isPhoneValid = validateField(phoneInput, phoneError, validatePhone);
  const isAgreementValid = validateField(agreementInput, agreementError, validateAgreement);

  if (isNameValid && isPhoneValid && isAgreementValid) {
    showSuccess();
    resetForm();
  }
});
