/**
 *
 *  This file responsible for cart
 *  1 - display all products on cart from cookies
 *  2 - increase or decrease quantity of product in cookies
 *  3 - delete product from cookies if quantity is 0
 *  4 - calculate the total price of products in cookies
 *  5 - count products in cart and insert it's count in navbar
 *  6 - add prodcut to cart from products page
 *  7 - when checkout redirect to success page and delete all cookies
 *
 */

/**
 *  =================== Helper Functions ========================================
 */

// Cookies functions
function setSession(key, value) {
  document.cookie = key + "=" + value;
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
// ===============================================================================================

/**
 * using getcookies function to get cart from cookies
 * @returns array of objects
 */
function getCart() {
  var cartElements = getCookies("cart");

  if (cartElements.value == "") {
    return [];
  } else {
    cartElements = JSON.parse(cartElements.value);
    return cartElements;
  }
}

/**
 * count how many products (number of products not included it's quantity)
 * display product number in cart span in navbar
 */
function countCart() {
  document.getElementById("countCart").innerHTML = getCart().length;
}

/**
 * remove product from cart
 * create new array of object and insert all products without the product we want to delete
 * then save new array in session cart
 *
 * @param {string} productName
 */
function removeFromCart(productName) {
  var oldCart = getCart();
  var newCart = [];

  for (var i = 0; i < oldCart.length; i++) {
    if (oldCart[i].name != productName) {
      newCart.push({
        name: oldCart[i].name,
        description: oldCart[i].description,
        price: oldCart[i].price,
        image: oldCart[i].image,
        quantity: oldCart[i].quantity,
      });
    }
  }

  newCart = JSON.stringify(newCart);
  setSession("cart", newCart);
  countCart();
}

/**
 * Insert product to cart if not exist already
 *
 * @param {string} productName
 * @param {string} description
 * @param {number} price
 * @param {string} imagePath
 *
 * @returns true if exists
 * @returns undefined if created new one
 */
function insertCart(productName, description, price, imagePath) {
  var cart = getCart();

  // check if product is exists exit function by return keyword
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name == productName) {
      alert("product already added to cart");
      return true; // close function
    }
  }

  // this code run if the product not found in cart
  cart.push({
    name: productName,
    description: description,
    price: price,
    image: imagePath,
    quantity: 1,
  });
  cart = JSON.stringify(cart);
  setSession("cart", cart);
  alert("product added to cart successfully");
}

/**
 * Calculate total price of products in cart
 * Display total price in the dom page
 *
 * @returns int total price
 */
function displayTotalPrice() {
  var cart = getCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  var totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = total.toFixed(2);
}
//=============================================

countCart();

function addProduct(e) {

  if(hasCookie('name') && hasCookie('email'))
    {
      var card = e.target.parentElement;

      var productName = card.querySelector(".card-title").innerHTML;
      var description = card.querySelector(".description").innerHTML;
      var price = card.querySelector(".priceAmount").textContent;
      var imagePath = card.previousElementSibling.src;
    
      insertCart(productName, description, price, imagePath);
    
      countCart();
    }else{
      alert('please login to can buy our products')
      window.location.href = '../login.html'
    }

  
}

//=================================================================

function increaseProductCart(target) {
  var productRow = target.parentElement.parentElement;
  var productName = productRow.querySelector(".productName");
  var productTotalPrice = productRow.querySelector(".productPrice");
  var productQuantity = productRow.querySelector(".productQuantity");

  var cart = getCart();

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name == productName.innerHTML) {
      cart[i].quantity++;
      productTotalPrice.innerHTML = (cart[i].quantity * cart[i].price).toFixed(
        2
      );
      productQuantity.innerHTML = cart[i].quantity;

      cart = JSON.stringify(cart);
      setSession("cart", cart);
    }
  }
  displayTotalPrice();
}

function decreaseProductCart(target) {
  var productRow = target.parentElement.parentElement;
  var productName = productRow.querySelector(".productName");
  var productTotalPrice = productRow.querySelector(".productPrice");
  var productQuantity = productRow.querySelector(".productQuantity");

  var cart = getCart();

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name == productName.innerHTML) {
      cart[i].quantity--;
      productTotalPrice.innerHTML = (cart[i].quantity * cart[i].price).toFixed(
        2
      );
      productQuantity.innerHTML = cart[i].quantity;

      // remove product from cart if it's quantity become 0
      if (cart[i].quantity <= 0) {
        removeFromCart(productName.innerHTML);
        productRow.remove();
        displayTotalPrice();
        return true;
      }

      cart = JSON.stringify(cart);
      setSession("cart", cart);
      displayTotalPrice();
    }
  }
}

//============================================================================
/**
 * Display cart Elements
 */
if (location.pathname == "/cart.html") {
  var products = getCart();

  for (var i = 0; i < products.length; i++) {
    // Parent element to append the created elements
    var cartItemsContainer = document.getElementById("cart-items");

    // Create a new cart item
    var cartItem = document.createElement("div");
    cartItem.classList.add("row", "border-bottom", "py-3", "productRow");
    cartItem.style.justifyContent = "space-between";
    // Image column
    var imageCol = document.createElement("div");
    imageCol.classList.add("col-2");
    var image = document.createElement("img");
    image.src = products[i].image;
    image.alt = "Product Image";
    image.style.height = "100px";
    image.style.width = "100%";
    image.classList.add("img-fluid");
    imageCol.appendChild(image);
    cartItem.appendChild(imageCol);

    // Product name column
    var nameCol = document.createElement("div");
    nameCol.classList.add("col-2", "productName");
    nameCol.textContent = products[i].name;
    cartItem.appendChild(nameCol);

    // Price column
    var priceCol = document.createElement("div");
    priceCol.classList.add("col-2");
    priceCol.textContent = "Price: $ ";

    var priceSpan = document.createElement("span");
    priceSpan.classList.add("productPrice");
    priceSpan.innerHTML = products[i].quantity * products[i].price;

    priceCol.appendChild(priceSpan);

    cartItem.appendChild(priceCol);

    // Description column
    var descCol = document.createElement("div");
    descCol.classList.add("col-3");
    descCol.textContent = products[i].description;
    cartItem.appendChild(descCol);

    // Quantity column
    var quantityCol = document.createElement("div");
    quantityCol.classList.add("col-2");
    var decreaseBtn = document.createElement("button");
    decreaseBtn.classList.add("btn", "btn-secondary");
    decreaseBtn.textContent = "-";
    decreaseBtn.onclick = function (e) {
      decreaseProductCart(e.target);
    };

    var quantitySpan = document.createElement("span");
    quantitySpan.classList.add("mx-2", "productQuantity");
    quantitySpan.textContent = products[i].quantity;

    var increaseBtn = document.createElement("button");
    increaseBtn.classList.add("btn", "btn-secondary");
    increaseBtn.textContent = "+";

    increaseBtn.onclick = function (e) {
      increaseProductCart(e.target);
    };

    quantityCol.appendChild(decreaseBtn);
    quantityCol.appendChild(quantitySpan);
    quantityCol.appendChild(increaseBtn);
    cartItem.appendChild(quantityCol);

    // Append the cart item to the container
    cartItemsContainer.appendChild(cartItem);
  }

  displayTotalPrice();
}

//=================================================
/**
 * Checkout
 */

var checkout = document.getElementById("checkout");

checkout.onclick = function () {
  deleteCookies("name");
  deleteCookies("email");
  deleteCookies("password");
  deleteCookies("cart");

  window.location.replace("../checkout-success.html");
};
