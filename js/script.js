//open and close dropdown menu
let barlinks = document.querySelector(".pt-3-nav #nav-links");
let bar = document.querySelector("#bars");

bar.addEventListener("click", function () {
  if (barlinks.style.display == "none") {
    barlinks.style.display = "flex";
  } else {
    barlinks.style.display = "none";
  }
});

//add(drow) products to feature section

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
        <li onclick="addToWishList(${item.id})"><i class="icon sec-icon fa fa-heart fa-lg"></i></li>
        <li onclick="details(${item.id})"><i class="icon third-icon fa fa-sync fa-lg"></i></li>
        <li onclick="search('+${item.title}+')" ><i class="icon forth-icon fa fa-search fa-lg"  ></i></li>
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

productsCard.innerHTML = drowProductsUI();
featureCards.innerHTML = drowProductsUI();

// add(drow) products to category section
let categoryCard = document.querySelector(
  ".category-section .category-content"
);

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

let txtSearch = document.getElementById("txt-search");
txtSearch.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    search(e.target.value);
  }
});

// search
function search(title) {
  if (title == "") {
    window.location = "search.html";
    localStorage.setItem("searchProducts",null);
  } else {
    title = title.substring(1, title.length - 1);
    console.log(title);
    let item = products.filter((item) => item.title.indexOf(title) != -1);
    if (item) {
      window.location = "search.html";
      localStorage.setItem("searchProducts", JSON.stringify(item));
    }
  }
}

function details(id) {
  let choosenItem = products.find(item => item.id == id);
  localStorage.setItem("productDetails",JSON.stringify(choosenItem));
  window.location = "shop details.html";
}
