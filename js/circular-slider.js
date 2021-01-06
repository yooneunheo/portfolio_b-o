"use strict";

(() => {
  // EXPRESSION
  const circularSlide = document.querySelectorAll(".circular-slide");
  const slideImage = document.querySelectorAll(".circular-slide__image");
  const slideBtn = document.querySelectorAll(".slide-btn button");
  const subTitleText = document.querySelectorAll(".subTitle h2");
  const sLength = slideImage.length;
  const transition = 1000;
  let rotate = 0;

  // AUTO REFRESH FUNCTION
  (() => {
    for (let i = 0; i < sLength; i++) {
      circularSlide[i].style.transition = `${transition / 2}ms ease`;

      if (i === 0) {
        setTimeout(() => {
          circularSlide[
            i
          ].style.transform = `translate(-50%, -50%) rotate(-10deg)`;
        }, transition / 2);
        setTimeout(() => {
          circularSlide[
            i
          ].style.transform = `translate(-50%, -50%) rotate(5deg)`;
          titleShow(i);
        }, transition);
        setTimeout(() => {
          circularSlide[
            i
          ].style.transform = `translate(-50%, -50%) rotate(0deg)`;
        }, transition * 1.5);
      }
    }
  })();

  // SUBTITLE SHOW
  function titleShow(x) {
    subTitleText[x].style.opacity = 1;
    subTitleText[x].style.top = "0%";
  }

  // SUBTITLE FADE
  function titleFade(x) {
    subTitleText[x].style.opacity = 0;
    subTitleText[x].style.top = "100%";
  }

  // BUTTONS
  const [prev, next] = slideBtn;
  next.addEventListener("click", nextSlider);
  prev.addEventListener("click", prevSlider);

  // FUNCTION NEXT PREV BUTTON
  function nextSlider() {
    let x = rotate;
    if (x === sLength - 1) {
      // animation
      circularSlide[x].style.transform = `translate(-50%, -50%) rotate(5deg)`;

      setTimeout(() => {
        circularSlide[
          x
        ].style.transform = `translate(-50%, -50%) rotate(-2.5deg)`;
      }, transition / 2);

      setTimeout(() => {
        circularSlide[x].style.transform = `translate(-50%, -50%) rotate(0deg)`;
      }, transition);
      // end animation
    } else {
      circularSlide[x].style.transform = `translate(-50%, -50%) rotate(-90deg)`;
      // animation
      setTimeout(() => {
        circularSlide[
          x + 1
        ].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
        titleFade(x);
      }, transition / 2);
      setTimeout(() => {
        circularSlide[
          x + 1
        ].style.transform = `translate(-50%, -50%) rotate(2.5deg)`;
        titleShow(x + 1);
      }, transition);
      setTimeout(() => {
        circularSlide[
          x + 1
        ].style.transform = `translate(-50%, -50%) rotate(0deg)`;
        rotate = x + 1;
      }, transition * 1.5);
      // end animation
    }
  }

  function prevSlider() {
    let x = rotate;
    if (x === 0) {
      // animation
      circularSlide[x].style.transform = `translate(-50%, -50%) rotate(-5deg)`;

      setTimeout(() => {
        circularSlide[
          x
        ].style.transform = `translate(-50%, -50%) rotate(2.5deg)`;
      }, transition / 2);
      setTimeout(() => {
        circularSlide[x].style.transform = `translate(-50%, -50%) rotate(0deg)`;
      }, transition);
      // end animation
    } else {
      circularSlide[x].style.transform = `translate(-50%, -50%) rotate(90deg)`;

      // animation
      setTimeout(() => {
        circularSlide[
          x - 1
        ].style.transform = `translate(-50%, -50%) rotate(5deg)`;
        titleFade(x);
      }, transition / 2);
      setTimeout(() => {
        circularSlide[
          x - 1
        ].style.transform = `translate(-50%, -50%) rotate(-2.5deg)`;
        titleShow(x - 1);
      }, transition);
      setTimeout(() => {
        circularSlide[
          x - 1
        ].style.transform = `translate(-50%, -50%) rotate(0deg)`;
        rotate = x - 1;
      }, transition * 1.5);
      // end animation
    }
  }
})();
