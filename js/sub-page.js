"use strict";

// navigation, arrow up, footer 등 서브 페이지에 공통되는 요소에 대한 js 파일

(() => {
  // EXPRESSION
  let yOffset = 0; // window.pageYOffset
  const globalNavHeight = document
    .querySelector(".global-nav")
    .getBoundingClientRect().height;

  // 네비게이션 바가 상단에 붙으면 sticky 됨
  function stickyNav() {
    if (yOffset > globalNavHeight) {
      document.body.classList.add("sticky-nav");
    } else {
      document.body.classList.remove("sticky-nav");
    }
  }

  // 스크롤 시 "arrow up" 버튼이 보임
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
