/**
 *
 *  This file responsible for
 * --------------------------------------------
 *  1 - logout function
 *  2 - check if user login display name and cart in the navbar
 *  3 - remove login link from navbar if user logged in
 * -------------------------------------------------------------
 *  i check if login by check if name and email are stored in cookies
 *
 */

/**
 *
 * logout
 *
 * @param {*} key
 * @returns
 */
if (hasCookie("name") && hasCookie("email")) {
  var logout = document.getElementById("logout");
  logout.onclick = function () {
    deleteCookies("name");
    deleteCookies("email");
    deleteCookies("password");
    deleteCookies("cart");
    window.location.replace("../index.html");
  };
}

function hasCookie(key) {
  var pattern = new RegExp(key + "=");
  return pattern.test(document.cookie);
}

function getCookies(key) {
  if (hasCookie(key)) {
    var cookies = allCookiesList();
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].key == key) {
        return cookies[i];
      }
    }
  }
}

function allCookiesList() {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    cookies[i] = cookies[i].split("=");

    cookies[i] = {
      key: cookies[i][0],
      value: cookies[i][1],
    };
  }
  return cookies;
}

function deleteCookies(key) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = key + "=" + ";expires=" + expireDate;
}

var loginLink = document.getElementById("loginLink");
var userName = document.getElementById("userName");
var cart = document.getElementById("cart");

if (hasCookie("name") && hasCookie("email")) {
  var username = getCookies("name");

  if (userName) {
    userName.children[0].innerHTML = username.value;
  }

  loginLink.classList.add("d-none");
  userName.classList.remove("d-none");
  cart.classList.remove("d-none");
}
