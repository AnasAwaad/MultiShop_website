let carts = document.getElementById("featureCards");

function drowProductsUI() {
  let items = JSON.parse(localStorage.getItem("searchProducts"));
  return (items = items
    .map((item) => {
      return `
      <div class="feature-card">
    <div class="feature-image">
      <img src=${item.img} alt="">
      <div class="feature-overlay">
        <ul class="overlay-content">
          <li  onclick="addCart(${item.id})"><i class="icon first-icon fa fa-shopping-cart fa-lg"></i></li>
          <li ><i class="icon sec-icon fa fa-heart fa-lg"></i></li>
          <li ><i class="icon third-icon fa fa-sync fa-lg"></i></li>
          <li ><i class="icon forth-icon fa fa-search fa-lg"></i></li>
        </ul>
      </div>
    </div>
    <div class="feature-info">
      <p class="feature-title"><a href="#">${item.title}</a></p>
      <p class="feature-amount">$${item.price} <del>${item.delPrice}</del></p>
      <div class="stars">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <span>(99)</span>
      </div>
    </div>
  </div>`;
    })
    .join(""));
}

carts.innerHTML += drowProductsUI();
let txtSearch = document.getElementById("txt-search");
txtSearch.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    search( e.target.value);
  }
});

// search
function search( title) {
  let item = products.filter((item) => item.title.indexOf(title) != -1);
  if (item) {
    localStorage.setItem("searchProducts", JSON.stringify(item));
    drowProductsUI();
    carts.innerHTML = drowProductsUI();
  }
}

let shoppingCartItems = document.querySelector(".shopping-cart .cart .items ");
let shoppingCart = document.querySelector(".shopping-cart ");
let overlay = document.querySelector(".shopping-cart .overlay");
let cart = document.querySelector(".shopping-cart .cart");
let shoppingCartIcon = document.querySelector("#shopping-cart-icon");
let shoppingCartIconval = document.querySelector("#shopping-cart-icon span");
let totPriceDom = document.querySelector(".shopping-cart .tot-price .price");

function calcTotAmount(allItems) {
  let counter = 0;
  allItems.forEach((element) => {
    counter += element.amount;
  });
  shoppingCartIconval.innerHTML = counter;
}

function calcTotPrice(allItems) {
  let totPrice = 0;
  allItems.forEach((element) => {
    totPrice += element.amount * element.price;
  });
  totPriceDom.innerHTML = "$" + totPrice;
}

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

function removeFromCart(itemId) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  let items = productsInCart.filter((item) => item.id != itemId);
  localStorage.setItem("ProductsInCart", JSON.stringify(items));

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
  let shoppingCartItems = localStorage.getItem("ProductsInCart");

  if (shoppingCartItems.length > 0) {
    if (shoppingCart.style.display == "block") {
      shoppingCart.style.display = "none";
    } else {
      shoppingCart.style.display = "block";
    }
  }
});

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