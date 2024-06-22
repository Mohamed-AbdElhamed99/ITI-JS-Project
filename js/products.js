/**
 * 
 * 
 *  This file responsible for 
 *  1 - add event to all show details buttons in the products page
 *  2 - adding product that want to view in session
 *  3 - then redirect to show product page to display product 
 * 
 */

/**
 * needed coodies functions
 */
function setSession(key, value) {
  document.cookie = key + "=" + value;
}

/**
 *
 * Show detaisl functions
 */
var showDetails = function (e) {
  var card = e.target.parentElement;
  var productName = card.querySelector(".card-title").innerHTML;
  var description = card.querySelector(".description").innerHTML;
  var price = card.querySelector(".priceAmount").textContent;
  var imagePath = card.previousElementSibling.src;

  setSession("product_name", productName);
  setSession("price", price);
  setSession("imagePath", imagePath);
  setSession("product_description", description);

  window.open("../showProduct.html", "_self");
};

var showDetailsButtons = document.getElementsByClassName("btn-showdetails");

for (var i = 0; i < showDetailsButtons.length; i++) {
  showDetailsButtons[i].onclick = showDetails;
}

