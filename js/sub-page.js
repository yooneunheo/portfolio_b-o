"use strict";

(() => {
  // EXPRESSION
  let yOffset = 0; // window.pageYOffset
  const globalNavHeight = document
    .querySelector(".global-nav")
    .getBoundingClientRect().height;

  // Make navbar sticky when it is on the top
  function stickyNav() {
    if (yOffset > globalNavHeight) {
      document.body.classList.add("sticky-nav");
    } else {
      document.body.classList.remove("sticky-nav");
    }
  }

  // Show "arrow up" button when scrolling down
  function showArrowUp() {
    const arrowUp = document.querySelector(".arrow-up");

    if (yOffset > globalNavHeight) {
      arrowUp.classList.add("visible");
    } else {
      arrowUp.classList.remove("visible");
    }
    arrowUp.addEventListener("click", () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    stickyNav();
    showArrowUp();
  });
})();
