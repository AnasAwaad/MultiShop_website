let barlinks = document.querySelector(".pt-3-nav #nav-links");
let bar = document.querySelector("#bars");

bar.addEventListener("click", function () {
  if (barlinks.style.display == "none") {
    barlinks.style.display = "flex";
  } else {
    barlinks.style.display = "none";
  }
  
});

let loginRegister = document.querySelector("#login-register");
let userInfo = document.querySelector("#user-info");
let user = document.querySelector("#user");
let logout = document.querySelector("#logout");

if (localStorage.getItem("name")) {
  loginRegister.remove();
  userInfo.style.display = "flex";
  user.innerHTML = localStorage.getItem("name");
}

logout.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 0);
});

//feature section
products = [
  {
    id: 1,
    img: "images/product-1.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 2,
    img: "images/product-2.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 3,
    img: "images/product-3.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 4,
    img: "images/product-4.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 5,
    img: "images/product-5.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 6,
    img: "images/product-6.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 7,
    img: "images/product-7.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
  {
    id: 8,
    img: "images/product-8.jpg",
    title: "Product Name Goes Here",
    price: "$123.00",
    delPrice: "$123.00",
  },
];

let productsCard = document.querySelector("#featureCards");
let featureCards = document.querySelector("#featureContent");
function drowProductsUI() {
  return (productsUI = products
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
    <p class="feature-amount">${item.price} <del>${item.delPrice}</del></p>
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

productsCard.innerHTML = drowProductsUI();
featureCards.innerHTML = drowProductsUI();

// category section
let categoryCard = document.querySelector(
  ".category-section .category-content"
);

let categoryProducts = [
  {
    id: "category_1",
    name: "category name",
    img: "images/cat-1.jpg",
    desc: "100 products",
  },
  {
    id: "category_2",
    name: "category name",
    img: "images/cat-2.jpg",
    desc: "100 products",
  },
  {
    id: "category_3",
    name: "category name",
    img: "images/cat-3.jpg",
    desc: "100 products",
  },
  {
    id: "category_4",
    name: "category name",
    img: "images/cat-4.jpg",
    desc: "100 products",
  },
  {
    id: "category_5",
    name: "category name",
    img: "images/cat-4.jpg",
    desc: "100 products",
  },
  {
    id: "category_6",
    name: "category name",
    img: "images/cat-3.jpg",
    desc: "100 products",
  },
  {
    id: "category_7",
    name: "category name",
    img: "images/cat-1.jpg",
    desc: "100 products",
  },
  {
    id: "category_8",
    name: "category name",
    img: "images/cat-2.jpg",
    desc: "100 products",
  },
  {
    id: "category_9",
    name: "category name",
    img: "images/cat-1.jpg",
    desc: "100 products",
  },
  {
    id: "category_10",
    name: "category name",
    img: "images/cat-2.jpg",
    desc: "100 products",
  },
  ,
  {
    id: "category_11",
    name: "category name",
    img: "images/cat-3.jpg",
    desc: "100 products",
  },
  ,
  {
    id: "category_12",
    name: "category name",
    img: "images/cat-4.jpg",
    desc: "100 products",
  },
];

function displayAllCategory() {
  let card = categoryProducts
    .map((item) => {
      return `<div class="category-card">
    <img src=${item.img} alt="">
    <div class="category-info">
      <p class="category-name">${item.name}</p>
      <p class="category-desc">${item.desc}</p>
    </div>
  </div>`;
    })
    .join("");
  return card;
}

categoryCard.innerHTML = displayAllCategory();
let shoppingCartTitle = document.querySelector(".shopping-cart .cart .items");

function addCart(x) {
  if (localStorage.getItem("name")) {
    let choosenItem = products.find((item) => item.id === x);
    shoppingCartTitle.innerHTML += `
    <div class="item">
    <h3>${choosenItem.title}</h3>
    <p>${choosenItem.price}</p>
    <img src=${choosenItem.img} alt="">
    </div>`;
  } else {
    window.location = "register.html";
  }
}

//overlay
let shoppingCart = document.querySelector(".shopping-cart ");
let overlay = document.querySelector(".shopping-cart .overlay");
let cart = document.querySelector(".shopping-cart .cart");
let shoppingCartIcon = document.querySelector("#shopping-cart-icon");

overlay.addEventListener("click", function () {
  shoppingCart.style.display = "none";
});

shoppingCartIcon.addEventListener("click", function () {
  if (shoppingCart.style.display == "block") {
    shoppingCart.style.display = "none";
  } else {
    shoppingCart.style.display = "block";
  }
});
