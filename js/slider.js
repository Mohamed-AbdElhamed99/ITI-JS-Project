/**
 *
 *  This file responsible for all slider functions
 *
 */

/**
 * Get Slider Elements
 */
var sliderIMages = document.getElementById("imagesContainer").children;
var currentImageSlider = 0;

/**
 * Hepler functions for slider
 */

// slide left
function slideLeft() {
  clearInterval(sliderInterval);
  currentImageSlider--;
  if (currentImageSlider <= 0) {
    currentImageSlider = sliderIMages.length - 1;
  }
  slide();
}

// slide right
function slideRight(e) {
  if (e) {
    clearInterval(sliderInterval);
  }

  currentImageSlider++;
  if (currentImageSlider >= sliderIMages.length) {
    currentImageSlider = 0;
  }
  slide();
}

// run slider by add d-none class to all images ecxept current image slider
function slide() {
  for (var i = 0; i < sliderIMages.length; i++) {
    if (currentImageSlider == i) {
      sliderIMages[i].classList.remove("d-none");
    } else {
      sliderIMages[i].classList.add("d-none");
    }
  }
}

var sliderInterval = setInterval(function () {
  slideRight();
}, 1500);
