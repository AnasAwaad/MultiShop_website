function drowProductsUI() {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  let products = document.querySelector("#products");
  let items = productsInCart
    .map((item) => {
      return `
    <div class="d2">
    <img src=${item.img} alt="camera" class="im">
   
    <span class="productName">${item.title}</span>
    <span class="price">${item.price}</span>
    <div class="quantity">
      <span class="minus" onclick=funMinus(${item.id})>-</span>
      <span class="num">0${item.amount}</span>
      <span class="plus" onclick=funPlus(${item.id})>+</span>
    </div>
    <span class="total" id="total"> ${item.total || item.price}.00$</span>
    <div class="remove" onclick=removeFromCart(${item.id})>x</div>
    
 </div>`;
    })
    .join("");
  products.innerHTML = items;
}

drowProductsUI();

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

function funPlus(id) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id === id) {
      productsInCart[i].amount++;
      productsInCart[i].total =
        productsInCart[i].amount * productsInCart[i].price;
      localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));

      drowProductsUI();
    }
  }
}

function funMinus(id) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id === id) {
      if (productsInCart[i].amount === 1) {
        removeFromCart(id);
      } else {
        productsInCart[i].amount--;
        productsInCart[i].total =
          productsInCart[i].amount * productsInCart[i].price;
        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));
      }

      drowProductsUI();
    }
  }
}
