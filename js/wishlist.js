let addItem = document.getElementById("addItem");
let addToCartDom = document.getElementById("AddToCart");
let priceDom = document.getElementById("itemPrice");
let removeCartDom = document.getElementById("removeCart");
let itemImgDom = document.getElementById("itemImg");
let itemTitleDom = document.getElementById("itemTitle");
function drowWishList() {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList"));
  addItem.innerHTML = itemsInDb.map((item) => {
    return `<tr>
    <td ><img src=${item.img} alt="" id="itemImg"><div class="item-title" id="itemTitle">${item.title}</div></td>
    <td><div class="item-price" id="itemPrice">$${item.price}</div></td>
    <td><div class="btn btn-primary" id="AddToCart" onclick="addCart(${item.id})">Add to cart</div></td>
    <td><div class="item-remove" id="removeCart" onclick="removeitem(${item.id})">	 Remove</div></td>
  </tr>`;
  }).join("");
}
drowWishList();


//remove item from wishlist
function removeitem(id) {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList"));
  itemsInDb = itemsInDb.filter((item) => item.id != id);
  localStorage.setItem("wishList", JSON.stringify(itemsInDb));
  drowWishList();
  calcWishList();
}


let heartIcon = document.querySelector(".heart-icon span");

function calcWishList() {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList")) || [];
  heartIcon.innerHTML = itemsInDb.length;
}
calcWishList();