/* navbar, arrow up  */

"use strict";

(() => {
  const globalNavHeight = document
    .querySelector(".global-nav")
    .getBoundingClientRect().height;
  let yOffset = 0; // window.pageYOffset

  function stickyNav() {
    if (yOffset > globalNavHeight) {
      document.body.classList.add("sticky-nav");
    } else {
      document.body.classList.remove("sticky-nav");
    }
  }

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
