let shoppingCartItems = document.querySelector(".shopping-cart .cart .items ");
let shoppingCart = document.querySelector(".shopping-cart ");
let overlay = document.querySelector(".shopping-cart .overlay");
let cart = document.querySelector(".shopping-cart .cart");
let shoppingCartIcon = document.querySelector("#shopping-cart-icon");
let shoppingCartIconval = document.querySelector("#shopping-cart-icon span");
let totPriceDom = document.querySelector(".shopping-cart .tot-price .price");

//update products in shopping cart when reload page
function getFromStorage() {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  if (localStorage.getItem("ProductsInCart")) {
    let count = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      count += productsInCart[i].amount;
    }

    shoppingCartIconval.innerHTML = count || 0;

    let totPrice = 0;
    productsInCart.forEach((element) => {
      totPrice += element.amount * element.price;
    });
    totPriceDom.innerHTML = "$" + totPrice.toFixed(2);

    productsInCart.map((item) => {
      shoppingCartItems.innerHTML += `
      <div class="item">
      <img src=${item.img} alt="">
      <div class="item-details">
        <div class="item-title">${item.title} <i class="fa-solid fa-x" onclick="removeFromCart(${item.id})"></i></div>
        <div class="item-price">${item.price}</div>
        
        <div class="amount">x${item.amount}</div>
      </div>
    </div>`;
    });
  }
}

getFromStorage();

//add one product to shopping cart
function addCart(itemId) {
  if (localStorage.getItem("name")) {
    //get all products from database
    let allItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];

    let choosenItem = products.find((item) => item.id === itemId);
    //search in allitems array to check if there item before or not
    let item = allItems.find((i) => i.id === choosenItem.id);

    if (item) {
      item.amount += 1;
    } else {
      allItems.push(choosenItem);
    }

    shoppingCartItems.innerHTML = "";

    allItems.map((item) => {
      shoppingCartItems.innerHTML += `
      <div class="item">
      <img src=${item.img} alt="">
      <div class="item-details">
        <div class="item-title">${item.title} <i class="fa-solid fa-x" onclick="removeFromCart(${item.id})" ></i></div>
        <div class="item-price">${item.price}</div>
        
        <div class="amount">x${item.amount}</div>
      </div>
    </div>`;
    });
    localStorage.setItem("ProductsInCart", JSON.stringify(allItems));

    //update quanity for all products
    calcTotAmount(allItems);
    calcTotPrice(allItems);
  } else {
    window.location = "login.html";
  }
}

//calculate total amount of products
function calcTotAmount(allItems) {
  let counter = 0;
  allItems.forEach((element) => {
    counter += element.amount;
  });
  shoppingCartIconval.innerHTML = counter;
}

//calculate total price of products
function calcTotPrice(allItems) {
  let totPrice = 0;
  allItems.forEach((element) => {
    totPrice += element.amount * element.price;
  });
  totPriceDom.innerHTML = "$" + totPrice;
}

//remove item from cart
function removeFromCart(itemId) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  let items = productsInCart.filter((item) => item.id != itemId);
  localStorage.setItem("ProductsInCart", JSON.stringify(items));
  let productDetails = JSON.parse(localStorage.getItem("productDetails"));
  if (itemId == productDetails.id) {
    productDetails.amount = 0;
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
  }
  shoppingCartItems.innerHTML = "";
  items.map((item) => {
    shoppingCartItems.innerHTML += `
      <div class="item">
      <img src=${item.img} alt="">
      <div class="item-details">
        <div class="item-title">${item.title} <i class="fa-solid fa-x" onclick="removeFromCart(${item.id})" ></i></div>
        <div class="item-price">${item.price}</div>
        
        <div class="amount">x${item.amount}</div>
      </div>
    </div>`;
  });
  calcTotAmount(items);
  calcTotPrice(items);
}

//overlay

overlay.addEventListener("click", function () {
  shoppingCart.style.display = "none";
});

let cartClose = document.getElementById("cart-close");
cartClose.addEventListener("click", function () {
  shoppingCart.style.display = "none";
});

shoppingCartIcon.addEventListener("click", function () {
  let shoppingCartItems = JSON.parse(localStorage.getItem("ProductsInCart"));

  if (shoppingCartItems.length > 0) {
    if (shoppingCart.style.display == "block") {
      shoppingCart.style.display = "none";
    } else {
      shoppingCart.style.display = "block";
    }
  }
});
