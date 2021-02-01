"use strict";

(() => {
  const link = document.querySelectorAll(".filter-category__link");
  const filterCategory = document.querySelector(".filter-category");
  const categoryBtn = document.querySelector(".category-btn");

  function indicator(e) {
    const mark = document.querySelector(".mark");
    mark.style.left = `${e.offsetLeft}px`;
    mark.style.width = `${e.offsetWidth}px`;
  }

  function filtering(e) {
    const filter = e.target.dataset.filter;
    const itemWrapper = document.querySelector(".product-item-wrapper");
    const productItem = document.querySelectorAll(".product-item");

    if (filter == null) {
      return;
    }

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

  link.forEach((item) => {
    item.addEventListener("click", (e) => {
      indicator(e.target);
      filterCategory.classList.toggle("show");
    });
  });
})();
