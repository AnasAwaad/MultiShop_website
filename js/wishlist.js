let addItem = document.getElementById("addItem");
let addToCartDom = document.getElementById("AddToCart");
let priceDom = document.getElementById("itemPrice");
let removeCartDom = document.getElementById("removeCart");
let itemImgDom = document.getElementById("itemImg");
let itemTitleDom = document.getElementById("itemTitle");
let shoppingCartItems = document.querySelector(".shopping-cart .cart .items ");
let shoppingCart = document.querySelector(".shopping-cart ");
let overlay = document.querySelector(".shopping-cart .overlay");
let cart = document.querySelector(".shopping-cart .cart");
let shoppingCartIcon = document.querySelector("#shopping-cart-icon");
let shoppingCartIconval = document.querySelector("#shopping-cart-icon span");
let totPriceDom = document.querySelector(".shopping-cart .tot-price .price");
function drowWishList() {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList"));
  addItem.innerHTML = itemsInDb.map((item) => {
    return `<tr>
    <td ><img src=${item.img} alt="" id="itemImg"><div class="item-title" id="itemTitle">${item.title}</div></td>
    <td><div class="item-price" id="itemPrice">$${item.price}</div></td>
    <td><div class="btn btn-primary" id="AddToCart" onclick="addCart(${item.id})">Add to cart</div></td>
    <td><div class="item-remove" id="removeCart" onclick="deleteItem(${item.id})">	 Remove</div></td>
  </tr>`;
  }).join("");
}
drowWishList();

function deleteItem(id) {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList"));
  itemsInDb = itemsInDb.filter((item) => item.id != id);
  localStorage.setItem("wishList", JSON.stringify(itemsInDb));
  drowWishList();
  calcWishList();
}

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

function calcTotAmount (allItems) {
  let counter = 0;
  allItems.forEach((element) => {
    counter += element.amount;
  });
  shoppingCartIconval.innerHTML = counter;
};

calcTotAmount(JSON.parse(localStorage.getItem("ProductsInCart")));



function calcTotPrice(allItems) {
  let totPrice = 0;
  allItems.forEach((element) => {
    totPrice += element.amount * element.price;
  });
  totPriceDom.innerHTML = "$" + totPrice;
}

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

let heartIcon = document.querySelector(".heart-icon span");

function calcWishList() {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList")) || [];
  heartIcon.innerHTML = itemsInDb.length;
}
calcWishList();