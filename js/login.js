"use strict";

(() => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const btn = document.querySelector("#btn");

  // 즉각적인 반응을 위해 form의 submit이 아닌 btn의 click 이벤트로 처리
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputs();
  });

  function checkInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const emailLabel = email.nextElementSibling;

    if (emailValue === "" || emailValue == null) {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      if (window.innerWidth < 768) {
        emailLabel.style.top = "-8px";
        emailLabel.style.fontSize = "10px";
      } else {
        emailLabel.style.top = "-15px";
        emailLabel.style.fontSize = "15px";
      }
      emailLabel.style.color = "#a4a4a4";

      setErrorFor(email, "Email is not valid");
    } else {
      setSucessFor(email);
    }

    if (passwordValue === "" || passwordValue == null) {
      setErrorFor(password, "Password cannot be blank");
    } else if (passwordValue.length <= 6) {
      setErrorFor(password, "Password must be longer than 6 characters");
    } else {
      setSucessFor(password);
    }
  }

  function setErrorFor(input, message) {
    const inputArea = input.parentElement; // .input-area
    const small = inputArea.querySelector("small");

    inputArea.className = "input-area error";
    small.innerText = message;
  }

  function setSucessFor(input) {
    const inputArea = input.parentElement;
    inputArea.className = "input-area success";
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );
  }
})();
