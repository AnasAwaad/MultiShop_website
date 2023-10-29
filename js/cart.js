//drow products in html page
function drowProductsUI() {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  let productsDom = document.querySelector("#products");
  let items = productsInCart
    .map((item) => {
      return `
    <div class="d2">
    <img src=${item.img} alt="camera" class="im">
   
    <span class="productName">${item.title}</span>
    <span class="price">${item.price}$</span>
    <div class="quantity">
      <span class="minus" onclick=funMinus(${item.id})>-</span>
      <span class="num">0${item.amount}</span>
      <span class="plus" onclick=funPlus(${item.id})>+</span>
    </div>
    <span class="total" id="total"> ${item.total || item.price}$</span>
    <div class="remove" onclick=removeFromCart(${item.id})>x</div>
    
 </div>`;
    })
    .join("");
  productsDom.innerHTML = items;
}
drowProductsUI();

//remove item
function removeFromCart(id) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  let items = productsInCart.filter((item) => item.id != id);
  localStorage.setItem("ProductsInCart", JSON.stringify(items));
  drowProductsUI();
}

let num = document.querySelector(".num");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let total = document.querySelector("#total");

//increase amount of product by one
function funPlus(id) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id === id) {
      productsInCart[i].amount++;
      productsInCart[i].total = (
        productsInCart[i].amount * productsInCart[i].price
      ).toFixed(2);
      localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));

      drowProductsUI();
    }
  }
  calcTotPrice(productsInCart);
}

//decrease amount of products by one
function funMinus(id) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id === id) {
      if (productsInCart[i].amount === 1) {
        removeFromCart(id);
      } else {
        productsInCart[i].amount--;
        productsInCart[i].total = (
          productsInCart[i].amount * productsInCart[i].price
        ).toFixed(2);
        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));
      }

      drowProductsUI();
    }
  }
  calcTotPrice(productsInCart);
}

function calcTotPrice(allItems) {
  let subPriceDom = document.getElementById("subAmount");
  let totPriceDom = document.getElementById("totAmount");
  let totPrice = 0;
  allItems.forEach((element) => {
    totPrice += element.amount * element.price;
  });
  subPriceDom.innerHTML = "$" + totPrice.toFixed(2);
  totPriceDom.innerHTML = "$" + (totPrice + 10).toFixed(2);
}


