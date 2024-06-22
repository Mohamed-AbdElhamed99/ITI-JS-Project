/**
 *
 *  This file responsible for 
 *  1 - show product details that stored in cookies then delete it from cookies
 *
 */

/**
 * needed coodies functions
 */
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

function deleteCookies(key) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = key + "=" + ";expires=" + expireDate;
}

var product_name = document.getElementById("product_name");
var product_price = document.getElementById("product_price");
var product_description = document.getElementById("product_description");
var product_image = document.getElementById("product_image");

console.log(product_name);
product_name.innerHTML = getCookies("product_name").value;
product_price.innerHTML = getCookies("price").value;
product_description.innerHTML = getCookies("product_description").value;
product_image.setAttribute("src", getCookies("imagePath").value);

deleteCookies("product_name");
deleteCookies("price");
deleteCookies("product_description");
deleteCookies("imagePath");
