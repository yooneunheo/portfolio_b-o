"use strict";

(() => {
  const filterCategory = document.querySelector(".filter-category");
  const categoryBtn = document.querySelector(".category-btn");

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

  categoryBtn.addEventListener("click", () => {
    filterCategory.classList.toggle("show");
  });

  filterCategory.addEventListener("click", (e) => {
    filtering(e);
  });
})();
