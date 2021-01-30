"use strict";

(() => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const btn = document.querySelector("#btn");

  btn.addEventListener("click", () => {
    if (email.value === "" || email.value == null) {
      email.nextElementSibling.classList.add("warning");
      email.nextElementSibling.nextElementSibling.classList.add("warning");
      setTimeout(() => {
        email.nextElementSibling.classList.remove("warning");
        email.nextElementSibling.nextElementSibling.classList.remove("warning");
      }, 1500);
    } else if (password.value === "" || password.value == null) {
      password.nextElementSibling.classList.add("warning");
      password.nextElementSibling.nextElementSibling.classList.add("warning");
      setTimeout(() => {
        password.nextElementSibling.classList.remove("warning");
        password.nextElementSibling.nextElementSibling.classList.remove(
          "warning",
        );
      }, 1500);
    }
  });
})();
