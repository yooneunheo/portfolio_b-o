"use strict";

(() => {
  // EXPRESSION
  const cartBtn = document.querySelector(".cart-btn");
  const closeCartBtn = document.querySelector(".close-cart");
  const clearCartBtn = document.querySelector(".clear-cart");
  const cartDOM = document.querySelector(".cart");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartItems = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const cartContent = document.querySelector(".cart-content");
  const productsDOM = document.querySelector(".product-item-wrapper");

  let cart = [];
  let buttonsDOM = [];

  class Products {
    async getProducts() {
      try {
        let result = await fetch("../products.json");
        let data = await result.json();

        let products = data.items;
        products = products.map((item) => {
          const { title, price, type } = item.fields;
          const { id } = item.sys;
          const image = item.fields.image.fields.file.url;
          return { title, price, type, id, image };
        });
        return products;
      } catch (error) {
        console.log(error);
      }
    }
  }

  class UI {
    displayProducts(products) {
      let result = "";
      products.forEach((product) => {
        result += `
				<!-- single product -->
				<article class="product-item" data-type=${product.type}>
					<img class="product-img" src=${
            product.image
          } onclick="location.href='beosound-Edge.html'" />
					<button class="bag-btn" data-id=${product.id}>add to cart</button>
					<div class="product-item-info">
						<p class="product-item-info__name">${product.title}</p>
						<p class="product-item-info__price">€${product.price.toLocaleString()}</p>
					</div>
					<div class="product-item-colors">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</article>
				<!-- end of single product -->
      `;
      });
      productsDOM.innerHTML = result;
    }
    getBagButtons() {
      const buttons = [...document.querySelectorAll(".bag-btn")];
      buttonsDOM = buttons;
      buttons.forEach((button) => {
        let id = button.dataset.id;
        let inCart = cart.find((item) => item.id === id);
        if (inCart) {
          button.innerText = "In Cart";
          button.disabled = true;
        }
        button.addEventListener("click", (event) => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;
          // 전체 product 정보로부터 개별 product 정보 가져오기
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          // cart에 product 추가
          cart = [...cart, cartItem];
          // local storage에 cart 저장
          Storage.saveCart(cart);
          // cart 값 세팅
          this.setCartValues(cart);
          // cart에 담긴 제품 화면에 출력
          this.addCartItem(cartItem);
          // 카트 보여주기
          this.showCart();
        });
      });
    }

    setCartValues(cart) {
      let tempTotal = 0;
      let itemsTotal = 0;
      cart.map((item) => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
      });
      cartTotal.innerText = tempTotal.toLocaleString();
      cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
    <img src=${item.image} />
    <div>
      <h4>${item.title}</h4>
      <h5>€${item.price.toLocaleString()}</h5>
      <span class="remove-item" data-id=${item.id}>remove</span>
    </div>
    <div>
      <i class="xi-angle-up-min" data-id=${item.id}></i>
      <p class="item-amount">${item.amount}</p>
      <i class="xi-angle-down-min" data-id=${item.id}></i>
    </div>`;
      cartContent.appendChild(div);
    }
    showCart() {
      cartOverlay.classList.add("transparentBcg");
      cartDOM.classList.add("showCart");
    }
    setupAPP() {
      cart = Storage.getCart();
      this.setCartValues(cart);
      this.populateCart(cart);
      cartBtn.addEventListener("click", this.showCart);
      closeCartBtn.addEventListener("click", this.hideCart);
    }
    populateCart(cart) {
      cart.forEach((item) => this.addCartItem(item));
    }
    hideCart() {
      cartOverlay.classList.remove("transparentBcg");
      cartDOM.classList.remove("showCart");
    }
    cartLogic() {
      clearCartBtn.addEventListener("click", () => {
        this.clearCart();
      });
      cartContent.addEventListener("click", (event) => {
        // remove
        if (event.target.classList.contains("remove-item")) {
          let removeItem = event.target;
          let id = removeItem.dataset.id;
          cartContent.removeChild(removeItem.parentElement.parentElement);
          this.removeItem(id);

          // add
        } else if (event.target.classList.contains("xi-angle-up-min")) {
          let addAmount = event.target;
          let id = addAmount.dataset.id;
          let tempItem = cart.find((item) => item.id === id);
          tempItem.amount = tempItem.amount + 1;
          Storage.saveCart(cart);
          this.setCartValues(cart);
          addAmount.nextElementSibling.innerHTML = tempItem.amount;
        } else if (event.target.classList.contains("xi-angle-down-min")) {
          let lowerAmount = event.target;
          let id = lowerAmount.dataset.id;
          let tempItem = cart.find((item) => item.id === id);
          tempItem.amount = tempItem.amount - 1;
          if (tempItem.amount > 0) {
            Storage.saveCart(cart);
            this.setCartValues(cart);
            lowerAmount.previousElementSibling.innerText = tempItem.amount;
          } else {
            cartContent.removeChild(lowerAmount.parentElement.parentElement);
            this.removeItem(id);
          }
        }
      });
    }
    clearCart() {
      let cartItems = cart.map((item) => item.id);
      cartItems.forEach((id) => this.removeItem(id));
      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }
      this.hideCart();
    }
    removeItem(id) {
      cart = cart.filter((item) => item.id !== id);
      this.setCartValues(cart);
      Storage.saveCart(cart);
      let button = this.getSingleButton(id);
      button.disabled = false;
      button.innerHTML = `add to cart`;
    }
    getSingleButton(id) {
      return buttonsDOM.find((button) => button.dataset.id === id);
    }
  }

  class Storage {
    static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
      let products = JSON.parse(localStorage.getItem("products"));
      return products.find((product) => product.id === id);
    }
    static saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
      return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    ui.setupAPP();

    products
      .getProducts()
      .then((products) => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
      })
      .then(() => {
        ui.getBagButtons();
        ui.cartLogic();
      });
  });
})();
