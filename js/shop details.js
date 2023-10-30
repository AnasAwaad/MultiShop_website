var choosen_item = JSON.parse(localStorage.getItem("productDetails"));
var slider_img = document.querySelector(".slider-image");
let tabs = document.querySelectorAll(".tabs li");
let tabsarry = Array.from(tabs);
let divs = document.querySelectorAll(".tab-content > div");
let divarry = Array.from(divs);
console.log(tabsarry);
// loop when clicking turn you to the tab
tabsarry.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    tabsarry.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    divarry.forEach((div) => {
      div.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.content).style.display =
      "block";
  });
});
// here we set up the item we select
function setItem() {
  // console.log(typeof choosen_item);
  slider_img.src = choosen_item.img;
  document.getElementById("money").innerText = choosen_item.price + "$";
  document.getElementById("productName").innerText = choosen_item.title;
  if (choosen_item.id > 6 || choosen_item.id < 4) {
    sizes_hidden = document.getElementById("sizes-container");
    sizes_hidden.style.display = "none";
  }
  radio_button_color = document.getElementsByName("color");
  radio_button_size = document.getElementsByName("size");
  for (let index = 0; index < 5; index++) {
    if (radio_button_color[index].value == choosen_item.color) {
      console.log(radio_button_color[index].value);
      console.log(radio_button_color[index].id);
      radio_button_color_selected = document.getElementById(
        radio_button_color[index].id
      );
      radio_button_color_selected.checked = true;
    }
    if (radio_button_size[index].value == choosen_item.size) {
      console.log(radio_button_size[index].id);
      radio_button_size_selected = document.getElementById(
        radio_button_size[index].id
      );
      radio_button_size_selected.checked = true;
    }
  }
}

setItem();
// here we choose the item number to add it to the cart
plus = document.querySelector(".plus-button");
minus = document.querySelector(".minus-button");
num = document.querySelector(".text-control");
let productDetails = JSON.parse(localStorage.getItem("productDetails"));

num.innerHTML = productDetails.amount;
plus.addEventListener("click", () => {
  let productDetails = JSON.parse(localStorage.getItem("productDetails"));

  
  num.innerHTML = productDetails.amount+1;
  productDetails.amount++;
  localStorage.setItem("productDetails", JSON.stringify(productDetails));
});
minus.addEventListener("click", () => {
  let productDetails = JSON.parse(localStorage.getItem("productDetails"));

  if (productDetails.amount > 1) {
    
    num.innerHTML = productDetails.amount-1;
    productDetails.amount--;
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
  }
});

function addCart() {
  if (localStorage.getItem("name")) {
    //get all products from database
    let allItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];

    let productDetails = JSON.parse(localStorage.getItem("productDetails"));

    //search in allitems array to check if there item before or not
    let item = allItems.find((i) => i.id === productDetails.id);

    if (item) {
      item.amount = productDetails.amount;
    } else {
      allItems.push(productDetails);
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

function removeFromCart(itemId) {
  let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
  let items = productsInCart.filter((item) => item.id != itemId);
  localStorage.setItem("ProductsInCart", JSON.stringify(items));
  let productDetails = JSON.parse(localStorage.getItem("productDetails"));
  if (itemId == productDetails.id) {
    productDetails.amount = 1;
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
    num.innerHTML = productDetails.amount;
    
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
