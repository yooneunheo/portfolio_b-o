"use strict";

(() => {
  // EXPRESSION
  let yOffset = 0; // window.pageYOffset
  const filterCategory = document.querySelector(".filter-category");
  const globalNavHeight = document
    .querySelector(".global-nav")
    .getBoundingClientRect().height;
  const categoryBtn = document.querySelector(".category-btn");

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

  // Filter the categories according to the data type
  function filtering(e) {
    const filter = e.target.dataset.filter;
    const active = document.querySelector(".filter-category__link.selected");
    const itemWrapper = document.querySelector(".product-item-wrapper");
    const productItem = document.querySelectorAll(".product-item");

    if (filter == null) {
      return;
    }

    // Remove selection from the previous item and select the new one
    active.classList.remove("selected");
    e.target.classList.add("selected");

    itemWrapper.classList.add("ani-out");
    setTimeout(() => {
      productItem.forEach((item) => {
        if (filter === "*" || item.dataset.type.includes(filter)) {
          item.classList.remove("invisible");
        } else {
          item.classList.add("invisible");
        }
      });
      itemWrapper.classList.remove("ani-out");
    }, 300);
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    stickyNav();
    showArrowUp();
  });

  categoryBtn.addEventListener("click", () => {
    filterCategory.classList.toggle("show");
  });

  filterCategory.addEventListener("click", (e) => {
    filtering(e);
  });
})();
