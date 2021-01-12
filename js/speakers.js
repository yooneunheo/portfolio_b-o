"use strict";

(() => {
  const filterCategory = document.querySelector(".filter-category");
  const categoryBtn = document.querySelector(".category-btn");

  // data 타입에 따라 카테고리가 필터링 됨
  function filtering(e) {
    const filter = e.target.dataset.filter;
    const active = document.querySelector(".filter-category__link.selected");
    const itemWrapper = document.querySelector(".product-item-wrapper");
    const productItem = document.querySelectorAll(".product-item");

    if (filter == null) {
      return;
    }

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
