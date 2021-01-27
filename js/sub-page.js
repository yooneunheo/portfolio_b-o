/* 서브 페이지 공통 요소 (sidebar, arrow up, sticky navbar) */

"use strict";

(() => {
  const menubar = document.querySelector(".menu-bar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const sidebar = document.querySelector(".sidebar");
  const closeCartBtn = document.querySelector(".sidebar__close");
  const globalNavHeight = document
    .querySelector(".global-nav")
    .getBoundingClientRect().height;
  let yOffset = 0; // window.pageYOffset

  function showSidebar() {
    sidebarOverlay.classList.add("transparentBg");
    sidebar.classList.add("showSidebar");
  }

  function hideSidebar() {
    sidebarOverlay.classList.remove("transparentBg");
    sidebar.classList.remove("showSidebar");
  }

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

  menubar.addEventListener("click", showSidebar);
  closeCartBtn.addEventListener("click", hideSidebar);

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    stickyNav();
    showArrowUp();
  });
})();
