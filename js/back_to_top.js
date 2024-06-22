/**
 *
 *  This file responsible for
 * -------------------------------------------------
 *  1 - back to up button 
 *  2 - fixed navbar when scroll
 * 
 */

/**
 * Add Arrow Buttons
 */
var arrowUp = document.createElement("a");
var arrowUpImage = document.createElement("img");
var navbar = document.getElementsByClassName("navbar")[0];

arrowUpImage.setAttribute("src", "./images/arrow.png");

arrowUp.className = "arrow-up d-none";
arrowUp.appendChild(arrowUpImage);
arrowUp.setAttribute("id", "arrowup");

document.body.appendChild(arrowUp);

//scroll up
var scrollupInterval;

// display back to top button
document.body.onscroll = function () {
  if (document.documentElement.scrollTop > 0) {
    arrowUp.classList.remove("d-none");
    navbar.classList.add("fixed-top");
  } else if (document.documentElement.scrollTop == 0) {
    arrowUp.classList.add("d-none");
    navbar.classList.remove("fixed-top");
    if (scrollupInterval) {
      clearInterval(scrollupInterval);
    }
  }
};

arrowUp.onclick = function () {
  scrollupInterval = setInterval(function (scrollupInterval) {
    document.documentElement.scrollTop -= 20;

    if (document.documentElement.scrollTop < 50) {
      clearInterval(scrollupInterval);
    }
  }, 10);
};
