/**
 *
 *  This file responsible for 
 *   1 - validate all inputs
 *   2 - if inputs validated open login button and store user info in cookies 
 *
 */

/**
 * Cookies
 */
function setCookies(key, value, expiredAfter) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + expiredAfter);
  document.cookie = key + "=" + value + ";expires=" + expireDate;
}

function setSession(key, value) {
  document.cookie = key + "=" + value;
}

function hasCookie(key) {
  var pattern = new RegExp(key + "=");
  return pattern.test(document.cookie);
}

/**
 * check if user logged in redirect to home page
 */

if (hasCookie("name") && hasCookie("email")) {
  window.location.replace("../index.html");
}

/**
 * Login Validations
 */
var loginBtn = document.getElementById("loginBtn");

var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var passwordConfirmationInput = document.getElementById("passwordConfirmation");

var isNameValidated = false;
var isEmailValidated = false;
var isPasswordValidated = false;
var isPasswordConfirmationValidated = false;

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var passwordConfirmationError = document.getElementById(
  "passwordConfirmationError"
);

function checkValidation() {
  if (
    isNameValidated &&
    isEmailValidated &&
    isPasswordValidated &&
    isPasswordConfirmationValidated
  ) {
    loginBtn.removeAttribute("disabled");
  } else {
    loginBtn.setAttribute("disabled", "");
  }
}

/**
 * Validate input name
 *
 * 1 - validate that name not contains numbers or special char
 * 2 - validate if name not empy
 *
 * if name field not valid set isNameValidated false and display error message
 *
 * @param {*} e
 */
nameInput.oninput = function (e) {
  var nameValue = e.target.value;
  var regex = /^[a-zA-Z\s]+$/; // name should contain letters and spcaces only

  console.log(regex.test(nameValue));

  if ((nameValue != "") & !regex.test(nameValue)) {
    nameError.innerHTML =
      "Name field can't contain numbers or special characters";
    nameError.style.display = "block";
    isNameValidated = false;
  } else if (nameValue == "") {
    nameError.innerHTML = "Name field is required";
    nameError.style.display = "block";
    isNameValidated = false;
  } else {
    // no errors
    nameError.style.display = "none";
    isNameValidated = true;
  }

  checkValidation();
};

/**
 * Validate input Email
 *
 * 1 - validate that email format like mohamed@mail.com
 * 2 - validate if email not empy
 *
 * if email field not valid set isEmailValidated false and display error message
 *
 * @param {*} e
 */
emailInput.oninput = function (e) {
  var emailValue = e.target.value;
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email format like mohamed@mail.com

  console.log(regex.test(emailValue));

  if ((emailValue != "") & !regex.test(emailValue)) {
    emailError.innerHTML = "invalid email format";
    emailError.style.display = "block";
    isEmailValidated = false;
  } else if (emailValue == "") {
    emailError.innerHTML = "Email field is required";
    emailError.style.display = "block";
    isEmailValidated = false;
  } else {
    // no errors
    emailError.style.display = "none";
    isEmailValidated = true;
  }

  checkValidation();
};

/**
 * Validate input password
 *
 * 1 - validate that password contains upper and lower case
 * 2 - validate password length at least 8
 * 2 - validate if email not empy
 *
 * if email field not valid set isEmailValidated false and display error message
 *
 * @param {*} e
 */
passwordInput.oninput = function (e) {
  var passowrdValue = e.target.value;
  var regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

  console.log(passowrdValue.length);

  if ((passowrdValue != "") & !regex.test(passowrdValue)) {
    passwordError.innerHTML =
      "password should contains upper and lower characters";
    passwordError.style.display = "block";
    isPasswordValidated = false;
  } else if (passowrdValue.length < 8) {
    passwordError.innerHTML = "password should contain at least 8 characters";
    passwordError.style.display = "block";
    isPasswordValidated = false;
  } else if (passowrdValue == "") {
    passwordError.innerHTML = "Email field is required";
    passwordError.style.display = "block";
    isPasswordValidated = false;
  } else {
    // no errors
    passwordError.style.display = "none";
    isPasswordValidated = true;
  }

  /**
   * to prevent user from edit password after input password confirmation with another value
   * ex :
   * password : Mohamed123
   * password_confirmation : Mohamed123
   * then modify password to be something like Mohamed1234
   * her display error "password confirmation must match password"
   *  */
  if (
    passowrdValue != "" &&
    passwordConfirmationInput.value != "" &&
    passowrdValue != passwordConfirmationInput.value
  ) {
    passwordConfirmationError.innerHTML =
      "password confirmation must match password";
    passwordConfirmationError.style.display = "block";
    isPasswordConfirmationValidated = false;
  } else if (
    passowrdValue != "" &&
    passwordConfirmationInput.value != "" &&
    passowrdValue == passwordConfirmationInput.value
  ) {
    passwordConfirmationError.style.display = "none";
    isPasswordConfirmationValidated = true;
  }
  checkValidation();
};

/**
 * Validate input password confirmation
 *
 * 1 - validate that password contains upper and lower case
 * 2 - validate password length at least 8
 * 2 - validate if email not empy
 *
 * if email field not valid set isEmailValidated false and display error message
 *
 * @param {*} e
 */
passwordConfirmationInput.oninput = function (e) {
  var passowrdConfirmationValue = e.target.value;

  if (
    passowrdConfirmationValue == "" ||
    passowrdConfirmationValue != passwordInput.value
  ) {
    passwordConfirmationError.innerHTML =
      "password confirmation must match password";
    passwordConfirmationError.style.display = "block";
    isPasswordConfirmationValidated = false;
  } else {
    // no errors
    passwordConfirmationError.style.display = "none";
    isPasswordConfirmationValidated = true;
  }

  checkValidation();
};

/**
 * Login After validate all inputs in validation.js file
 * this file functionality work when user click login to login
 */

var loginBtn = document.getElementById("loginBtn");

var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var passwordConfirmationInput = document.getElementById("passwordConfirmation");
var remembierMeInput = document.getElementById("remembierMe");

loginBtn.onclick = function (e) {
  var name = nameInput.value;
  var email = emailInput.value;
  var password = passwordInput.value;

  e.preventDefault();

  if (remembierMeInput.checked) {
    setCookies("name", name, 30);
    setCookies("email", email, 30);
    setCookies("password", password, 30);

    setCookies("cart", [], 30);
  } else {
    setSession("name", name);
    setSession("email", email);
    setSession("password", password);
    setSession("cart", []);
  }

  window.location.replace("../index.html");
};
